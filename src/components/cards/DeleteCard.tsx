import React from 'react';

import { createStyles, Paper, Stack, Title, Text, Button } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons-react';

const useStyles = createStyles(theme => ({
  card: {
    display: 'flex',
    backgroundColor: theme.fn.rgba(theme.colors.red[9], 0.2),
    padding: theme.spacing.md,
    border: '1px solid',
    borderColor: theme.fn.rgba(theme.colors.red[9], 0.5),
    borderRadius: theme.radius.md,
    '@media (max-width: 40em)': {
      maxWidth: '100%',
    },
  },
  icon: {
    marginTop: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
}));

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
}

interface DeleteCardProps {
  title: string;
  description: string;
  actionButton?: ActionButtonProps;
}
const DeleteCard = ({ title, description, actionButton }: DeleteCardProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <div className={classes.card}>
      <IconAlertOctagon size={22} className={classes.icon} color='red' />
      <div>
        <Text>{title}</Text>
        <Text color='red'>{description}</Text>
        <Button color='red' variant='light' mt='sm' onClick={actionButton?.onClick}>
          {actionButton?.text}
        </Button>
      </div>
    </div>
  );
};

export default DeleteCard;
