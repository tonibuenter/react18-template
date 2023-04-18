import React, {useEffect, useRef, useState} from 'react';
import {Box, Stack} from '@mui/material';

let renderCounter = 0;
let remoteCallsCounter = 0;

export function SearchResult({query}: { query: string }) {
  const [result, setResult] = useState<string[]>([]);
  const [query0, setQuery0] = useState(query);
  const timeoutId = useRef(0);
  renderCounter++;

  useEffect(() => {
    setQuery0(query);
  }, [query]);

  useEffect(() => {
    //setResult([]);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = window.setTimeout(() => {
      remoteCallsCounter++;
      const length = 10 - query0.length;
      if (length === 10 || length < 1) {
        setResult([]);
        return;
      }
      setResult(
          Array(query0.length)
              .fill(0)
              .map((_, i) => query0 + '-' + i),
      );
    }, 1000);
  }, [query0]);

  if (result.length === 0) {
    <Box sx={{fontWeight: 400}}>no result</Box>;
  }

  return (
      <Stack>
        {result.map((e) => (
            <Box key={e}>{e}</Box>
        ))}
        <Box key={'renderSearchResult'}>
          renderSearchResult (search result) {renderCounter}
        </Box>
        <Box key={remoteCallsCounter}>
          remoteCallsCounter (search result) {remoteCallsCounter}
        </Box>
      </Stack>
  );
}
