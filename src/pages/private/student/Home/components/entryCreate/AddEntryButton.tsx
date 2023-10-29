import React from 'react';

import { Group, Text, ActionIcon, UnstyledButton } from '@mantine/core';
import { IconDots, IconMapPin, IconMoodSmile, IconPhoto, IconUserPlus } from '@tabler/icons-react';

const AddEntryButton = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return (
    <UnstyledButton
      type='button'
      py='xs'
      px='xl'
      sx={theme => ({
        border: `2px solid ${theme.colors.neutral[4]}`,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.fn.rgba(theme.colors.neutral[6], 0.5),
        },
      })}
      onClick={onClick}
    >
      <Group position='apart'>
        <Text>Add Attachment </Text>
        <Group>
          <IconPhoto size={32} color='teal' />
          {/* React gives error becuase it is not good to nest button inside button */}
          {/* UnstyledButton -> ActionIcon */}
          {/*<ActionIcon size={32}>*/}
          {/*  <IconPhoto size={32} color='teal' />*/}
          {/*</ActionIcon>*/}
          {/*<ActionIcon size={32}>*/}
          {/*  <IconDots />*/}
          {/*</ActionIcon>*/}
        </Group>
      </Group>
    </UnstyledButton>
  );
};

export default AddEntryButton;
