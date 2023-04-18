import {useState} from 'react';
import {Box, Stack, TextField} from '@mui/material';

export let renderCounter = 0;


export function MakeStyleUseStyle() {
  const [query, setQuery] = useState('');
  renderCounter++;
  return (
      <Stack direction={'column'} spacing={1}>
        <h2>Deferred Value Example</h2>
        <TextField
            label={'Search...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />

        <Box>renderCounter (parent) {renderCounter}</Box>{' '}
      </Stack>
  );
}
