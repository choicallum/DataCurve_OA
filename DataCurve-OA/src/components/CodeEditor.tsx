import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Controlled as CodeMirror } from 'react-codemirror2';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <CodeMirror
      value={code}
      options={{
        mode: 'python',
        theme: 'material',
        lineNumbers: true
      }}
      onBeforeChange={(_editor, _data, value) => {
        onChange(value);
      }}
    />
  );
};

export default CodeEditor;
