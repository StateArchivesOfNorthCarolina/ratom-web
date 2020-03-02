export const keywordFilterBuilderAND = keywords => {
  const keywordsJoined = keywords.join('+');
  return `search_simple_query_string=${keywordsJoined}`;
};

export const emailFilterBuilderOR = emails => {
  // Need to lower case inputs for elasticsearch purposes (email analyzer is lowercasing, wildcard expects case sensitive match)
  const lowerEmails = emails.map(email => email.toLowerCase());
  const emailsJoined = lowerEmails.join(',');
  // ? should we highlight emails addresses? It can get a bit confusing.
  return `email__contains=${emailsJoined}`; // &highlight=msg_to&highlight=msg_from`;
};

export const dateRangeFilterBuilderAND = dateRange => {
  const [fromDate, toDate] = dateRange;
  return `sent_date__range=${fromDate}__${toDate}`;
};

export const labelFilterBuilderOR = labels => {
  const labelsJoined = labels.map(label => label.name).join('__');
  return `labels_importer__terms=${labelsJoined}`;
};
