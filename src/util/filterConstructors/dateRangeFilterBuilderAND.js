const dateRangeFilterBuilderAND = dateRange => {
  const [fromDate, toDate] = dateRange;
  return `sent_date__range=${fromDate}__${toDate}`;
};

export default dateRangeFilterBuilderAND;
