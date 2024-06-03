import React from "react";

interface OutputWindowProps {
  output: string;
}

const OutputWindow: React.FC<OutputWindowProps> = ({ output }) => {
    return (
      <div className="mt-4 p-4 rounded bg-neutral-900" style={{ minHeight: "300px" }}>
        <pre className="text-neutral-300">{output}</pre>
      </div>
    );
  };
  

export default OutputWindow;
