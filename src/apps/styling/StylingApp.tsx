import React from 'react';
import { Box, Paper } from '@mui/material';
import { withStyles } from 'tss-react/mui';

const BlueBox = withStyles('div', (theme) => ({
  root: {
    color: 'blue',
    padding: theme.spacing(1, 1, 1, 1)
  }
}));

export function StylingApp() {
  return (
    <Paper>
      <BlueBox>Blue Box</BlueBox>
    </Paper>
  );
}
