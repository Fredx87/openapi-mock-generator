import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { useRef } from "react";
import useResize from "react-resize-observer-hook";

export function useEditorResize(
  editorRef: React.MutableRefObject<
    monacoEditor.editor.IStandaloneCodeEditor | undefined
  >
) {
  const containerRef = useRef(null);
  useResize(containerRef, () => {
    window.requestAnimationFrame(() => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    });
  });
  return containerRef;
}
