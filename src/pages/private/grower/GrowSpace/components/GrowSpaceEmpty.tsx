import React from 'react';

import { Button, Image, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import emptySpaceImage from 'assets/images/empty-space-illustration.png';

interface GrowSpaceEmptyProps {
  openCreateModal: () => void;
}
const GrowSpaceEmpty = ({ openCreateModal }: GrowSpaceEmptyProps): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <div>
      <Text py='xs' px='xl' size='md' align='center'>
        You don&apos;t have any grow spaces yet.
      </Text>
      <Stack maw={200} mx='auto' spacing='xs'>
        <Image src={emptySpaceImage} />
        <Button
          mt='xl'
          radius='md'
          mx='auto'
          leftIcon={<IconPlus size={theme.fontSizes.md} />}
          onClick={openCreateModal}
        >
          Add space
        </Button>
      </Stack>
    </div>
  );
};

export default GrowSpaceEmpty;
