import { Container, Divider, Flex, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import CultivarsList from "./components/CultivarsList";


const Cultivars = () => {
  const filtersForm = useForm({
    initialValues: {
      searchValue: '',
      breederId: '',
    },
  });

  return (
    // TODO - refactor to a separate layout
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            Cultivars & Genetics
          </Title>
          <Text color='neutral.3'>Explore genetics and cultivars</Text>
        </Flex>

        <Divider />

        <CultivarsList form={filtersForm} />
      </Stack>
    </Container>
  );
};

export default Cultivars;
