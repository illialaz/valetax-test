import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ReactComponent as Add } from 'public/add.svg';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { createNode } from '@/api/tree';
import type { TreeNode } from '@/types/tree';
import { formValidators } from '@/utils/validators';

type CreateProps = {
  id: number;
  setTree: (tree: TreeNode) => void;
};

type CreateFormFields = {
  name: string;
};

export default function Create({ id, setTree }: CreateProps) {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormFields>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  });

  const handlerFormData = async ({ name }: CreateFormFields) => {
    const tree = await createNode(id, name);
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
        <Add />
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
                <Controller
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      id="name"
                      label="New Node Name *"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!errors['name']}
                    />
                  )}
                  rules={{ validate: formValidators.required() }}
                  control={control}
                  name="name"
                />
              </FormControl>
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
                  Create
                </Button>
              </FormControl>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
}
