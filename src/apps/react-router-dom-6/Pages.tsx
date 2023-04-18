import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

export function Pages() {
  return (
    <Stack>
      <h2>Welcome to Pages</h2>
      <RoutingAround
        routes={[
          '/pages',
          '/pages/docu',
          'docu',
          'meeting/4711/byName',
          'meeting/4711'
        ]}
      ></RoutingAround>
    </Stack>
  );
}

export function Docu() {
  const navigate = useNavigate();
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <h3>Docu</h3>
      <Button onClick={() => navigate('/pages')}>Back to /pages</Button>
    </Stack>
  );
}

export function RoutingAround({ routes = [] }: { routes?: string[] }) {
  const params = useParams();
  const paramsKeys = Object.keys(params);
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <h4>Routing Around</h4>
      <h5>Params ({paramsKeys.length})</h5>
      {paramsKeys.map((paramsKey) => (
        <Box key={paramsKey}>
          {paramsKey} : {params[paramsKey]}
        </Box>
      ))}

      <h5>Routes ({routes.length})</h5>
      {routes.map((route) => (
        <Link key={route} to={route}>
          {route}
        </Link>
      ))}
    </Stack>
  );
}

export function MeetingPage() {
  const { meetingId, sortType } =
    useParams<Record<'meetingId' | 'sortType', string | undefined>>();
  const navigate = useNavigate();

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <h3>Meeting Page</h3>
      <Box>Meeting Id: {meetingId}</Box>
      <Box>Sort Type: {sortType}</Box>
      <Button onClick={() => navigate('/pages')}>Back to /pages</Button>
      <Button onClick={() => navigate('/')}>Back to /</Button>
    </Stack>
  );
}
