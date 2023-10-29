import React from 'react';

import { Group, Stack, Title } from '@mantine/core';
import MonthlyCalendar from 'MonthlyCalendar';

const Calendar = (): JSX.Element => {
  return (
    <>
      <Stack spacing='lg'>
        <Group position='apart'>
          <Title align='center' order={1} weight={700} color='neutral.0'>
            Events Management Calendar
          </Title>
        </Group>
        <div>
          <MonthlyCalendar />
        </div>
      </Stack>
    </>
  );
};

export default Calendar;
