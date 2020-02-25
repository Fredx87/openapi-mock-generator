import { Chance } from "chance";
import faker from "faker";
import * as E from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import jsf from "json-schema-faker";
import $RefParser from "json-schema-ref-parser";
import cloneDeep from "lodash-es/cloneDeep";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { useSelector } from "react-redux";
import { getObjectByRef, jsonSchemaRef } from "../../shared/utils";
import { getDocument, MyDocument } from "../document/document-slice";
import { EditorContainer } from "./EditorContainer";
import { monacoDefaultOptions } from "./monaco-options";
import { useCurrentRef } from "./useCurrentRef";
import { useEditorResize } from "./useEditorResize";

jsf.extend("faker", () => faker);
jsf.extend("chance", () => new Chance());
jsf.option("alwaysFakeOptionals", true);
jsf.option("failOnInvalidFormat", false);

function generateValue(
  schema: any,
  document: MyDocument
): TE.TaskEither<Error, string> {
  if (Object.keys(schema).length === 0) {
    return TE.right("");
  }

  const schemas = document.components?.schemas;

  const schemaObj = {
    ...schema,
    components: {
      schemas: cloneDeep(schemas)
    }
  };

  return pipe(
    TE.tryCatch(() => $RefParser.dereference(schemaObj), E.toError),
    TE.chain(parsed =>
      TE.fromEither(E.tryCatch(() => jsf.generate(parsed), E.toError))
    ),
    TE.map(gen => JSON.stringify(gen, null, 2))
  );
}

export const GeneratedEditor: React.FC = () => {
  const currentRef = useCurrentRef();

  const document = useSelector(getDocument);
  const currentSchemaValue = useSelector(_ => {
    if (document && currentRef) {
      return JSON.stringify(getObjectByRef(currentRef, document));
    }
  });

  const [value, setValue] = useState(" ");

  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (document && currentSchemaValue) {
      const parsed = JSON.parse(currentSchemaValue);
      const schema = jsonSchemaRef.is(parsed)
        ? cloneDeep(getObjectByRef(parsed.$ref, document))
        : parsed;

      generateValue(schema, document)().then(res => {
        if (E.isRight(res)) {
          setValue(res.right);
        } else {
          console.error(res.left);
        }
      });
    }
  }, [document, currentSchemaValue]);

  const containerRef = useEditorResize(editorRef);

  const options: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
    ...monacoDefaultOptions,
    ariaLabel: "generated model",
    readOnly: true
  };

  const editorDidMount = (
    editor: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <EditorContainer data-testid="generated-editor" ref={containerRef}>
      <MonacoEditor
        language="json"
        value={value}
        options={options}
        editorDidMount={editorDidMount}
      ></MonacoEditor>
    </EditorContainer>
  );
};
