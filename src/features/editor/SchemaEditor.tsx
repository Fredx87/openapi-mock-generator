import throttle from "lodash-es/throttle";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getObjectByRef } from "../../shared/utils";
import { getDocument, setRefValue } from "../document/document-slice";
import { EDITOR_THROTTLE_TIME, GO_TO_REFERENCE_MSG } from "./constants";
import { EditorContainer } from "./EditorContainer";
import { monacoDefaultOptions } from "./monaco-options";
import { jsonDiagnosticOptions } from "./schemas";
import { useCurrentRef } from "./useCurrentRef";
import { useEditorResize } from "./useEditorResize";

export const SchemaEditor: React.FC = () => {
  const document = useSelector(getDocument);
  const dispatch = useDispatch();

  const currentRef = useCurrentRef();
  const { projectId, projectName } = useParams<{
    projectId: string;
    projectName: string;
  }>();
  const history = useHistory();

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
  const commandRef = useRef<string | null>(null);

  useEffect(() => {
    const disposable = monacoEditor.languages.registerCodeLensProvider("json", {
      provideCodeLenses: (model): monacoEditor.languages.CodeLensList => {
        if (commandRef.current == null) {
          return { lenses: [], dispose: () => {} };
        }

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
              title: GO_TO_REFERENCE_MSG,
              id: commandRef.current!,
              arguments: [m.matches?.[1]]
            }
          };
          return res;
        });
        return { lenses, dispose: () => {} };
      },
      resolveCodeLens: (_, codeLens) => {
        return codeLens;
      }
    });

    return () => {
      disposable.dispose();
    };
  }, []);

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

    commandRef.current = editorRef.current.addCommand(0, (_, ref: string) => {
      history.push(`/${projectId}/${projectName}/${encodeURIComponent(ref)}`);
    });
  };

  return (
    <EditorContainer data-testid="schema-editor" ref={containerRef}>
      <MonacoEditor
        language="json"
        value={value}
        onChange={throttle(onChange, EDITOR_THROTTLE_TIME)}
        editorWillMount={editorWillMount}
        editorDidMount={editorDidMount}
        options={options}
      ></MonacoEditor>
    </EditorContainer>
  );
};
