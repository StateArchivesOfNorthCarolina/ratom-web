import { format } from 'date-fns';

const dateToIso = date => {
  // Safari sucks at dates, evidently. If date doesn't contain literal T between date and time (ISO8601), add it...
  const safeDate = date.replace(' ', 'T');
  return format(new Date(safeDate), 'yyyy-MM-dd');
};

export default dateToIso;
