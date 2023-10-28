import React from 'react';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'contexts/AuthContext';
import { FeatureGateProvider } from 'contexts/FeatureGateContext';
import { MaintenanceRouter } from 'MaintenanceRouter';
import { BrowserRouter } from 'react-router-dom';

import Router from './Router';
import { darkTheme } from './styles/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={darkTheme} withGlobalStyles withNormalizeCSS>
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
