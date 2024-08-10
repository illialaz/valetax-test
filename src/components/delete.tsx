import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { ReactComponent as Remove } from 'public/delete.svg';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { removeNode } from '@/api/tree';
import type { TreeNode } from '@/types/tree';

type DeleteProps = {
  id: number;
  setTree: (tree: TreeNode) => void;
};

export default function Delete({ id, setTree }: DeleteProps) {
  const [open, setOpen] = useState(false);

  const { handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const handlerFormData = async () => {
    const tree = await removeNode(id);
    setTree(tree);
    setOpen(false);
  };

  const onSubmit = (e: React.BaseSyntheticEvent) => {
    handleSubmit(handlerFormData)(e).finally(() => {});
  };

  return (
    <Box>
      <Button
        aria-describedby={String(id)}
        variant={open ? 'outlined' : 'text'}
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          p: 0,
          minWidth: 0,
          minHeight: 0,
          svg: { height: '1rem' },
          path: { fill: 'text', stroke: 'text' },
        }}
      >
        <Remove />
      </Button>
      {open && (
        <Box
          sx={{
            position: 'fixed',
            display: 'flex',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 1,
          }}
          onClick={() => setOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={onSubmit}
            method="post"
            target="_top"
            action-xhr="#"
            style={{ height: 'fit-content' }}
          >
            <Box sx={{ p: 4, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
              <FormControl>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  sx={{ py: 2 }}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </FormControl>
              <FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ py: 2 }}
                >
                  Delete
                </Button>
              </FormControl>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
}
