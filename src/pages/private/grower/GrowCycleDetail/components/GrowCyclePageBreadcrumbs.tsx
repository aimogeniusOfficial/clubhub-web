import { Anchor, Breadcrumbs } from '@mantine/core';
import React, { ReactElement } from 'react';

interface IGrowCyclePageBreadcrumbsProps {
  dataName?: string;
  growCycleId: string;
}
const GrowCyclePageBreadcrumbs = ({
  dataName = 'Default Name',
  growCycleId = '-1',
}: IGrowCyclePageBreadcrumbsProps): ReactElement => {
  const itemsData = [
    { title: 'Grow Cycles', href: '/grow-cycle' },
    { title: dataName, href: `/grow-cycle/${growCycleId}` },
  ];

  return (
    <>
      <Breadcrumbs>
        {itemsData.map(item => (
          <Anchor href={item.href} key={item.title} size='sm'>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
    </>
  );
};
export default GrowCyclePageBreadcrumbs;
