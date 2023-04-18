import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { withStyles } from 'tss-react/mui';
import {
  dispatchDataMap,
  getDataMap,
  store,
  useDataMap
} from '../redux/redux-support';
import { Provider } from 'react-redux';

const StackWithBorder = withStyles(Stack, (theme) => ({
  root: {
    border: 'dashed 1px lightGray',
    margin: theme.spacing(3)
  }
}));

let renderCounterParent = 0;
let renderCounterClient = 0;
let renderCounterReadOnly = 0;
let renderCounterEditor = 0;
let renderCounterEditorRedux = 0;

export function RenderStuffApp() {
  const [celsius, setCelsius] = useState<number>(0);
  const [celsiusUpdate, setCelsiusUpdate] = useState<number>(0);

  renderCounterParent++;

  return (
    <Provider store={store}>
      <StackWithBorder>
        <Box>Parent render: {renderCounterParent}</Box>
        <Box>Celsius Update {celsiusUpdate} </Box>
        <Box>Client</Box>
        <Client celsius={celsius} setCelsiusUpdate={setCelsiusUpdate} />
        <Button onClick={() => alert(getDataMap('celsius') || 0)}>
          Get celsius from redux
        </Button>
      </StackWithBorder>
    </Provider>
  );
}

function Client({
  celsius,
  setCelsiusUpdate
}: {
  celsius: number;
  setCelsiusUpdate: (c: number) => void;
}) {
  renderCounterClient++;

  return (
    <StackWithBorder>
      <Box>Client render: {renderCounterClient}</Box>
      <CelsiusEditor init={celsius} setCelsiusUpdate={setCelsiusUpdate} />
      <CelsiusEditorRedux init={celsius} />
      <ReadOnly />
    </StackWithBorder>
  );
}

function CelsiusEditor({
  init,
  setCelsiusUpdate
}: {
  init: number;
  setCelsiusUpdate: (c: number) => void;
}) {
  renderCounterEditor++;
  const [celsius, setCelsius] = useState<number>(init);

  return (
    <StackWithBorder spacing={2}>
      <Box>CelsiusEditor render: {renderCounterEditor}</Box>

      <TextField
        size={'small'}
        value={celsius}
        label={'Celsius Editor'}
        onChange={(e) => {
          const newValue = +e.target.value || 0;
          setCelsius(newValue);
          setCelsiusUpdate(newValue);
        }}
      />
    </StackWithBorder>
  );
}

function CelsiusEditorRedux({ init }: { init: number }) {
  renderCounterEditorRedux++;
  useEffect(() => {
    dispatchDataMap<number>('celsius', init);
  }, []);

  const celsius = useDataMap<number>('celsius') || 0;

  return (
    <StackWithBorder spacing={2}>
      <Box>CelsiusEditor Redux render: {renderCounterEditorRedux}</Box>

      <TextField
        size={'small'}
        value={celsius}
        label={'Celsius Editor'}
        onChange={(e) => {
          const newValue = +e.target.value || 0;
          dispatchDataMap<number>('celsius', newValue);
        }}
      />
    </StackWithBorder>
  );
}

function ReadOnly() {
  const celsius = useDataMap<number>('celsius') || 0;
  renderCounterReadOnly++;
  return (
    <StackWithBorder>
      <Box>ReadOnly render: {renderCounterReadOnly}</Box>

      <Box>useDataMap('celsius') : {celsius}</Box>
    </StackWithBorder>
  );
}
