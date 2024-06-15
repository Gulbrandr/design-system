import dayjs from 'dayjs';
type formatCurrencyOptions = {
  digits: number;
};

export const formatCurrency = (
  number?: number | string | null,
  options?: formatCurrencyOptions
) => {
  if (!number) return '$0.00';
  if (isNaN(Number(number))) return '$0.00';
  if (options && options.digits) {
    return `$${nFormatter(Number(number), options.digits)}`;
  }
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number as number);
};
const isToday = (date: Date) => {
  const n = new Date();
  const d = new Date(date);
  return (
    d.getDate() == n.getDate() &&
    d.getMonth() == n.getMonth() &&
    d.getFullYear() == n.getFullYear()
  );
};

function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(regex, '$1') + item.symbol
    : '0';
}

type toDateStringProps = {
  date: Date;
  format?: string;
};

export const toDateString = ({ date, format }: toDateStringProps) =>
  dayjs(date).format(format || 'MM/DD/YYYY');

export const formatDate = (date: Date, format?: string) =>
  isToday(date) ? 'Today' : toDateString({ date, format });

export const capitalCase = (str = '') =>
  str
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

export const formatEIN = (ein?: string | null) => {
  if (!ein) return '';
  return `${ein.slice(0, 2)}-${ein.slice(2)}`;
};

export const threeMonthsAgo = () =>
  new Date(new Date().setMonth(new Date().getMonth() - 3));

export const nMonthsAgo = (n: number) =>
  new Date(new Date().setMonth(new Date().getMonth() - n));
export const nMonthsFromNow = (n: number) =>
  new Date(new Date().setMonth(new Date().getMonth() + n));
export const tomorrow = () =>
  new Date(new Date().setDate(new Date().getDate() + 1));
export const yesterday = () =>
  new Date(new Date().setDate(new Date().getDate() - 1));
