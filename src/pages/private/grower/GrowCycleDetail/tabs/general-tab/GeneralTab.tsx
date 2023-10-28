import React, { ReactElement } from 'react';

import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import GrowCycleExpectedTimelineCard from './components/GrowCycleExpectedTimelineCard';
import GrowCycleStageCard from './components/GrowCycleStageCard';
import GrowCycleSeedsAndPlantsCard from './components/SeedAndPlantsCard';
import useGrowCycle from '../../../GrowCycles/hooks/useGrowCycle';

const GeneralTab = ({ growCycleId }: any): ReactElement => {
  const { data: growCycle, isFetching } = useGrowCycle(growCycleId);

  return (
    <>
      {/* <Paper p='sm' radius='lg'> */}
      {/*  <Group className={classes.cardsList}> */}
      {/*    {data.map((item, index) => ( */}
      {/*      <React.Fragment key={item.label}> */}
      {/*        {index !== 0 && ( */}
      {/*          <Divider orientation={dividerOrientation} className={classes.divider} /> */}
      {/*        )} */}
      {/*        <div className={classes.card}> */}
      {/*          <Text className={classes.label}>{item.label}</Text> */}
      {/*          {item.value} */}
      {/*        </div> */}
      {/*      </React.Fragment> */}
      {/*    ))} */}
      {/*  </Group> */}
      {/* </Paper> */}
      {/* <Paper p='sm' radius='lg'> */}
      {/*  <Group className={classes.cardsList}> */}
      {/*    <div className={classes.card}> */}
      {/*      <Text className={classes.label}>Total Weeks</Text> */}
      {/*      <Text className={classes.value}>{weekDifferenceInfo.totalWeeks}</Text> */}
      {/*    </div> */}
      {/*    <Divider orientation={dividerOrientation} className={classes.divider} /> */}
      {/*    <div className={classes.card}> */}
      {/*      <Text className={classes.label}>Current Week</Text> */}
      {/*      <Text className={classes.value}>{weekDifferenceInfo.currentWeekInCycle}</Text> */}
      {/*    </div> */}
      {/*    <Divider orientation={dividerOrientation} className={classes.divider} /> */}
      {/*    <div className={classes.card}> */}
      {/*      <Text className={classes.label}>Progress</Text> */}
      {/*      <PeriodProgress size='lg' startDate={growCycle.startDate} endDate={growCycle.endDate} /> */}
      {/*    </div> */}
      {/*    <Divider orientation={dividerOrientation} className={classes.divider} /> */}
      {/*    <div className={classes.card}> */}
      {/*      <Text className={classes.label}>State</Text> */}
      {/*      <Text className={classes.value}>-</Text> */}
      {/*    </div> */}
      {/*  </Group> */}
      {/* </Paper> */}
      {/* TODO display allert only for draft cycle */}
      <Alert icon={<IconAlertCircle size='1rem' />} title='Grow Cycle Setup Phase' color='green'>
        Setup parameters for your grow cycle before you start. Once you satisfied with setup,
        activate your grow cycle by clicking Action and then Activate.
      </Alert>
      <GrowCycleExpectedTimelineCard growCycle={growCycle?.data} />
      <GrowCycleStageCard growCycle={growCycle?.data} />
      <GrowCycleSeedsAndPlantsCard growCycle={growCycle?.data} isFetching={isFetching} />
      {/* <Group grow align='start'> */}
      {/*  <DateInput */}
      {/*    label='Start Date' */}
      {/*    placeholder='Select start date' */}
      {/*    value={form.values.startDate} */}
      {/*    onChange={startDateChange} */}
      {/*  /> */}
      {/* </Group> */}
      {/* <Radio.Group */}
      {/*  label='Select End Date' */}
      {/*  {...form.getInputProps('endDate.type')} */}
      {/*  error={form.errors.endDate} */}
      {/* > */}
      {/*  <Stack mt='xs'> */}
      {/*    <Group grow noWrap align='flex-start'> */}
      {/*      <Radio value='specific' label='Specific Type' /> */}
      {/*      <DateInput */}
      {/*        label='Select specific end date' */}
      {/*        placeholder='Select end date' */}
      {/*        disabled={!isEndDateTypeSpecific} */}
      {/*        minDate={form.values.startDate} */}
      {/*        value={form.values.endDate.specificDate} */}
      {/*        onChange={value => specificEndDateChange(value as Date)} */}
      {/*      /> */}
      {/*    </Group> */}
      {/*    <Group grow noWrap align='flex-start'> */}
      {/*      <Radio value='duration' label='Duration' /> */}
      {/*      <Group spacing='xs' noWrap> */}
      {/*        <NumberInput */}
      {/*          label='Days' */}
      {/*          placeholder='Days' */}
      {/*          min={0} */}
      {/*          disabled={isEndDateTypeSpecific} */}
      {/*          value={form.values.endDate.durationDays} */}
      {/*          onChange={value => endDateDurationChange(value as number, 'days')} */}
      {/*        /> */}
      {/*        <NumberInput */}
      {/*          label='Weeks' */}
      {/*          placeholder='Weeks' */}
      {/*          min={0} */}
      {/*          disabled={isEndDateTypeSpecific} */}
      {/*          value={form.values.endDate.durationWeeks} */}
      {/*          onChange={value => endDateDurationChange(value as number, 'weeks')} */}
      {/*        /> */}
      {/*      </Group> */}
      {/*    </Group> */}
      {/*  </Stack> */}
      {/* </Radio.Group> */}
    </>
  );
};

export default GeneralTab;
