import React from 'react';

import { Container, Flex, Stack, Tabs, Text, Title } from '@mantine/core';

const LightControlPanelDetail = (): JSX.Element => {
  return (
    <Container maw='936px'>
      <Stack spacing='lg'>
        <Flex direction='column'>
          <Title order={1} weight={700} color='neutral.0'>
            Light Group #1
          </Title>
          <Text color='neutral.3'>Datastreams, Events & Metadata</Text>
        </Flex>

        <Tabs defaultValue='home' keepMounted={false}>
          <Tabs.List>
            <Tabs.Tab value='home'>Home</Tabs.Tab>
            <Tabs.Tab value='devices'>Devices</Tabs.Tab>
            <Tabs.Tab value='datastreams'>Datastreams</Tabs.Tab>
            <Tabs.Tab value='events'>Events</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='home' pt='xs'>
            Home Content
          </Tabs.Panel>
          <Tabs.Panel value='devices' pt='xs'>
            Devices Content
          </Tabs.Panel>
          <Tabs.Panel value='datastreams' pt='xs'>
            Datastreams Content
          </Tabs.Panel>
          <Tabs.Panel value='events' pt='xs'>
            Events Content
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default LightControlPanelDetail;
