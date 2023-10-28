import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Flex,
  Group,
  NumberInput,
  NumberInputHandlers,
  Paper,
  Radio,
  rem,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';
import { useParams } from 'react-router-dom';
import useAddSeedsToVault from 'hooks/seed-vault/useAddSeedsToVault';

const CultivarGetSeedsSection = (): ReactElement => {
  const [hasAvailableSeeds, setHasAvailableSeeds] = useState<boolean>(true);
  const { cultivarId } = useParams();
  const threeSeedPackPrice = 24.99;
  const fiveSeedPackPrice = 40.99;
  const tenSeedPackPrice = 74.99;
  const [pack, setPack] = useState('3-pack');
  const [seedsInPack, setSeedsInPack] = useState(3);
  const [packQuantity, setPackQuantity] = useState<number>(1);
  const quantityHandlers = useRef<NumberInputHandlers>();

  const addSeedsToVault = useAddSeedsToVault();

  const [seeds, setSeeds] = useState(1);

  const [totalPrice, setTotalPrice] = useState('');
  useEffect(() => {
    if (pack === '3-pack') {
      setSeedsInPack(3);
      setTotalPrice(`${(packQuantity * threeSeedPackPrice).toFixed(2)}$`);
    } else if (pack === '5-pack') {
      setSeedsInPack(5);
      setTotalPrice(`${(packQuantity * fiveSeedPackPrice).toFixed(2)}$`);
    } else if (pack === '10-pack') {
      setSeedsInPack(10);
      setTotalPrice(`${(packQuantity * tenSeedPackPrice).toFixed(2)}$`);
    }
  }, [pack, packQuantity]);

  const handleRadioChange = (_pack: string): void => {
    setPack(_pack);
    setPackQuantity(1);
  };

  const handleGetSeeds = (): void => {
    if (!cultivarId) {
      return;
    }

    const seedsToAdd = {
      cultivarId: +cultivarId,
      amount: seeds,
    };

    if (!hasAvailableSeeds) {
      seedsToAdd.amount = seedsInPack * packQuantity;
    }

    addSeedsToVault.mutate(seedsToAdd, {
      onSuccess: () => {
        showSuccessNotification('Seeds added successfully!');
      },
      onError: error => {
        showErrorNotification('Failed to add seeds', error.message);
      },
    });
  };

  return (
    <Paper withBorder radius='md' p='xs'>
      <Flex mt={12} gap={12}>
        <Text>Buy Seed Packs</Text>
        <Switch
          size='md'
          onChange={event => setHasAvailableSeeds(!event.currentTarget.checked)}
          checked={!hasAvailableSeeds}
        />
      </Flex>

      {!hasAvailableSeeds && (
        <Flex direction='row'>
          <div style={{ width: '56%' }}>
            <Radio.Group value={pack} onChange={handleRadioChange} name='buySeeds'>
              <Stack p='xs'>
                <Group position='apart'>
                  <Radio value='3-pack' label='3-seed pack' />
                  <Title order={5}>24.99$</Title>
                </Group>
                <Group position='apart'>
                  <Radio value='5-pack' label='5-seed pack' />
                  <Title order={5}>40.99$</Title>
                </Group>
                <Group position='apart'>
                  <Radio value='10-pack' label='10-seed pack' />
                  <Title order={5}>74.99$</Title>
                </Group>
              </Stack>
            </Radio.Group>
          </div>
          <Center w='44%'>
            <Group spacing='xl' noWrap>
              <Stack spacing={0}>
                <Title order={3}>Total:</Title>
              </Stack>
              <Title order={2}>{totalPrice}</Title>
            </Group>
          </Center>
        </Flex>
      )}

      <Flex direction='row'>
        <div style={{ width: '56%' }}>
          <Group p='md'>
            <Title order={3}>Quantity</Title>
            <Group spacing={5}>
              <ActionIcon
                size={26}
                variant='default'
                onClick={() => quantityHandlers.current?.decrement()}
              >
                -
              </ActionIcon>
              <NumberInput
                hideControls
                value={packQuantity}
                onChange={val => setSeeds(val || 1)}
                handlersRef={quantityHandlers}
                max={10}
                min={1}
                styles={{ input: { width: rem(50), textAlign: 'center' } }}
              />
              <ActionIcon
                size={26}
                variant='default'
                onClick={() => quantityHandlers.current?.increment()}
              >
                +
              </ActionIcon>
            </Group>
          </Group>
        </div>
      </Flex>

      <Center>
        <Button style={{ width: '300px' }} variant='filled' onClick={handleGetSeeds}>
          Get Seeds
        </Button>
      </Center>
    </Paper>
  );
};

export default CultivarGetSeedsSection;
