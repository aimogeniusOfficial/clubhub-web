import {
  Group,
  Paper,
  Stack,
  Title,
  Text,
  Image,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { ClubRow } from 'types/generated';

interface ClubCardProps {
  club: ClubRow;
  onClick: (club: ClubRow) => void;
}

const ClubCard = ({ club, onClick }: ClubCardProps): JSX.Element => {
  const theme = useMantineTheme();
  return (
    <div style={{ width: '290px', padding: '6px' }}>
      <UnstyledButton w='100%' onClick={() => onClick(club)}>
        <Paper
          shadow='sm'
          radius='md'
          p='lg'
          sx={{
            '&:hover': {
              backgroundColor: theme.fn.rgba(theme.colors.neutral[0], 0.01),
            },
          }}
        >
          <Group position='apart' noWrap>
            <Stack spacing='5px'>
              <Title order={4}>{club.name}</Title>
              <Text fz='sm'>{club.categoryId?.name}</Text>
            </Stack>
            <Image
              width='60px'
              height='60px'
              radius='50%'
              src={club.logo_url || 'https://cdn.logo.com/hotlink-ok/logo-social.png'}
            />
          </Group>
        </Paper>
      </UnstyledButton>
    </div>
  );
};

export default ClubCard;
