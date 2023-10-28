import React, { useEffect, useState } from 'react';

import { Card, Switch, Text, Loader, List } from '@mantine/core';
import useFeatures from 'hooks/features/useFeatures';
import useUpdateFeature from 'hooks/features/useUpdateFeature';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

const Features = (): JSX.Element => {
  const [features, setFeatures] = useState<any[]>([]);
  const { data: featuresData, isLoading } = useFeatures();
  const updateFeatureMutation = useUpdateFeature();

  useEffect(() => {
    setFeatures(featuresData?.data ?? []);
  }, [featuresData]);

  if (isLoading) {
    return <Loader size='xs' />;
  }

  if (!featuresData?.data || featuresData.data.length === 0) {
    return (
      <Text size='xs' color='dark.2'>
        No Features Available
      </Text>
    );
  }

  const toggleFeature = (id: number) => {
    const updatedFeature = features.find(feature => feature.id === id);
    updatedFeature.is_enabled = !updatedFeature.is_enabled;

    updateFeatureMutation.mutate(updatedFeature, {
      onSuccess: () => {
        showSuccessNotification(`Feature ${updatedFeature.description} updated successfully`);
      },
      onError: error => {
        showErrorNotification('Failed to update features', error.message);
      },
    });
  };

  return (
    <Card withBorder radius='md' p='xl'>
      <div>
        <List style={{ listStyleType: 'none' }} p='md'>
          {features.map(({ id, name, description, is_enabled }) => (
            <List.Item key={name} title={name} p='xs'>
              <Switch
                onLabel='ON'
                offLabel='OFF'
                label={description}
                size='lg'
                checked={is_enabled}
                onChange={() => toggleFeature(id)}
              />
            </List.Item>
          ))}
        </List>
      </div>
    </Card>
  );
};

export default Features;
