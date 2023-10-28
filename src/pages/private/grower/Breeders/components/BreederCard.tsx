import React from 'react';

import {
  createStyles,
  Card,
  Text,
  Group,
  Divider,
  ActionIcon,
  MediaQuery,
  Stack,
  Skeleton,
  Button,
  useMantineTheme,
  Anchor,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BreederRow } from 'types/generated';

interface BreederCardProps {
  breeder: BreederRow;
}

const BreederCard = ({ breeder }: BreederCardProps): JSX.Element => {
  const { id, name, country, state, website } = breeder;
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const footerData: { label: string; value: string }[] = [
    { label: 'Name', value: name },
    { label: 'Country', value: country! },
    { label: 'State', value: state! },
    { label: 'Website', value: website! },
  ];
  return (
    <Card
      withBorder
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      }}
    >
      <Card.Section>
        <Group align='start'>
          <Skeleton
            maw={240}
            height={200}
            radius={0}
            animate={false}
            sx={() => ({
              '@media (max-width: 40em)': {
                maxWidth: '100%',
              },
            })}
          />
          <Stack spacing='xs' p='sm'>
            {footerData.map(({ label, value }) => (
              <Group key={label} position='left'>
                <Text>
                  {label} -{' '}
                  {label === 'Website' ? (
                    <Anchor href={value} target='_blank'>
                      {value}
                    </Anchor>
                  ) : (
                    <Text span weight={600}>
                      {value}
                    </Text>
                  )}
                </Text>
              </Group>
            ))}
          </Stack>
          <Group sx={{ marginLeft: 'auto' }} p='sm' onClick={() => navigate(`/breeders/${id}`)}>
            <Button variant='outline'>Details</Button>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default BreederCard;
