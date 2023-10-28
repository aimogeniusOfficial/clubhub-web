import React from 'react';

import { Modal, ModalProps } from '@mantine/core';
import useGetPrediction from 'hooks/cnn/usePredictClass';

import { renderMedia } from './GrowerEntryCard';

interface EntryDetailModalProps extends ModalProps {
  activeUrl: string;
}
const EntryDetailModal = ({ activeUrl, opened, onClose }: EntryDetailModalProps): JSX.Element => {
  // console.log(activeUrl);
  const { data: prediction } = useGetPrediction(activeUrl);
  console.log(prediction);
  return (
    <Modal size='xl' zIndex={9999} opened={opened} onClose={onClose}>
      {renderMedia(activeUrl)}
    </Modal>
  );
};

export default EntryDetailModal;
