import React from 'react';

import { Group, Text, UnstyledButton } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

const LikeButton = ({
  onClick,
  isActive,
}: {
  onClick: () => void;
  isActive: boolean;
}): JSX.Element => {
  return (
    <UnstyledButton
      type='button'
      py='xs'
      px='xs'
      sx={theme => ({
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.fn.rgba(theme.colors.neutral[6], 0.5),
        },
      })}
      onClick={onClick}
    >
      <Group>
        {isActive ? (
          <IconHeartFilled size={25} color='teal' />
        ) : (
          <IconHeart size={25} color='gray' />
        )}
        <Text fw={700}>Like</Text>
      </Group>
    </UnstyledButton>
  );
};

export default LikeButton;
