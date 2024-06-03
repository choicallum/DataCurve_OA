import { useState } from "react";
import "./index.css";
import CodeEditor from "./components/CodeEditor";
import OutputWindow from "./components/OutputWindow";

const API_BASE_URL = 'http://127.0.0.1:8000'

export default function App() {
  const [code, setCode] = useState("# Start writing your code here!\nprint(\"hello world\")\n");
  const [output, setOutput] = useState("Output shows up here!");

  const handleTestCode = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/run_code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error testing code:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/submit_code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      setOutput("Successfully Submitted!\n" + data.output);
    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };

  return (
    <div className="text-white p-4 rounded">
      <h1 className="text-2xl font-bold">
        Python3 Editor and Execution Environment
      </h1>
      <div className="p-4">
        <CodeEditor code={code} onChange={setCode} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleTestCode}
        >
          Test Code
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <OutputWindow output={output} />
      </div>
    </div>
  );
}
