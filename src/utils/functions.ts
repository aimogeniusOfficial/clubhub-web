import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { UrlParams } from 'types';

dayjs.extend(duration);

export const isEmpty = (text: any): boolean =>
  text === null ||
  text === undefined ||
  (typeof text === 'string' &&
    (text === '' || text.replace(/<br ?\/?>/gi, '').replace(/<\/?p>/gi, '') === '')) ||
  (Array.isArray(text) && text.length === 0);

export const getPagination = (page: number, size: number): { from: number; to: number } => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export function urlParamsFromUrl(url: string): UrlParams {
  const urlObj = new URL(url);
  const entries = new URLSearchParams(urlObj.search).entries();
  const result: UrlParams = {};
  let hasNext = true;
  while (hasNext) {
    const { value, done } = entries.next();
    if (!done) {
      const [k, v] = value;
      result[k] = v;
    }
    hasNext = !done;
  }
  return result;
}

export const encodeUrlParams = (query: UrlParams): string =>
  Object.entries(query)
    .map(kv => kv.map(encodeURIComponent).join('='))
    .join('&');

export const generateInviteCode = (length: number = 8): string => {
  const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code: string = '';
  // eslint-disable-next-line no-plusplus
  for (let i: number = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const getFormattedSelectData = <T extends { name?: string | null; id?: number | null }>(
  data: T[] | null | undefined,
): { label: string; value: string }[] => {
  return Array.isArray(data)
    ? data.map(item => ({
        label: item.name || '',
        value: item.id?.toString() || '',
      }))
    : [];
};

export const snakeToCamel = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
};

export const getFormattedDateDifference = (createdAt: string): string => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const differenceInMs = currentDate.getTime() - createdDate.getTime();

  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  const differenceInMonths = Math.floor(differenceInDays / 30);
  const differenceInYears = Math.floor(differenceInMonths / 12);
  const differenceInWeeks = Math.floor(differenceInDays / 7);

  if (differenceInYears > 0) return `${differenceInYears} years`;
  if (differenceInMonths > 0) return `${differenceInMonths} months`;
  if (differenceInWeeks > 0) return `${differenceInWeeks} weeks`;
  if (differenceInDays > 0) return `${differenceInDays} days`;

  return 'today';
};

export const getFormattedTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const calculateDuration = (
  startDate: Date,
  endDate: Date,
): { days: number; weeks: number } => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const durationObj = dayjs.duration(end.diff(start));

  const weeks = durationObj.weeks();
  const days = durationObj.days();

  const remainingDays = days - weeks * 7;

  return { weeks, days: remainingDays >= 0 ? remainingDays : days };
};
