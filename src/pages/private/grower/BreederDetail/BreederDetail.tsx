import React from 'react';

import { Paper, Group, Title, Text, Button, Stack, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDiscountCheckFilled } from '@tabler/icons-react';
import LoadingOverlay from 'components/states/LoadingOverlay';
import useProfile from 'hooks/auth/useProfile';
import useBreeders from 'hooks/breeders/useBreeders';
import { useParams, useNavigate } from 'react-router-dom';
import { isAdmin } from 'utils/roleAccessHelper';

import BreederDeleteModal from './components/breederDeleteModal';
import BreederUpdateModal from './components/breederUpdateModal';

const BreederDetail = (): JSX.Element => {
  const { breederId } = useParams();
  const { data: userProfile } = useProfile();

  const [isUpdateModalOpen, { open: openUpdateModal, close: closeUpdateModal }] =
    useDisclosure(false);
  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const goBack = (): void => {
    navigate(-1);
  };
  const { data: breederData, isLoading: breederIsLoading } = useBreeders(breederId || '');

  return (
    <>
      <Stack>
        <LoadingOverlay visible={breederIsLoading} />
        <Paper withBorder radius='md' p='xs'>
          {breederData?.data && (
            <>
              <Group position='apart' mb='xs'>
                <Group>
                  <Title order={2}>Breeder Details</Title>
                  {breederData.data.isVerified && <IconDiscountCheckFilled color='red' />}
                </Group>
                <Group>
                  {isAdmin(userProfile?.data) && (
                    <>
                      <Button variant='outline' color='red' onClick={openDeleteModal}>
                        Delete
                      </Button>
                      <Button variant='outline' onClick={openUpdateModal}>
                        Edit
                      </Button>
                    </>
                  )}
                  <Button variant='outline' color='blue' onClick={goBack}>
                    Go Back
                  </Button>
                </Group>
              </Group>
              <Group align='start'>
                <div>
                  <Text color='dimmed'>Name:</Text>
                  <Title order={4} h='100%'>
                    {breederData.data.name}
                  </Title>
                  <Text color='dimmed'>Country:</Text>
                  <Title order={4} h='100%'>
                    {breederData.data.country}
                  </Title>
                  <Text color='dimmed'>State:</Text>
                  <Title order={4} h='100%'>
                    {breederData.data.state}
                  </Title>
                  <Text color='dimmed'>Website:</Text>
                  <Title order={4} h='100%'>
                    {breederData.data.website}
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
      {isAdmin(userProfile?.data) && breederData?.data && (
        <>
          <BreederUpdateModal
            breeder={breederData.data}
            opened={isUpdateModalOpen}
            onClose={closeUpdateModal}
          />
          <BreederDeleteModal
            breeder={breederData.data}
            opened={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
        </>
      )}
    </>
  );
};
export default BreederDetail;
