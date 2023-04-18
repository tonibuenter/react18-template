import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useSelector } from 'react-redux';
import { isError, StatusMessage } from '../../common';

interface State0 {
  requestRunning: string;
  datamap: any;
  currentValue: string;
}

const initialState: State0 = {
  requestRunning: '',
  datamap: {},
  currentValue: ''
};

export const slice0 = createSlice({
  name: 'slice0',
  initialState,
  reducers: {
    setRequestRunning: (state: State0, action: PayloadAction<string>) => {
      state.requestRunning = action.payload;
    },
    setCurrentValue: (state: State0, action: PayloadAction<string>) => {
      state.currentValue = action.payload;
    },
    setDatamap: (
      state: State0,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;
      state.datamap[name] = value;
    }
  }
});

export const { setRequestRunning, setCurrentValue, setDatamap } =
  slice0.actions;

export const store = configureStore({
  reducer: {
    slice0: slice0.reducer
  }
});
export type Slice0State = ReturnType<typeof store.getState>;

export const getRequestRunning = (): string =>
  store.getState().slice0.requestRunning;
export const getCurrentValue = (): string =>
  store.getState().slice0.currentValue;
export const getData = (name: string): any =>
  store.getState().slice0.datamap[name];

export const useRequestRunning = () =>
  useSelector((state: Slice0State) => state.slice0.requestRunning);

export const dispatchRequestRunning = (r: string) =>
  store.dispatch(setRequestRunning(r));

export const useCurrentValue = () =>
  useSelector((state: Slice0State) => state.slice0.currentValue);
export const dispatchCurrentValue = (r: string) =>
  store.dispatch(setCurrentValue(r));

export const useDataMap = <D>(name: string): D =>
  useSelector((state: Slice0State) => state.slice0.datamap[name]);

export const getDataMap = <D>(name: string): D =>
  store.getState().slice0.datamap[name];

export const dispatchDataMap = <D>(name: string, value: D) =>
  store.dispatch(setDatamap({ name, value }));
export const useState0 = () =>
  useSelector((state: Slice0State) => state.slice0);

export async function runAsync<R>(
  requestRunningMessage: string,
  remoteCall: () => Promise<R>
): Promise<R | StatusMessage> {
  try {
    dispatchRequestRunning(requestRunningMessage);
    return await remoteCall();
  } catch (e) {
    if (isError(e)) {
      console.error(e);
      return {
        status: 'error',
        userMessage: `Error when calling ${requestRunningMessage}`
      };
    }
    return { status: 'error', userMessage: `Unknown Error` };
  } finally {
    dispatchRequestRunning('');
  }
}
