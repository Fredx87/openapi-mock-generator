import { createSelector } from "@reduxjs/toolkit";
import jsf from "json-schema-faker";
import $RefParser from "json-schema-ref-parser";
import cloneDeep from "lodash-es/cloneDeep";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getObjectByRef } from "../../shared/utils";
import { getDocument } from "../document/document-slice";
import { getCurrentRef } from "./editor-slice";

const Editor = styled.textarea`
  width: 100%;
  min-height: 300px;
`;

const getCurrentSchemaValue = createSelector(
  [getDocument, getCurrentRef],
  (document, currentRef) => {
    if (document && currentRef) {
      return JSON.stringify(getObjectByRef(currentRef, document));
    }
  }
);

export const GeneratedEditor: React.FC = () => {
  const document = useSelector(getDocument);
  const currentSchemaValue = useSelector(getCurrentSchemaValue);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (document && currentSchemaValue) {
      const schema = JSON.parse(currentSchemaValue);
      const schemas = document.components?.schemas;

      const schemaObj = {
        ...schema,
        components: {
          schemas: cloneDeep(schemas)
        }
      };

      $RefParser
        .dereference(schemaObj)
        .then(parsedSchema => {
          jsf.option("alwaysFakeOptionals", true);
          try {
            const generated = jsf.generate(parsedSchema);
            setValue(JSON.stringify(generated));
          } catch {}
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [document, currentSchemaValue]);

  return (
    <Editor data-testid="generated-editor" value={value} disabled></Editor>
  );
};
