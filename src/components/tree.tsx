import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { TreeNode } from '@/types/tree';

import Create from './create';
import Delete from './delete';
import Update from './update';

type TreeProps = {
  node: TreeNode;
  setTree: (tree: TreeNode) => void;
  isFirst?: boolean;
};

export default function Tree({ node, setTree, isFirst }: TreeProps) {
  return (
    <Box sx={{ pl: 2, pt: 1 }}>
      <Box sx={{ display: 'flex', columnGap: '0.5rem' }}>
        <Typography>{node.name}</Typography>
        <Create id={node.id} setTree={setTree} />
        {!isFirst && <Update id={node.id} setTree={setTree} />}
        {!isFirst && <Delete id={node.id} setTree={setTree} />}
      </Box>
      {node.children.map((item) => (
        <Tree node={item} setTree={setTree} key={item.id} />
      ))}
    </Box>
  );
}
