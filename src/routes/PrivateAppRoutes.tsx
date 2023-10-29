import React from 'react';

import Account from 'pages/private/student/Account/Account';
import PaymentPlanSelection from 'pages/private/student/Account/BillingPanel/Membership/SubscriptionPlanSelection';
import Calendar from 'pages/private/student/Calendar/Calendar';
import ClubListLayout from 'pages/private/student/ClubList/ClubListLayout';
import Home from 'pages/private/student/Home';
import MyClubs from 'pages/private/student/MyClubs/MyClubs';
import ResetPassword from 'pages/public/auth/ResetPassword';
import SuccessPage from 'pages/public/auth/SuccessPage';
import NotFound from 'pages/shared/NotFound';
import Uikit from 'pages/shared/Uikit/Uikit';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from './layouts/PrivateLayout';
import { RoutesMap } from './types';

export const growerBreederRoutesMap: RoutesMap = {
  '/': <Home />,
  '/login': <Navigate to='/' replace />,
  '/success': <SuccessPage />,
  '/reset-password': <ResetPassword />,
  '/calendar': <Calendar />,
  '/clubs': <MyClubs />,
  '/membership': <PaymentPlanSelection />,
  '/account/:activeTab?': <Account />,
  '*': <NotFound />,
};

const PrivateAppRoutes = (): JSX.Element => {
  return (
    <Routes>
      {Object.keys(growerBreederRoutesMap).map(path => (
        <Route
          key={path}
          path={path}
          element={<AuthenticatedLayout>{growerBreederRoutesMap[path]}</AuthenticatedLayout>}
        />
      ))}
      <Route path='/find' element={<ClubListLayout />} />
      {import.meta.env.DEV && <Route path='/uikit' element={<Uikit />} />}
    </Routes>
  );
};

export default PrivateAppRoutes;
