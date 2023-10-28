import React from 'react';

import { Select, SelectProps } from '@mantine/core';
import { GrowCycleRow } from 'types/generated';

const GrowCycleStatusSelect = ({ ...selectProps }: Omit<SelectProps, 'data'>): JSX.Element => {
  const options: Array<GrowCycleRow['status']> = ['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELED'];

  return <Select data={options} {...selectProps} />;
};

export default GrowCycleStatusSelect;
