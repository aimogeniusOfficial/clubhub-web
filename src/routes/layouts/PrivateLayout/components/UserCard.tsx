import React from 'react';

import { Button, MediaQuery, Menu, Paper, Stack } from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import { useAuth } from 'contexts/AuthContext';
import useProfile from 'hooks/auth/useProfile';
import { Link } from 'react-router-dom';

import UserButton from './UserButton';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

interface UserCardProps {
  opened: boolean;
}
const UserCard = ({ opened }: UserCardProps): JSX.Element => {
  const { signOut, user } = useAuth();

  const { data: userProfile } = useProfile();
  const username = userProfile?.data.username;

  const handleLogout = async (): Promise<void> => {
    await signOut();
  };

  return (
    <Paper 
      
      radius='lg'
      pl='sm'
      pr='xl'
      //p={opened ? 'xs' : 0}
      shadow='sm'
      sx={theme => ({
        backgroundColor: theme.colors.neutral[5],  
        width:'80%',
        height:'70%'
      })}
      
    >
      <Stack>
        <Menu position='top' offset={20} shadow='xl' width={200}>
          <Menu.Target>
            <UserButton
              name={userProfile?.data.name}
              username={username ? `@${username}` : user.email}
              imageUrl={undefined}
              opened={opened}
              isPaid={userProfile?.data.subscriptionPlanId === '2'}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account actions</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />}>
              <Link to='/account' style={linkStyle}>
                Account Settings
              </Link>
            </Menu.Item>
            <Menu.Item onClick={handleLogout} color='red' icon={<IconLogout size={14} />}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Stack>
    </Paper>
  );
};

export default UserCard;
