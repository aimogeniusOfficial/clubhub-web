import React from 'react';

import Account from 'pages/private/grower/Account/Account';
import PaymentPlanSelection from 'pages/private/grower/Account/BillingPanel/Membership/SubscriptionPlanSelection';
import BreederDetail from 'pages/private/grower/BreederDetail';
import Breeders from 'pages/private/grower/Breeders/Breeders';
import CultivarDetail from 'pages/private/grower/CultivarDetail';
import Cultivars from 'pages/private/grower/Cultivars/Cultivars';
import GrowCycleDetailPage from 'pages/private/grower/GrowCycleDetail';
import GrowCycles from 'pages/private/grower/GrowCycles';
import GrowerCultivars from 'pages/private/grower/GrowerCultivars/GrowerCultivars';
import GrowSpace from 'pages/private/grower/GrowSpace/GrowSpace';
import GrowSpaceDetail from 'pages/private/grower/GrowSpaceDetails';
import Home from 'pages/private/grower/Home';
import LightControlPanel from 'pages/private/grower/LightControlPanel';
import LightControlPanelDetail from 'pages/private/grower/LightControlPanelDetail';
import MyVault from 'pages/private/grower/MyVault';
import PlantDetails from 'pages/private/grower/PlantDetails';
import PlantManagement from 'pages/private/grower/PlantManagement';
import ShamanChat from 'pages/private/grower/ShamanChat';
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
  '/chat': <ShamanChat />,
  '/grow-space': <GrowSpace />,
  '/grow-space/:growSpaceId/:activeTab?': <GrowSpaceDetail />,
  '/cultivars': <Cultivars />,
  '/cultivars/:cultivarId': <CultivarDetail />,
  '/breeders/:breederId': <BreederDetail />,
  '/my-cultivars': <GrowerCultivars />,
  '/plant-management': <PlantManagement />,
  '/plant/:plantId': <PlantDetails />,
  '/membership': <PaymentPlanSelection />,
  '/grow-cycle': <GrowCycles />,
  '/grow-cycle/:growCycleId': <GrowCycleDetailPage />,
  '/light-control-panel': <LightControlPanel />,
  '/light-control-panel/demoId': <LightControlPanelDetail />,
  '/account/:activeTab?': <Account />,
  '/vault': <MyVault />,
  '*': <NotFound />,
};

const ShamanAppRoutes = (): JSX.Element => {
  return (
    <Routes>
      {Object.keys(growerBreederRoutesMap).map(path => (
        <Route
          key={path}
          path={path}
          element={<AuthenticatedLayout>{growerBreederRoutesMap[path]}</AuthenticatedLayout>}
        />
      ))}
      {import.meta.env.DEV && <Route path='/uikit' element={<Uikit />} />}
    </Routes>
  );
};

export default ShamanAppRoutes;
