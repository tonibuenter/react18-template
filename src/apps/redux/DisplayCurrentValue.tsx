import React from 'react';

import { useCurrentValue } from './redux-support';
import { Box, Stack } from '@mui/material';

export function DisplayCurrentValue() {
  const cv = useCurrentValue();

  return (
    <Stack spacing={1}>
      <h2>Display current value</h2>
      <Box
        sx={{
          fontWeight: '600',
          color: 'orange',
          border: '1px dashed gray',
          padding: '1em',
          margin: '1em',
        }}
      >
        {cv || ''}
      </Box>
    </Stack>
  );
}
