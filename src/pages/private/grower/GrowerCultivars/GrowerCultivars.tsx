import { Container, Divider, Flex, Grid, Stack, Tabs, Text, Title } from '@mantine/core';
import SimpleGrid from '@mantine/core';
import ClubCardList from './components/ClubCardList';
import useGetClubs from 'hooks/clubs/useGetClubs';
import { TabsPanel } from '@mantine/core/lib/Tabs/TabsPanel/TabsPanel';


const GrowerCultivars = () => {
  const { data : listOfClubs } = useGetClubs();

  return (  
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            My Clubs and Organizations
          </Title>
        </Flex>
      
        <Divider/>
       
        {listOfClubs && (
          <ClubCardList
            clubArray={listOfClubs}
          />
          )}
      </Stack>
      
    </Container>
  );
};
export default GrowerCultivars;
