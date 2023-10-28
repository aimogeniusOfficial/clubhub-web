import React from 'react';

import Auth from 'pages/public/auth/Auth';
import RequestReset from 'pages/public/auth/RequestReset';
import ResetPassword from 'pages/public/auth/ResetPassword';
import SuccessPage from 'pages/public/auth/SuccessPage';

import { Navigate, Route, Routes } from 'react-router-dom';

import { RoutesMap } from './types';
import PublicLayout from './layouts/PublicLayout';
import Landing from 'pages/public/landing/Landing';

export const authRoutesMap: RoutesMap = {
  '/login': <Auth />,
  '/request-password': <RequestReset />,
  '/reset-password': <ResetPassword />,
  '/success': <SuccessPage />,
  '*': <Landing />,
};

const PublicRoutes = (): JSX.Element => {
  const checkIsAuthorizationLayout = (path: string): boolean => {
    return ['/login', '/register', '/request-password', '/reset-password'].includes(path);
  };

  return (
    <Routes>
      {Object.keys(authRoutesMap).map(path => (
        <Route
          key={path}
          path={path}
          element={
            <PublicLayout isAuthorizationLayout={checkIsAuthorizationLayout(path)}>
              {authRoutesMap[path]}
            </PublicLayout>
          }
        />
      ))}
    </Routes>
  );
};

export default PublicRoutes;
