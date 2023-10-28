import React from 'react';

import { Notification } from '@mantine/core';

const AnnouncementNotification = ({ title, message, close, color }: any): JSX.Element => {
  return (
    <Notification
      withBorder
      radius='md'
      title={title}
      color={color}
      onClose={close}
      withCloseButton={false}
    >
      {message}
    </Notification>
  );
};

export default AnnouncementNotification;
