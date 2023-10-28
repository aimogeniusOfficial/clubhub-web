import React from 'react';

import { Group, Modal, ModalProps, SimpleGrid, Text, UnstyledButton } from '@mantine/core';
import { IconMapPin, IconMoodSmile, IconPhoto, IconUserPlus } from '@tabler/icons-react';
import { EntryActionTypes } from 'types/enums/entry-action-types';

interface AddEntryModalProps extends ModalProps {
  onActionClick: (action: EntryActionTypes) => void;
}

const menuItems: Array<{
  action: EntryActionTypes;
  icon: JSX.Element;
  label: string;
}> = [
  {
    action: EntryActionTypes.Photo,
    icon: <IconPhoto color='teal' />,
    label: 'Photo/Video',
  },
];

const AddEntryModal = ({ opened, onClose, onActionClick }: AddEntryModalProps): JSX.Element => {
  const handleActionClick = (action: EntryActionTypes): void => {
    onActionClick(action);
    onClose();
  };
  return (
    <Modal
      size='md'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title={<Text weight={500}>Add to Your Entry</Text>}
      centered
    >
      <SimpleGrid
        pt='md'
        breakpoints={[
          { minWidth: 'sm', cols: 1 },
        ]}
      >
        {menuItems.map(({ icon, label, action }) => (
          <UnstyledButton
            key={label}
            px='md'
            py='sm'
            onClick={() => handleActionClick(action)}
            sx={theme => ({
              '&:hover': {
                backgroundColor: theme.colors.neutral[6],
                borderRadius: theme.radius.md,
              },
            })}
          >
            <Group>
              {icon}
              <Text>{label}</Text>
            </Group>
          </UnstyledButton>
        ))}
      </SimpleGrid>
    </Modal>
  );
};

export default AddEntryModal;
