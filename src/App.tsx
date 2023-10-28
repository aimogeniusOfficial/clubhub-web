import React from 'react';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from 'contexts/AuthContext';
import { FeatureGateProvider } from 'contexts/FeatureGateContext';
import { MaintenanceRouter } from 'MaintenanceRouter';
import { BrowserRouter } from 'react-router-dom';

import Router from './Router';
import { lightTheme } from './styles/theme';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={lightTheme} withGlobalStyles withNormalizeCSS>
        <AuthProvider>
          <ModalsProvider>
            <Notifications zIndex={10000} position='top-right' />
            <MaintenanceRouter>
              <FeatureGateProvider>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </FeatureGateProvider>
            </MaintenanceRouter>
          </ModalsProvider>
        </AuthProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
