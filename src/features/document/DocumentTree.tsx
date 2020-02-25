import Icon from "antd/es/icon";
import Tree from "antd/es/tree";
import { AntTreeNodeSelectedEvent } from "antd/lib/tree";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { MarkText } from "../../components/MarkText";
import { DocumentTreeSearch } from "./DocumentTreeSearch";
import { BranchTreeNode, GeneralTreeNode } from "./tree-builder";

const { TreeNode, DirectoryTree } = Tree;

const Container = styled.div`
  margin-top: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
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

export interface DocumentTreeProps {
  tree: GeneralTreeNode[];
}

export const DocumentTree: React.FC<DocumentTreeProps> = props => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    const paths = location.pathname.split("/");
    setSelectedKey(decodeURIComponent(paths[paths.length - 1]));
  }, [location]);

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && searchTerm) {
      containerRef.current.querySelector("mark")?.scrollIntoView();
    }
  }, [searchTerm]);

  const selectedKeys: string[] = selectedKey ? [selectedKey] : [];
  const onSelect = (_: unknown, e: AntTreeNodeSelectedEvent) => {
    const node = e.node.props;
    if (node.eventKey) {
      history.push(`${url}/${encodeURIComponent(node.eventKey!)}`);
    }
  };

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
    const newExpandedKeys = value ? getAllMatchingKeys(value, props.tree) : [];
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(true);
  };

  const onExpand = (keys: string[]) => {
    setExpandedKeys(keys);
    setAutoExpandParent(false);
  };

  return (
    <Container>
      <DocumentTreeSearch
        searchTerm={searchTerm}
        onChange={onSearchChange}
      ></DocumentTreeSearch>
      <TreeContainer data-testid="document-tree" ref={containerRef}>
        <DirectoryTree
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          autoExpandParent={autoExpandParent}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
        >
          {props.tree.map(child => renderNode(child, searchTerm))}
        </DirectoryTree>
      </TreeContainer>
    </Container>
  );
};
