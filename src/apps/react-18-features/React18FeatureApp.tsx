import {DeferredValue} from './DeferredValue';
import {Box} from '@mui/material';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import {ErrorPage} from '../react-router-dom-6/RouterApp';

const router = createBrowserRouter([
  {
    path: '/react-18-features/DeferredValue',
    element: <DeferredValue/>,
    errorElement: <ErrorPage/>,
  },
]);

export function React18FeatureApp() {
  return (
      <Box>
        <h1>React 18 Features</h1>
        <RouterProvider router={router}/>
      </Box>
  );
}
