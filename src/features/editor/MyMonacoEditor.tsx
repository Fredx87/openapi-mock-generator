import React from "react";
import { MonacoEditorProps } from "react-monaco-editor";

const MonacoEditor = React.lazy(() => import("react-monaco-editor"));

export const MyMonacoEditor: React.FC<MonacoEditorProps> = props => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <MonacoEditor {...props} />
  </React.Suspense>
);
