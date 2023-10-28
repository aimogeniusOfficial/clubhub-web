import React from 'react';

import { Accordion, Text, Button, createStyles, Group } from '@mantine/core';

const useStyles = createStyles(theme => ({
  pill: {
    border: '0 !important',
    outline: '0 !important',
    background: 'none !important',
  },
  pillButton: {
    width: 150,
    padding: '0 12px',
    color: theme.colors.primary[6],
    fontSize: theme.fontSizes.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',

    '& *': {
      margin: '0 !important',
    },
    '&:hover': {
      color: theme.colors.primary[5],
    },
  },
  chatBox: {
    position: 'relative',
    marginTop: 20,
  },
}));

const PromptContainer = ({
  prompts,
  setChatboxValue,
}: {
  prompts: Array<string>;
  setChatboxValue: (value: string) => void;
}): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Accordion pos='absolute' bottom={120} className={classes.pill}>
      <Accordion.Item value='prompts'>
        {/*<Accordion.Control className={classes.pillButton}>Show prompts</Accordion.Control>*/}
        <Accordion.Panel>
          <Group spacing='xs' maw={600}>
            {prompts.map(text => {
              return (
                <Button
                  key={text}
                  variant='outline'
                  size='xs'
                  radius='xl'
                  color='teal'
                  sx={theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white',
                  })}
                  onClick={() => setChatboxValue(text)}
                >
                  <Text color='dimmed'>{text}</Text>
                </Button>
              );
            })}
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default PromptContainer;
