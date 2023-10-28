import React, { forwardRef } from 'react';

import {
  Avatar,
  Badge,
  createStyles,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: opened ? theme.spacing.xs : 0,
  },

  userTitle: {
    display: opened ? 'flex' : 'none',
    flexFlow: 'column',
    width: '100%',
  },
}));

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  opened: boolean;
  imageUrl?: string;
  name?: string;
  username: string;
  isPaid: boolean;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ imageUrl, name, username, opened, isPaid, ...userButtonProps }: UserButtonProps, ref) => {
    const theme = useMantineTheme();
    const { classes } = useStyles({ opened });

    return (
      <UnstyledButton ref={ref} className={classes.button} {...userButtonProps}>
        <Group position='apart' spacing='xs' noWrap>
          <Avatar src={imageUrl} radius='xl' size='md' />
          <div className={classes.userTitle}>
            <Text size='md' weight={700} color='neutral.0' lineClamp={1}>
              {name}
            </Text>

            <Text size='xs' lineClamp={1} color={theme.fn.rgba(theme.colors.neutral[2], 0.5)}>
              {username}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    );
  },
);

export default UserButton;
