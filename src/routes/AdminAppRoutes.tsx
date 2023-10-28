import React from 'react';

import AdminHome from 'pages/private/admin';
import Uikit from 'pages/shared/Uikit/Uikit';
import { Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from './layouts/PrivateLayout';
import { growerBreederRoutesMap } from './ShamanAppRoutes';
import { RoutesMap } from './types';

export const adminRoutesMap: RoutesMap = {
  ...growerBreederRoutesMap,
  '/admin': <AdminHome />,
};

const AdminAppRoutes = (): JSX.Element => {
  return (
    <Routes>
      {Object.keys(adminRoutesMap).map(path => (
        <Route
          key={path}
          path={path}
          element={<AuthenticatedLayout>{adminRoutesMap[path]}</AuthenticatedLayout>}
        />
      ))}
      {import.meta.env.DEV && <Route path='/uikit' element={<Uikit />} />}
    </Routes>
  );
};

export default AdminAppRoutes;
