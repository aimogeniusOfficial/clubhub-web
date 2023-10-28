import { Container, Divider, Flex, Stack, Text, Title } from '@mantine/core';
import CultivarsList from '../Cultivars/components/CultivarsList';
import GrowerCultivarTable from './components/GrowerCultivarTable';
import GrowerCultivarTableConsole from './components/GrowerCultivarTableConsole';
import OtherCultivarTableConsole from './components/OtherCultivarTableConsole';
import OtherPlantCultivarTable from './components/OtherPlantCultivarTable';

const GrowerCultivars = () => {
  return (
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            My Cannabis Cultivars
          </Title>
        </Flex>

        <Divider />

        <GrowerCultivarTableConsole />
        <GrowerCultivarTable />

        <Title mt={24}>My Plants</Title>
        <Divider />

        <OtherCultivarTableConsole />
        <OtherPlantCultivarTable />
      </Stack>
    </Container>
  );
};
export default GrowerCultivars;
