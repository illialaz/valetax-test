import type { TreeNode } from '@/types/tree';

export const getTree = async (): Promise<TreeNode> => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `.user.tree.get?treeName=${process.env.NEXT_PUBLIC_TREE_NAME}`,
    { method: 'POST' },
  );
  const tree = (await res.json()) as TreeNode;

  return tree;
};

export const createNode = async (
  parentId: number,
  name: string,
): Promise<TreeNode> => {
  try {
    await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `.user.tree.node.create?treeName=${process.env.NEXT_PUBLIC_TREE_NAME}&parentNodeId=${parentId}&nodeName=${name}`,
      { method: 'POST' },
    );
  } catch (e) {
    console.log(e);
  }

  return getTree();
};

export const removeNode = async (nodeId: number): Promise<TreeNode> => {
  try {
    await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `.user.tree.node.create?treeName=${process.env.NEXT_PUBLIC_TREE_NAME}&nodeId=${nodeId}`,
      { method: 'POST' },
    );
  } catch (e) {
    console.log(e);
  }

  return getTree();
};

export const renameNode = async (
  nodeId: number,
  name: string,
): Promise<TreeNode> => {
  try {
    await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `.user.tree.node.rename?treeName=${process.env.NEXT_PUBLIC_TREE_NAME}&nodeId=${nodeId}&newNodeName=${name}`,
      { method: 'POST' },
    );
  } catch (e) {
    console.log(e);
  }

  return getTree();
};
