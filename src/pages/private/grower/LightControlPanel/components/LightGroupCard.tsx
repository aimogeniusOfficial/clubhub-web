import React from 'react';

import { Badge, Flex, Paper, Text, ThemeIcon, Tooltip, useMantineTheme } from '@mantine/core';
import { IconTexture } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

// TODO add generated entity interface
const LightGroupCard = (): JSX.Element => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleCardClick = (): void => navigate('/light-control-panel/demoId');

  return (
    <Paper
      px='xl'
      radius='lg'
      bg='neutral.6'
      sx={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <Flex pt='md' pb='xl' justify='space-between'>
        <ThemeIcon variant='light' size='xl' radius='md' color={theme.colors.primary[5]}>
          <IconTexture />
        </ThemeIcon>

        <Flex gap='xs'>
          <Flex direction='column' justify='right' gap='xs'>
            <Badge color='yellow' sx={{ width: 'fit-content' }}>
              4 lights
            </Badge>

            <Tooltip label='Power' maw={200} multiline>
              <Badge color='indigo' size='md'>
                550W
              </Badge>
            </Tooltip>
          </Flex>
          <Flex direction='column' justify='right' gap='xs'>
            <Badge color='primary' variant='dot'>
              ON
            </Badge>
            <Tooltip label='Brightness' maw={200} multiline>
              <Badge color='primary'>15%</Badge>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction='column' py='md'>
        <Flex justify='space-between' align='center' wrap='nowrap'>
          <Text size='md' weight={600} ff='Inter, sans-serif' color='neutral.0' lineClamp={1}>
            Light Group #1
          </Text>
        </Flex>
        <Text size='xs' ff='Inter, sans-serif' color='neutral.3' lineClamp={1}>
          My home lights group
        </Text>
      </Flex>
    </Paper>
  );
};

export default LightGroupCard;
