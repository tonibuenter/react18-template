import {useDeferredValue, useState} from 'react';
import {SearchResult} from './SearchResult';
import {Box, Stack, TextField} from '@mui/material';

export let renderCounter = 0;

export function DeferredValue() {
  const [query, setQuery] = useState('');
  const queryDeferred = useDeferredValue(query);
  renderCounter++;
  return (
      <Stack direction={'column'} spacing={1}>
        <h2>Deferred Value Example</h2>
        <TextField
            label={'Search...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <SearchResult query={queryDeferred}/>
        <Box>renderCounter (parent) {renderCounter}</Box>{' '}
      </Stack>
  );
}
