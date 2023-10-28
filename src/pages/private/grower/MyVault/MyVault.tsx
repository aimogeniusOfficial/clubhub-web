import React from 'react';
import { Container, Divider, Flex, Stack, Title } from '@mantine/core';
import { Text } from '@mantine/core';
import SeedList from './components/SeedList';
import { useForm } from '@mantine/form';

const MyVault = (): JSX.Element => {
  const filtersForm = useForm({
    initialValues: {
      searchValue: '',
    },
  });
  
  return (
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            My Vault
          </Title>
          <Text color='neutral.3'>My plants and seeds</Text>
        </Flex>
        <Divider />
        <SeedList form={filtersForm} />
      </Stack>
    </Container>
  );
};
export default MyVault;
