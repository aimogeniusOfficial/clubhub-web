import { ReactElement } from 'react';

import { Alert, Anchor, Box, Flex, Loader, Select, SelectItem, Text, Space } from '@mantine/core';
import { IconAlertCircle, IconArrowNarrowRight } from '@tabler/icons-react';
import useUserGrowSpace from 'hooks/grow-space/useUserGrowSpace';

const GrowSpaceSelectField = ({ icon, disabled, size, ...selectProps }: any): ReactElement => {
  const { data: userGrowSpaces, isLoading, isFetching, isError } = useUserGrowSpace();
  const formattedData: SelectItem[] | string[] = userGrowSpaces
    ? userGrowSpaces.map(({ id, name }) => ({ value: id, label: name }))
    : [];

  return (
    <>
      <Select
        label='Grow Space'
        {...selectProps}
        data={formattedData}
        icon={isLoading || isFetching ? <Loader size={size} /> : icon}
        error={isError ? 'Something went wrong while fetching data!' : undefined}
        disabled={isLoading || isFetching || isError || disabled}
      />

      {userGrowSpaces?.length === 0 && (
        <Alert icon={<IconAlertCircle size='1rem' />} title='No Grow Space!' color='yellow'>
          <Box>Please create your grow space before creating grow cycle</Box>
          <Anchor href='/grow-space' color='yellow' underline>
            <Flex align='center'>
              <IconArrowNarrowRight size='1rem' />
              <Space w='xs' />
              <Text>Create Grow Space Here </Text>
            </Flex>
          </Anchor>
        </Alert>
      )}
    </>
  );
};

export default GrowSpaceSelectField;
