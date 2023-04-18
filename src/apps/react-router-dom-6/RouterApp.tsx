import React from 'react';
import './RouterApp.css';
import { Box, Button, Stack } from '@mui/material';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLoaderData,
  useNavigate,
  useRouteError
} from 'react-router-dom';
import { App4TssReact } from '../tss-react/App4TssReact';
import { ReduxApp } from '../redux/ReduxApp';
import { StylingApp } from '../styling/StylingApp';
import { Docu, MeetingPage, Pages } from './Pages';
import { ProviderApp } from '../provider/ProviderApp';
import { MuiDataGridApp } from '../mui-datagrid/MuiDataGridApp';
import { RenderStuffApp } from '../render-stuff/RenderStuffApp';

const basename = process.env.PUBLIC_URL || '/';
console.debug('basename', basename);

const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: <Navigation />,
      errorElement: <ErrorPage />,
      loader: contactsLoader,
      children: [
        {
          path: 'pages/docu',
          element: <Docu />,
          errorElement: <ErrorPage />
        },
        {
          path: 'contact/:id',
          loader: contactLoader,
          element: <ContactDisplay />
        }
      ]
    },
    {
      path: '/redirect-test',
      element: <RedirectPage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/tss-react',
      element: <App4TssReact />,
      errorElement: <ErrorPage />
    },
    {
      path: '/data-grid',
      element: <MuiDataGridApp />,
      errorElement: <ErrorPage />
    },
    {
      path: '/redux',
      element: <ReduxApp />,
      errorElement: <ErrorPage />
    },
    {
      path: '/provider',
      element: <ProviderApp />,
      errorElement: <ErrorPage />
    },
    {
      path: '/styling',
      element: <StylingApp />,
      errorElement: <ErrorPage />
    },
    {
      path: '/pages/*',
      element: <Pages />,
      errorElement: <ErrorPage />
    },
    { path: '/renderstuff', element: <RenderStuffApp /> },
    {
      path: '/pages/meeting/*',
      element: <MeetingPage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/pages/meeting/:meetingId/:sortType?',
      element: <MeetingPage />,
      errorElement: <ErrorPage />
    }
  ],
  { basename }
);

export function RouterApp() {
  return (
    <div className="RouterApp">
      <RouterProvider router={router} />
    </div>
  );
}

function Navigation() {
  const { contacts } = useLoaderData() as { contacts: Contact[] };
  const navigate = useNavigate();

  return (
    <Stack direction={'column'} spacing={2} padding={2}>
      <h1>Navigation</h1>
      <Stack direction={'row'} spacing={2} padding={2}>
        <Button onClick={() => navigate('/redirect-test')}>
          Redirect Test
        </Button>
        <Button onClick={() => navigate('/tss-react')}>TSS React</Button>
        <Button onClick={() => navigate('/data-grid')}>Data Grid</Button>
        <Button onClick={() => navigate('/redux')}>Redux</Button>
        <Button onClick={() => navigate('/provider')}>Context Provider</Button>
        <Button onClick={() => navigate('/renderstuff')}>Render Stuff</Button>
        <Button onClick={() => navigate('/produce-error')}>Error</Button>

        {contacts.map((contact) => (
          <Button
            key={contact.id}
            onClick={() => {
              const uri = `/contact/${contact.id}`;
              navigate(uri);
            }}
          >
            {contact.id}
          </Button>
        ))}
        <Button onClick={() => navigate('/pages')}>To Pages</Button>
      </Stack>
      <Outlet />
    </Stack>
  );
}

function ContactDisplay() {
  const contact = useLoaderData() as Contact;
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      padding={2}
      sx={{ width: '20em' }}
      alignItems="flex-start"
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="baseline"
        spacing={2}
      >
        {' '}
        <Box>{contact.firstName}</Box>
        <Box sx={{ fontWeight: '600' }}>{contact.lastName}</Box>
      </Stack>
      <Button onClick={() => navigate('/')}>Back</Button>
    </Stack>
  );
}

function RedirectPage() {
  return (
    <Stack spacing={2} padding={2}>
      <Box sx={{ color: 'blue', fontWeight: '600' }}>
        Welcome to the Redirect Page!
      </Box>
      <Link to={'/'}>Back</Link>
    </Stack>
  );
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
}

export async function contactsLoader(): Promise<{ contacts: Contact[] }> {
  const contacts = await getContacts();
  return { contacts };
}

async function contactLoader({ params }: any): Promise<Contact | undefined> {
  console.info('params:', params);
  const contacts = await getContacts();
  const c = contacts.find((c) => {
    return c.id === params.id;
  });
  console.info('contact:', c);
  return c;
}

async function getContacts(): Promise<Contact[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', firstName: 'Johannes Sebastian', lastName: 'Bach' },
        { id: '2', firstName: 'Ludwig', lastName: 'van Beethoven' }
      ]);
    }, 300);
  });
}

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  let errorString = '???';

  if (typeof error === 'object') {
    errorString = JSON.stringify(error);
  } else if (error === 'string' || error === 'number') {
    errorString = '' + error;
  }

  return (
    <Stack
      sx={{
        border: 'red dashed 1px',
        top: '2em',
        right: '2em',
        bottom: '2em',
        left: '2em',
        position: 'absolute'
      }}
      padding={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box sx={{ color: 'red' }}>
        <h2>Welcome to the error page!</h2>
        <h3>Error:</h3>
        <Box>{errorString}</Box>
      </Box>
      <Button onClick={() => navigate('/')}>Back</Button>
    </Stack>
  );
}
