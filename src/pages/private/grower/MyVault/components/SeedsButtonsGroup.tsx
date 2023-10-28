import React from 'react';

import { Button, Group, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleCheck } from '@tabler/icons-react';

const SeedsButtonsGroup = (): JSX.Element => {
  const theme = useMantineTheme();
  const [isVerifyModalOpen, { open: openVerifyModal, close: closeVerifyModal }] =
    useDisclosure(false);

  return (
    <>
      <Group>
        <Button
          leftIcon={<IconCircleCheck size={theme.fontSizes.lg} />}
          onClick={openVerifyModal}
          size='sm'
        >
          Verify
        </Button>
      </Group>
      {/* TODO: VERIFY MODAL */}
    </>
  );
};

export default SeedsButtonsGroup;
