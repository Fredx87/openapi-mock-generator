import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";

export const monacoDefaultOptions: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  lineNumbers: "off",
  wordWrap: "on",
  tabSize: 2
};
