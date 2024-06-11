# DataCurve OA

This is my (Callum Choi's) attempt at the DataCurve OA.

## How to Setup
1. Initialize the frontend: Navigate to DataCurve_OA/DataCurve_OA and run `npm run dev`. This may require the installation of the following dependencies: [react-codemirror2, tailwind]
2. Initialize the backend: Navigate to DataCurve_OA/backend and run `fastapi dev main.py`. This may require the installation of the following dependencies: [fastapi, aiosqlite]
3. Initialize the docker image: Navigate to DataCurve_OA/backend and run `docker build -t code_executor .`
4. Navigate to http://localhost:5173/, and play around!
