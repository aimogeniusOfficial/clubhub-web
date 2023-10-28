import React from 'react';

import {
  Paper,
  Image,
  Group,
  Title,
  Text,
  Button,
  Stack,
  Flex,
  Divider,
  Badge,
  Menu,
  SimpleGrid,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretDown, IconDiscountCheckFilled } from '@tabler/icons-react';
import LoadingOverlay from 'components/states/LoadingOverlay';
import useProfile from 'hooks/auth/useProfile';
import useCultivar from 'hooks/cultivars/useCultivar';
import { useParams } from 'react-router-dom';
import { isAdmin } from 'utils/roleAccessHelper';

import CultivarGetSeedsSection from './components/CultivarGetSeedsSection';
import CultivarDeleteModal from './components/modals/CultivarDeleteModal';
import CultivarWriteModal from '../Cultivars/components/CultivarsWriteModal';

const CultivarDetail = (): JSX.Element => {
  const { cultivarId } = useParams();
  const { data: userProfile } = useProfile();

  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [isWriteModalOpen, { open: openWriteModal, close: closeWriteModal }] = useDisclosure(false);

  const { data: cultivarData, isLoading: cultivarIsLoading } = useCultivar(cultivarId || '');

  return (
    <>
      <Stack>
        <LoadingOverlay visible={cultivarIsLoading} />
        <Anchor href='/cultivars'>
          <Title order={5}>Back</Title>
        </Anchor>
        {cultivarData?.data && (
          <>
            <Group position='apart' mb='xs'>
              <div>
                <Group>
                  <Title order={1}>{cultivarData.data.name}</Title>
                  <Badge color='orange'>Hybrid</Badge>
                  <Badge>THC 27%</Badge>
                  {cultivarData.data.isVerified && <IconDiscountCheckFilled color='red' />}
                </Group>
                <Anchor href={`/breeders/${cultivarData.data.breederId}`}>
                  <Title order={5}>{cultivarData?.data?.Breeder?.name}</Title>
                </Anchor>
              </div>
              <Group>
                {isAdmin(userProfile?.data) && (
                  <Group>
                    <Menu shadow='md' width={200}>
                      <Menu.Target>
                        <Button leftIcon={<IconCaretDown />} variant='outline'>
                          Actions
                        </Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item color='green' onClick={openWriteModal}>
                          Edit
                        </Menu.Item>
                        <Menu.Item color='red' onClick={openDeleteModal}>
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                )}
              </Group>
            </Group>
            <Group align='start'>
              <div>
                <Text color='dimmed'>Description:</Text>
                <Title order={4} h='100%'>
                  {cultivarData.data.description}
                </Title>
              </div>
            </Group>
            <Divider />
          </>
        )}

        <SimpleGrid
          breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { minWidth: 'sm', cols: 2 },
          ]}
        >
          {cultivarData?.data && (
            <>
              <Group align='center'>
                <Image
                  src={cultivarData.data.imageUrl}
                  alt={cultivarData.data.name}
                  style={{
                    width: '100%',
                  }}
                  height={250}
                  radius='md'
                  withPlaceholder
                />
              </Group>

              <Paper withBorder radius='md' p='xs'>
                <Flex direction='row' justify='space-between' align='flex-start'>
                  <Group style={{ width: '45%' }}>
                    <div style={{ marginBottom: '2%' }}>
                      <Title order={5}>Flower Time</Title>
                      <Text>70 - 90 days 18 weeks</Text>
                    </div>
                    <div style={{ marginBottom: '2%' }}>
                      <Title order={5}>Cannabioid Profile</Title>
                      <Badge color='orange'>Mycene</Badge>
                      <Badge>Pinene</Badge>
                    </div>
                    <div style={{ marginBottom: '2%' }}>
                      <Title order={5}>Terpene Profile</Title>
                      <Badge color='orange'>Mycene</Badge>
                      <Badge>Pinene</Badge>
                    </div>
                    <div style={{ marginBottom: '2%' }}>
                      <Title order={5}>Smell</Title>
                      <Badge color='orange'>Mycene</Badge>
                      <Badge>Pinene</Badge>
                    </div>
                  </Group>
                  <Group style={{ width: '45%', marginTop: '0' }}>
                    <div style={{ marginBottom: '2%' }}>
                      <Title order={5}>Taste</Title>
                      <Badge color='orange'>Mycene</Badge>
                      <Badge>Pinene</Badge>
                    </div>
                    <div style={{ marginBottom: '2%' }}>
                      <Title order={5}>Effects</Title>
                      <Badge color='orange'>Mycene</Badge>
                      <Badge>Pinene</Badge>
                    </div>
                  </Group>
                </Flex>
              </Paper>
            </>
          )}
        </SimpleGrid>

        <Paper withBorder radius='md' p='xs'>
          {cultivarData?.data && (
            <>
              <div style={{ margin: '2% 0' }}>
                <Title order={4}>Notable Lineage</Title>
              </div>
              <div style={{ margin: '2% 0' }}>
                <Title order={4}>Landrace + Haze + Truffle Butter</Title>
              </div>
            </>
          )}
        </Paper>

        <CultivarGetSeedsSection />
      </Stack>

      {cultivarData?.data && (
        <>
          <CultivarDeleteModal
            cultivar={cultivarData.data}
            opened={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
          <CultivarWriteModal
            cultivarId={cultivarId}
            onClose={closeWriteModal}
            opened={isWriteModalOpen}
            isCreation={false}
          />
        </>
      )}
    </>
  );
};
export default CultivarDetail;
