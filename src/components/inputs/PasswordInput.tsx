import React from 'react';

import {
  createStyles,
  PasswordInput as MantinePasswordInput,
  PasswordInputProps,
} from '@mantine/core';

export const useStyles = createStyles(theme => ({
  input: {
    '& .mantine-PasswordInput-input': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white',
      '&:focus': {
        border: `2px solid ${theme.colors.tengriGreen} !important`,
      },
    },
  },
}));

const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <MantinePasswordInput
      className={classes.input}
      icon={props.icon || null}
      size={props.size || 'md'}
      radius={props.radius || 'lg'}
      {...props}
    />
  );
};

export default PasswordInput;
