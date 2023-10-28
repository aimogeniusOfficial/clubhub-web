import { ReactElement } from 'react';
import { formatDateRange } from '../+util/format-subscription-date-range';

interface ISubscriptionBillingDateRangeDisplayProps {
  startDateString: string | undefined;
  endDateString: string | undefined;
}

const SubscriptionBillingDateRangeDisplay = ({
  startDateString,
  endDateString,
}: ISubscriptionBillingDateRangeDisplayProps): ReactElement => {
  if (!startDateString || !endDateString) {
    return <div>Invalid date range</div>;
  }
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return <span>({formatDateRange(startDate, endDate)})</span>;
};

export default SubscriptionBillingDateRangeDisplay;
