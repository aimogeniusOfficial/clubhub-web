import React, { useMemo } from 'react';

import useUserRoles from 'hooks/auth/useUserRole';
import { AccessRoleTypes } from 'types/enums/access-role-types';

import Loading from '../pages/shared/Loading';

const AdminAppRoutes = React.lazy(() => import('./AdminAppRoutes'));
const PrivateAppRoutes = React.lazy(() => import('./PrivateAppRoutes'));

const PrivateRoutes = (): JSX.Element => {
  const { isLoading, data: userRolesResponse } = useUserRoles();
  const accessRoleIds = useMemo(
    () => userRolesResponse?.data?.map(userRole => userRole.accessRoleId),
    [userRolesResponse],
  );

  if (isLoading || accessRoleIds?.length === 0) {
    return <Loading />;
  }

  // With this current setup, we can not have admin user who also a grower
  // for not to access admin feature add ADMIN access role, and if
  // user is needs to access grower feature then remove ADMIN access role
  if (accessRoleIds?.includes(AccessRoleTypes.ADMIN)) {
    return <AdminAppRoutes />;
  }

  if (
    accessRoleIds?.find(userRoleId =>
      [AccessRoleTypes.GROWER, AccessRoleTypes.BREEDER].includes(userRoleId as AccessRoleTypes),
    )
  ) {
    // TODO: separate grower and breeder routes
    return <PrivateAppRoutes />;
  }

  // TODO: Add proper unauthorized component
  return <div>Unauthorized access</div>;
};

export default PrivateRoutes;
