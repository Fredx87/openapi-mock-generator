import { Tree } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";

export const DocumentTree: React.FC = () => {
  const treeData = useSelector((state: RootState) => state.document.tree);

  return (
    <div data-testid="document-tree">
      <Tree treeData={treeData}></Tree>
    </div>
  );
};
