import Icon from "antd/es/icon";
import Tree from "antd/es/tree";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../rootReducer";
import { setCurrentRef } from "../editor/editor-slice";
import { GeneralTreeNode } from "./tree-builder";

const { TreeNode, DirectoryTree } = Tree;

function renderNode(node: GeneralTreeNode): React.ReactNode {
  if (node.type === "Branch") {
    return (
      <TreeNode selectable={false} key={node.ref} title={node.title}>
        {node.children.map(child => renderNode(child))}
      </TreeNode>
    );
  }
  return (
    <TreeNode
      icon={<Icon type="file-text" theme="twoTone"></Icon>}
      key={node.ref}
      title={node.title}
    ></TreeNode>
  );
}

export const DocumentTree: React.FC = () => {
  const treeData = useSelector((state: RootState) => state.document.tree);
  const currentRef = useSelector((state: RootState) => state.editor.currentRef);
  const dispatch = useDispatch();

  const selectedKeys: string[] = currentRef ? [currentRef] : [];

  const onSelect = (_: unknown, e: AntTreeNodeSelectedEvent) => {
    const node = e.node.props;
    dispatch(setCurrentRef(node.eventKey));
  };

  return (
    <div data-testid="document-tree">
      <DirectoryTree onSelect={onSelect} selectedKeys={selectedKeys}>
        {treeData.map(child => renderNode(child))}
      </DirectoryTree>
    </div>
  );
};
