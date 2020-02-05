import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getObjectByRef } from "../../shared/utils";
import { getDocument, setRefValue } from "../document/document-slice";
import { getCurrentRef, setCurrentRef } from "./editor-slice";
import { EditorContainer } from "./EditorContainer";
import { monacoDefaultOptions } from "./monaco-options";
import { MyMonacoEditor } from "./MyMonacoEditor";
import { jsonDiagnosticOptions } from "./schemas";
import { useEditorResize } from "./use-editor-resize";

export const SchemaEditor: React.FC = () => {
  const document = useSelector(getDocument);
  const currentRef = useSelector(getCurrentRef);
  const dispatch = useDispatch();

  const [value, setValue] = useState(" ");

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (document && currentRef) {
      const refValue = JSON.stringify(
        getObjectByRef(currentRef, document),
        null,
        2
      );
      setValue(refValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRef]);

  const containerRef = useEditorResize(editorRef);

  const options: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
    ...monacoDefaultOptions,
    ariaLabel: "current schema editor"
  };

  const onChange = (v: string) => {
    if (currentRef) {
      setValue(v);
      dispatch(setRefValue({ ref: currentRef, value: v }));
    }
  };

  const editorWillMount = (monaco: typeof monacoEditor) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(
      jsonDiagnosticOptions
    );
  };

  const editorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
    editor.focus();

    const commandId = editor.addCommand(0, (ctx, ref: string) => {
      dispatch(setCurrentRef(ref));
    });

    monacoEditor.languages.registerCodeLensProvider("json", {
      provideCodeLenses: (model): monacoEditor.languages.CodeLensList => {
        const matches = model.findMatches(
          `"\\$ref":\\s*"(#.*)"`,
          false,
          true,
          false,
          null,
          true
        );
        const lenses = matches.map(m => {
          const res: monacoEditor.languages.CodeLens = {
            range: m.range,
            command: {
              title: "Go to reference",
              id: commandId!,
              arguments: [m.matches?.[1]]
            }
          };
          return res;
        });
        return { lenses, dispose: () => {} };
      },
      resolveCodeLens: (model, codeLens) => {
        return codeLens;
      }
    });
  };

  return (
    <EditorContainer data-testid="schema-editor" ref={containerRef}>
      <MyMonacoEditor
        language="json"
        value={value}
        onChange={onChange}
        editorWillMount={editorWillMount}
        editorDidMount={editorDidMount}
        options={options}
      ></MyMonacoEditor>
    </EditorContainer>
  );
};
