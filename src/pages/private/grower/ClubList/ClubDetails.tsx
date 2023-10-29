import { Stack, Group, Title, Text, useMantineTheme, ActionIcon, Image, Grid } from '@mantine/core';
import { IconBrandInstagram, IconBrandTiktok, IconUsers } from '@tabler/icons-react';
import { ClubRow } from 'types/generated';

const ClubDetails = ({ club }: { club: ClubRow }): JSX.Element => {
  const theme = useMantineTheme();
  return (
    <Stack p='md' justify='flex-start' align='flex-start'>
      <Grid>
        <Grid.Col span={11}>
          <Stack>
            <Title order={2}>{club.name}</Title>
            <Text>{club.categoryId?.name}</Text>
            <Group>
              <IconUsers />
              <Text>
                Members:{' '}
                <Text span c={theme.colors.accent[0]} inherit>
                  {club.members}
                </Text>
              </Text>
            </Group>
            <Group>
              <ActionIcon
                size='lg'
                radius='xl'
                variant='subtle'
                sx={{ '&:hover': { backgroundColor: theme.colors.neutral[4] } }}
              >
                <IconBrandInstagram />
              </ActionIcon>
              <ActionIcon
                size='lg'
                radius='xl'
                variant='subtle'
                sx={{ '&:hover': { backgroundColor: theme.colors.neutral[4] } }}
              >
                <IconBrandTiktok />
              </ActionIcon>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          <Image width='150' height='150' radius='50%' src={club.logo_url} />
        </Grid.Col>
      </Grid>
      <Text lineClamp={4}>{club.description}</Text>
    </Stack>
  );
};

export default ClubDetails;
