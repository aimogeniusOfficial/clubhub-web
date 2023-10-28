import React from 'react';

import ErrorBoundary from 'components/states/ErrorBoundary';
import { useAuth } from 'contexts/AuthContext';
import Loading from 'pages/shared/Loading';
import ServerError from 'pages/shared/ServerError';
import PrivateRoutes from 'routes/PrivateRoutes';
import PublicRoutes from 'routes/PublicRoutes';

const Router = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <ErrorBoundary errorMessage={<ServerError />}>
      <React.Suspense fallback={<Loading />}>
        {user ? <PrivateRoutes /> : <PublicRoutes />}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Router;
