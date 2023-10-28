import React from 'react';

import { Flex, Tabs, Title, Stack, Center, Text, Skeleton } from '@mantine/core';
import EmptyState from 'components/states/EmptyState';
import useProfile from 'hooks/auth/useProfile';
import { useNavigate, useParams } from 'react-router-dom';

import AccountPanel from './AcountPanel/AccountPanel';
import MembershipPanel from './BillingPanel/MembershipPanel';

const TABS = {
  ACCOUNT_TAB: 'account',
  BILLING_TAB: 'billing',
  PREFERENCES_TAB: 'preferences',
  NOTIFICATIONS_TAB: 'notifications',
};

const Account = (): JSX.Element => {
  const { activeTab } = useParams();
  const navigate = useNavigate();

  const { data: userProfile } = useProfile();

  return (
    <Stack spacing='lg'>
      <Flex direction='column'>
        <Title order={1} weight={700} color='neutral.0'>
          Account Settings
        </Title>
        <Text color='neutral.3'>Profile, membership, preferences and notification settings</Text>
      </Flex>

      <Tabs
        color='green'
        value={activeTab || TABS.ACCOUNT_TAB}
        onTabChange={value => navigate(`/account/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value={TABS.ACCOUNT_TAB}>Account</Tabs.Tab>
          <Tabs.Tab value={TABS.BILLING_TAB}>Membership</Tabs.Tab>
          <Tabs.Tab value={TABS.PREFERENCES_TAB}>Preferences</Tabs.Tab>
          <Tabs.Tab value={TABS.NOTIFICATIONS_TAB}>Notifications</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TABS.ACCOUNT_TAB} pt='xs'>
          {/* TODO show the skeleton when form is being loaded */}
          {userProfile ? <AccountPanel profile={userProfile.data} /> : <Skeleton />}
        </Tabs.Panel>
        <Tabs.Panel value={TABS.BILLING_TAB} pt='xs'>
          <MembershipPanel />
        </Tabs.Panel>

        <Tabs.Panel value={TABS.PREFERENCES_TAB} pt='xs'>
          <Center py='xl'>
            <EmptyState
              title='In development'
              description='We are working on this section. Try to get back later.'
            />
          </Center>
        </Tabs.Panel>

        <Tabs.Panel value={TABS.NOTIFICATIONS_TAB} pt='xs'>
          <Center py='xl'>
            <EmptyState
              title='In development'
              description='We are working on this section. Try to get back later.'
            />
          </Center>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default Account;
