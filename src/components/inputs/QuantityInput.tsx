import { useRef } from 'react';

import {
  createStyles,
  NumberInput,
  NumberInputHandlers,
  ActionIcon,
  rem,
  Text,
  Stack,
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';

const useStyles = createStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${rem(6)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,

    '&:focus-within': {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  control: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]
    }`,

    '&:disabled': {
      borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: 'transparent',
    },
  },

  input: {
    textAlign: 'center',
    paddingRight: `${theme.spacing.sm} !important`,
    paddingLeft: `${theme.spacing.sm} !important`,
    height: rem(28),
    flex: 1,
  },
}));

interface QuantityInputProps {
  min?: number;
  max?: number;
  label?: string | null;
  readOnly?: boolean;
  formProps?: any;
}

const QuantityInput = ({
  min = 1,
  max = 10,
  label = null,
  readOnly,
  formProps,
}: QuantityInputProps): JSX.Element => {
  const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);

  return (
    <Stack spacing='xs'>
      {label ? <Text size='sm'>{label}</Text> : null}
      <div className={classes.wrapper}>
        <ActionIcon<'button'>
          size={28}
          variant='transparent'
          onClick={() => handlers.current?.decrement()}
          disabled={readOnly || formProps.value === min}
          className={classes.control}
          onMouseDown={event => event.preventDefault()}
        >
          <IconMinus size='1rem' stroke={1.5} />
        </ActionIcon>

        <NumberInput
          variant='unstyled'
          min={min}
          max={max}
          handlersRef={handlers}
          classNames={{ input: classes.input }}
          value={formProps.value}
          onChange={formProps.onChange}
          readOnly={readOnly}
        />

        <ActionIcon<'button'>
          size={28}
          variant='transparent'
          onClick={() => handlers.current?.increment()}
          disabled={readOnly || formProps.value === max}
          className={classes.control}
          onMouseDown={event => event.preventDefault()}
        >
          <IconPlus size='1rem' stroke={1.5} />
        </ActionIcon>
      </div>
    </Stack>
  );
};

export default QuantityInput;
