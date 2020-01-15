import { Tree } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import { GeneralTreeNode } from "./tree-builder";

const { TreeNode } = Tree;

function renderNode(node: GeneralTreeNode): React.ReactNode {
  if (node.type === "Branch") {
    return (
      <TreeNode selectable={false} {...node}>
        {node.children.map(child => renderNode(child))}
      </TreeNode>
    );
  }
  return <TreeNode {...node}></TreeNode>;
}

export const DocumentTree: React.FC = () => {
  const treeData = useSelector((state: RootState) => state.document.tree);

  return (
    <div data-testid="document-tree">
      <Tree>{treeData.map(child => renderNode(child))}</Tree>
    </div>
  );
};
