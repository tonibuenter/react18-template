import React, {useContext, useMemo, useState} from 'react';
import {Box, Stack, TextField} from '@mui/material';


export type DataContextDataType = Record<string, string | number | boolean | any>;

interface DataContextType {
  data: DataContextDataType
  data2: DataContextDataType
  setData: (data: (DataContextDataType | ((data: DataContextDataType) => void))) => void
  setData2: (data: (DataContextDataType | ((data: DataContextDataType) => void))) => void
}

interface DataContextType3 {
  data3: DataContextDataType
  setData3: (data: (DataContextDataType | ((data: DataContextDataType) => void))) => void
}


const DataContext = React.createContext<DataContextType>({
  data: {},
  setData: (() => undefined),
  data2: {},
  setData2: (() => undefined)
});


const DataContext3 = React.createContext<DataContextType3>({
  data3: {},
  setData3: (() => undefined)
});

const initData = {}

export function ProviderApp() {
  const [data, setData] = useState<DataContextDataType>(initData)
  const [data2, setData2] = useState<DataContextDataType>(initData)
  const [data3, setData3] = useState<DataContextDataType>(initData)

  const contextValue12 = useMemo(() => ({data, setData, data2, setData2}), [data, data2]);
  const contextValue3 = useMemo(() => ({data3, setData3}), [data3]);

  return (
      <Box>
        <DataContext.Provider value={contextValue12}>
          <DataContext3.Provider value={contextValue3}>
            <InnerApp12/>
            <InnerApp3/>
          </DataContext3.Provider>
        </DataContext.Provider>
      </Box>
  );
}


function InnerApp12() {

  const {data, data2} = useContext(DataContext);
  return <Stack spacing={1}><h3>Welcome to the useContext 1&2 Example App</h3>
    <Box>Currently the data value is {JSON.stringify(data)}</Box>
    <Box>Currently the data2 value is {JSON.stringify(data2)}</Box>
    <DataChanger/>
    <DataChanger2/>
  </Stack>
}

function InnerApp3() {

  const {data3} = useContext(DataContext3);

  return <Stack spacing={1}><h3>Welcome to the useContext 3 Example App</h3>

    <Box>Currently the data3 value is {JSON.stringify(data3)}</Box>

    <DataChanger3/>
  </Stack>
}


const renderCounter: Map<string, number> = new Map<string, number>();

function DataChanger() {

  const {setData, data} = useContext(DataContext);

  const count = renderCounter.get('DataChanger') || 1
  renderCounter.set('DataChanger', count + 1)

  return <Stack spacing={2}>
    <h3>Data Changer</h3>
    <h5>Render count {count}</h5>
    <TextField value={data.firstName || ''} label="First Name" variant="outlined"
               onChange={(e) => setData((data) => ({...data, firstName: e.target.value}))}
    />
    <TextField value={data.lastName || ''} label="Last Name" variant="outlined"
               onChange={(e) => setData((data) => ({...data, lastName: e.target.value}))}
    />
  </Stack>
}


function DataChanger2() {

  const {setData2, data2} = useContext(DataContext);

  const renderCount = renderCounter.get('DataChanger2') || 1
  renderCounter.set('DataChanger2', renderCount + 1)

  return <Stack spacing={2}>
    <h3>Data Changer 2</h3>
    <h5>Render count {renderCount}</h5>
    <TextField value={data2.firstName || ''} label="First Name" variant="outlined"
               onChange={(e) => setData2((data) => ({...data, firstName: e.target.value}))}
    />

    <TextField value={data2.lastName || ''} label="Last Name" variant="outlined"
               onChange={(e) => setData2((data) => ({...data, lastName: e.target.value}))}
    />

  </Stack>
}


const data3Counter: Set<any> = new Set<any>();
const setData3Counter: Set<any> = new Set<any>();

function DataChanger3() {

  const {setData3, data3} = useContext(DataContext3);
  data3Counter.add(data3)
  setData3Counter.add(setData3)

  const renderCount = renderCounter.get('DataChanger3') || 1
  renderCounter.set('DataChanger3', renderCount + 1)

  return <Stack spacing={2}>
    <h3>Data Changer 3 (independent from 1 and 2)</h3>
    <h5>Render count {renderCount}</h5>
    <h5>data3 count {data3Counter.size}</h5>
    <h5>setData3 count {setData3Counter.size}</h5>
    <TextField value={data3.firstName || ''} label="First Name" variant="outlined"
               onChange={(e) => setData3((data) => ({...data, firstName: e.target.value}))}
    />

    <TextField value={data3.lastName || ''} label="Last Name" variant="outlined"
               onChange={(e) => setData3((data) => ({...data, lastName: e.target.value}))}
    />

  </Stack>
}
