'use client';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';

import { getTree } from '@/api/tree';
import Tree from '@/components/tree';
import type { TreeNode } from '@/types/tree';

export default function Home() {
  const [tree, setTree] = useState<TreeNode | undefined>();
  const handleTree = useCallback((t: TreeNode) => setTree(t), []);

  useEffect(() => {
    getTree().then((t) => setTree(t));
  }, []);

  return (
    <main>
      <Box sx={{ pt: 4 }}>
        {tree && <Tree isFirst node={tree} setTree={handleTree} />}
      </Box>
    </main>
  );
}
