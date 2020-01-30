import { format } from 'date-fns';

const dateToIso = date => format(new Date(date), 'yyyy-MM-dd');

export default dateToIso;
