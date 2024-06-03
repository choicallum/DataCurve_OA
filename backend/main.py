import os
import subprocess
import tempfile
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import aiosqlite

#Database setup
DATABASE = 'code_storage.db'

async def init_db():
    async with aiosqlite.connect(DATABASE) as db:
        await db.execute('''CREATE TABLE IF NOT EXISTS code_submissions (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            code TEXT NOT NULL,
                            output TEXT NOT NULL)''')
        await db.commit()

# initialize database when FastAPI app is initialized
async def lifespan(app: FastAPI):
    await init_db()
    yield
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend's URL
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

# Returns the stdout output or the error output and a boolean indicating if it's an error or not.
async def execute_code(code: str) -> str:
    with tempfile.TemporaryDirectory() as temp_dir:
        script_path = os.path.join(temp_dir, "script.py")
        
        # Write the code to a temp script file
        with open(script_path, 'w') as script_file:
            script_file.write(code)
        
        # Run the script on the Docker container
        run_command = f"docker run --rm -v {temp_dir}:/app --entrypoint python code_executor /app/script.py"
        result = subprocess.run(run_command, shell=True, check=True, capture_output=True, text=True)
        
        # if there's an error, output the error instead.
        if not result.stderr:
            return result.stderr
        return result.stdout


@app.post("/run_code/")
async def run_code_endpoint(code: str):
    output = await execute_code(code)
    return {"output": output}

@app.post("/submit_code/")
async def submit_code_endpoint(code: str):
    output = await execute_code(code)
    
    # Store code and output in the database
    async with aiosqlite.connect(DATABASE) as db:
        await db.execute(
            "INSERT INTO code_submissions (code, output) VALUES (?, ?)",
            (code, output)
        )
    await db.commit()

    
    return {"output": output}
