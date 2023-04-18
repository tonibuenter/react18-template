import {Suspense, useState} from 'react';
import {SearchResult} from './SearchResult';
import {Box} from '@mui/material';

export function Suspense0() {
  const [query, setQuery] = useState('');
  return (
      <Box>
        <label>
          Search Result:
          <input value={query} onChange={(e) => setQuery(e.target.value)}/>
        </label>
        <Suspense fallback={<h2>Loading...</h2>}>
          <SearchResult query={query}/>
        </Suspense>
      </Box>
  );
}
