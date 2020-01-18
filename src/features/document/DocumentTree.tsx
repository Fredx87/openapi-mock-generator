import { Tree } from "antd";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import { generateModel, setSchemaValue } from "../editor/editor-slice";
import { GeneralTreeNode, LeafTreeNode } from "./tree-builder";

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
  const dispatch = useDispatch();

  const onSelect = (_: unknown, e: AntTreeNodeSelectedEvent) => {
    const node = e.node.props as LeafTreeNode;
    dispatch(setSchemaValue(JSON.stringify(node.schema)));
    dispatch(generateModel());
  };

  return (
    <div data-testid="document-tree">
      <Tree onSelect={onSelect}>
        {treeData.map(child => renderNode(child))}
      </Tree>
    </div>
  );
};
