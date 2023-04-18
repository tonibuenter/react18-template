import React, {useCallback, useState} from 'react';

import {dispatchCurrentValue, dispatchRequestRunning, useRequestRunning,} from './redux-support';
import {Box, Button, LinearProgress, Stack, TextField} from '@mui/material';

const RRName = '__RequestRunning';

export function RequestRunning() {
  const [value, setValue] = useState('');
  const runningRequestMessage = useRequestRunning();

  const startRequest = useCallback(async (v: string) => {
    try {
      await new Promise<void>((resolve) => {
        dispatchRequestRunning(RRName);
        window.setTimeout(() => {
          dispatchCurrentValue(v);
          resolve();
        }, 1000);
      });
    } finally {
      dispatchRequestRunning('');
    }
  }, []);
  if (runningRequestMessage) {
    return (
        <Stack spacing={2}>
          <LinearProgress/>
          <Box sx={{fontWeight: '600'}}>{runningRequestMessage}</Box>
        </Stack>
    );
  }

  return (
      <Stack spacing={1}>
        <h2>Edit current value</h2>
        <TextField
            label={'Just a value entry...'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        ></TextField>
        <Stack direction={'row'} spacing={1}>
          <Button disabled={!value} onClick={() => startRequest(value)}>
            Save value to redux
          </Button>
        </Stack>
      </Stack>
  );
}
