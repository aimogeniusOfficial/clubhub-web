import dayjs from 'dayjs';
import { calculateDuration } from '../../../../../utils/functions';

export const useStartDateChange = (form: any) => {
  return (newStartDate: any) => {
    form.setFieldValue('startDate', newStartDate);

    if (
      newStartDate > form.values.endDate.specificDate ||
      newStartDate === form.values.endDate.specificDate
    ) {
      form.setFieldValue('endDate', {
        ...form.values.endDate,
        specificDate: newStartDate,
        durationDays: 0,
        durationWeeks: 0,
      });
    } else {
      const { weeks, days } = calculateDuration(newStartDate, form.values.endDate.specificDate);
      const endDate = dayjs(form.values.startDate)
        .add(form.values.endDate.durationDays, 'days')
        .add(form.values.endDate.durationWeeks, 'weeks')
        .toDate();

      form.setFieldValue('endDate', {
        ...form.values.endDate,
        specificDate: endDate,
        durationDays: days,
        durationWeeks: weeks,
      });
    }
  };
};

export const useSpecificEndDateChange = (form: any) => {
  return (newEndDate: any) => {
    const { weeks, days } = calculateDuration(form.values.startDate, newEndDate);
    form.setFieldValue('endDate', {
      ...form.values.endDate,
      specificDate: newEndDate,
      durationDays: days,
      durationWeeks: weeks,
    });
  };
};

export const useHandleEndDateDurationChange = (form: any) => {
  return (value: string, unit: string) => {
    const endDate = dayjs(form.values.startDate)
      .add(unit === 'days' ? value : form.values.endDate.durationDays, 'days')
      .add(unit === 'weeks' ? value : form.values.endDate.durationWeeks, 'weeks')
      .toDate();

    form.setFieldValue('endDate', {
      ...form.values.endDate,
      specificDate: endDate,
      durationDays: unit === 'days' ? value : form.values.endDate.durationDays,
      durationWeeks: unit === 'weeks' ? value : form.values.endDate.durationWeeks,
    });
  };
};
