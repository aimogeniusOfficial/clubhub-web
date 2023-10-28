import React from 'react';

import { Select, SelectProps } from '@mantine/core';
import { LandraceEnum } from 'types/generated';

const CultivarLandraceSelect = ({ ...selectProps }: Omit<SelectProps, 'data'>): JSX.Element => {
  const options: Array<LandraceEnum> = ['Afghan', 'Thai', 'Columbian', 'Mexican', 'Jamaican'];

  return <Select data={options} {...selectProps} />;
};

export default CultivarLandraceSelect;
