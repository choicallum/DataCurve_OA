## DataCurve OA

This is my (Callum Choi's) attempt at the DataCurve OA.

# How to Setup
1. Initialize the frontend: Navigate to DataCurve_OA/DataCurve_OA and run `npm run dev`
2. Initialize the backend: Navigate to DataCurve_OA/backend and run `fastapi dev main.py`
  a. This may require installation of dependenacies, such as: fastapi, aiosqlite
3. Initialize the docker image: Navigate to DataCurve_OA/backend and run `docker build -t code_executor .`
4. Navigate to http://localhost:5173/, and play around!
