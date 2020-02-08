import Icon from "antd/es/icon";
import Tree from "antd/es/tree";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MarkText } from "../../components/MarkText";
import { RootState } from "../../rootReducer";
import { setCurrentRef } from "../editor/editor-slice";
import { DocumentTreeSearch } from "./DocumentTreeSearch";
import { BranchTreeNode, GeneralTreeNode } from "./tree-builder";

const { TreeNode, DirectoryTree } = Tree;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TreeContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

const StyledMark = styled.mark`
  padding: 0;
  background-color: #ffe58f;
`;

function renderNode(
  node: GeneralTreeNode,
  searchTerm: string
): React.ReactNode {
  const title = searchTerm ? (
    <MarkText
      content={node.title}
      mark={searchTerm}
      markComponent={StyledMark}
    ></MarkText>
  ) : (
    node.title
  );

  if (node.type === "Branch") {
    return (
      <TreeNode selectable={false} key={node.ref} title={title}>
        {node.children.map(child => renderNode(child, searchTerm))}
      </TreeNode>
    );
  }
  return (
    <TreeNode
      icon={<Icon type="file-text" theme="twoTone"></Icon>}
      key={node.ref}
      title={title}
    ></TreeNode>
  );
}

function getNodeMatchingKeys(
  searchTerm: string,
  node: GeneralTreeNode
): string[] {
  const res: string[] = [];
  if (node.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
    res.push(node.ref);
  }
  if (node.type === "Branch") {
    for (const child of node.children) {
      res.push(...getNodeMatchingKeys(searchTerm, child));
    }
  }
  return res;
}

function getAllMatchingKeys(searchTerm: string, treeData: GeneralTreeNode[]) {
  const rootNode: BranchTreeNode = {
    type: "Branch",
    title: "",
    ref: "",
    children: treeData
  };
  return getNodeMatchingKeys(searchTerm, rootNode);
}

export const DocumentTree: React.FC = () => {
  const treeData = useSelector((state: RootState) => state.document.tree);
  const currentRef = useSelector((state: RootState) => state.editor.currentRef);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && searchTerm) {
      containerRef.current.querySelector("mark")?.scrollIntoView();
    }
  }, [searchTerm]);

  const selectedKeys: string[] = currentRef ? [currentRef] : [];
  const onSelect = (_: unknown, e: AntTreeNodeSelectedEvent) => {
    const node = e.node.props;
    dispatch(setCurrentRef(node.eventKey));
  };

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
    const newExpandedKeys = value ? getAllMatchingKeys(value, treeData) : [];
    setExpandedKeys(newExpandedKeys);
  };

  return (
    <Container ref={containerRef}>
      <DocumentTreeSearch
        searchTerm={searchTerm}
        onChange={onSearchChange}
      ></DocumentTreeSearch>
      <TreeContainer data-testid="document-tree">
        <DirectoryTree
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          autoExpandParent
          expandedKeys={expandedKeys}
          onExpand={setExpandedKeys}
        >
          {treeData.map(child => renderNode(child, searchTerm))}
        </DirectoryTree>
      </TreeContainer>
    </Container>
  );
};
