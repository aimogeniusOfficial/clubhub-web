import React, { useMemo } from 'react';

import { Badge, BadgeProps } from '@mantine/core';
import { GrowCycleRow } from 'types/generated';

interface IGrowCycleStatusBadgeProps extends Omit<BadgeProps, 'color'> {
  value: GrowCycleRow['currentGrowStage'];
}
const GrowCycleStageBadge = ({ value, ...badgeProps }: IGrowCycleStatusBadgeProps): JSX.Element => {
  const colorByValue = useMemo((): BadgeProps['color'] => {
    if (value === 'VEGETATIVE') {
      return 'green';
    }
    // @ts-ignore
    if (['SEED', 'SEEDLING', 'CLONE'].includes(value)) {
      return 'orange';
    }
    if (value === 'FLOWER') {
      return 'violet';
    }
    if (value === 'HARVEST') {
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

export default GrowCycleStageBadge;
