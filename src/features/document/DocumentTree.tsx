import { createSelector } from "@reduxjs/toolkit";
import { Tree } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import { BranchTreeNode, buildDocumentTree } from "./tree-builder";

const selectDocument = (state: RootState) =>
  state.document.status === "loaded" ? state.document.content : undefined;

const selectDocumentTree = createSelector(
  selectDocument,
  (document): BranchTreeNode[] => buildDocumentTree(document)
);

export const DocumentTree: React.FC = () => {
  const treeData = useSelector(selectDocumentTree);

  return (
    <div data-testid="document-tree">
      <Tree treeData={treeData}></Tree>
    </div>
  );
};
