import React from 'react';

import { Paper, Group, Title, Text, Button, Stack, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LoadingOverlay from 'components/states/LoadingOverlay';
import usePlant from 'hooks/plants/usePlant';
import { useParams } from 'react-router-dom';

import PlantDeleteModal from './components/PlantDeleteModal';
import PlantUpdateModal from './components/PlantUpdateModal';

const PlantDetails = (): JSX.Element => {
  const { plantId } = useParams();

  const [isUpdateModalOpen, { open: openUpdateModal, close: closeUpdateModal }] =
    useDisclosure(false);
  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { data: plantData, isLoading: plantIsLoading } = usePlant(plantId || '');

  return (
    <>
      <Stack>
        <LoadingOverlay visible={plantIsLoading} />
        <Paper withBorder radius='md' p='xs'>
          {plantData?.data && (
            <>
              <Group position='apart' mb='xs'>
                <Title order={2}>Plant Details</Title>
                <Group>
                  <Button variant='outline' color='red' onClick={openDeleteModal}>
                    Delete
                  </Button>
                  <Button variant='outline' onClick={openUpdateModal}>
                    Edit
                  </Button>
                </Group>
              </Group>
              <Group align='start'>
                <div>
                  <Text color='dimmed'>Name:</Text>
                  <Title order={4} h='100%'>
                    {plantData.data.name}
                  </Title>
                  <Text color='dimmed'>Plant Type:</Text>
                  <Title order={4} h='100%'>
                    {plantData.data.plant_types.name}
                  </Title>
                  <Text color='dimmed'>Breeder</Text>
                  <Title order={4} h='100%'>
                    {plantData.data.breeders.name}
                  </Title>
                  <Text color='dimmed'>Cultivar</Text>
                  <Title order={4} h='100%'>
                    {plantData.data.cultivars.name}
                  </Title>
                </div>
              </Group>
            </>
          )}
        </Paper>
        <Paper withBorder radius='md' p='xs'>
          <Title order={2}>Journal Notes</Title>
          <Stack spacing={8} mt='xs'>
            <Skeleton height={10} radius='xl' />
            <Skeleton height={10} radius='xl' />
            <Skeleton height={10} radius='xl' />
            <Skeleton height={10} radius='xl' />
            <Skeleton height={10} radius='xl' />
          </Stack>
        </Paper>
      </Stack>
      {plantData?.data && (
        <>
          <PlantUpdateModal
            plant={plantData.data}
            opened={isUpdateModalOpen}
            onClose={closeUpdateModal}
          />
          <PlantDeleteModal
            plant={plantData.data}
            opened={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
        </>
      )}
    </>
  );
};
export default PlantDetails;
