import React from 'react';

import { Stack } from '@mantine/core';

import UserInvite from './components/UserInvite';
import Features from './features/Features';

const AdminHome = (): JSX.Element => {
  return (
    <Stack>
      <UserInvite />
      <Features />
    </Stack>
  );
};

export default AdminHome;
