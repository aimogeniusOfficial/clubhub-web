import React from 'react';

import { Text, Timeline, useMantineTheme, Tooltip, Loader } from '@mantine/core';
import dayjs from 'dayjs';
import useVersions from 'hooks/versions/useVersions';

const VersionTimeline = (): JSX.Element => {
  const theme = useMantineTheme();

  const { data, isLoading } = useVersions();

  if (isLoading) {
    return <Loader size='xs' />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <Text size='xs' color='dark.2'>
        v.01
      </Text>
    );
  }

  return (
    <Tooltip.Floating
      position='right-start'
      offset={16}
      color={theme.colorScheme === 'dark' ? 'gray' : 'white'}
      sx={{
        boxShadow: theme.shadows.xl,
        maxWidth: 300,
      }}
      label={
        <Timeline
          active={data.data.length}
          bulletSize={14}
          color='green'
          lineWidth={2}
          p={theme.spacing.md}
        >
          {data.data.map(({ name, description, createdAt }) => (
            <Timeline.Item key={name} title={name}>
              <Text color={theme.colorScheme === 'dark' ? 'white' : 'black'} size='sm'>
                {description}
              </Text>
              <Text size='xs' mt={4}>
                {dayjs(createdAt).format('MMMM D, YYYY')}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      }
    >
      <Text size='xs' color='dimmed'>
        {data.data[0].name}
      </Text>
    </Tooltip.Floating>
  );
};
export default VersionTimeline;
