import React from 'react';
import { Box } from '@mui/material';
import { RequestRunning } from './RequestRunning';
import { Provider } from 'react-redux';
import { store } from './redux-support';
import { DisplayCurrentValue } from './DisplayCurrentValue';

export function ReduxApp() {
  return (
    <Box>
      <Provider store={store}>
        <h1>Redux App</h1>
        <RequestRunning />
        <DisplayCurrentValue />
      </Provider>
    </Box>
  );
}
