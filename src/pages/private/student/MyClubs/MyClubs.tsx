import { Container, Divider, Flex, Stack, Title } from '@mantine/core';
import useGetClubs from 'hooks/clubs/useGetClubs';

import ClubCardList from './components/ClubCardList';

const MyClubs = (): JSX.Element => {
  const { data: listOfClubs } = useGetClubs();

  return (
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            My Clubs and Organizations
          </Title>
        </Flex>

        <Divider />

        {listOfClubs && <ClubCardList clubArray={listOfClubs} />}
      </Stack>
    </Container>
  );
};
export default MyClubs;
