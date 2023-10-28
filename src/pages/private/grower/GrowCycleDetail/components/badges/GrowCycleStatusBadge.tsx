import React, { useMemo } from 'react';

import { Badge, BadgeProps } from '@mantine/core';
import { GrowCycleRow } from 'types/generated';

interface IGrowCycleStatusBadgeProps extends Omit<BadgeProps, 'color'> {
  value: GrowCycleRow['status'];
}
const GrowCycleStatusBadge = ({
  value,
  ...badgeProps
}: IGrowCycleStatusBadgeProps): JSX.Element => {
  const colorByValue = useMemo((): BadgeProps['color'] => {
    if (value === 'ACTIVE') {
      return 'green';
    }
    if (value === 'DRAFT') {
      return 'orange';
    }
    if (value === 'COMPLETED') {
      return 'violet';
    }
    if (value === 'CANCELED') {
      return 'red';
    }

    return 'gray';
  }, [value]);

  return (
    <Badge color={colorByValue} {...badgeProps}>
      {value}
    </Badge>
  );
};

export default GrowCycleStatusBadge;
