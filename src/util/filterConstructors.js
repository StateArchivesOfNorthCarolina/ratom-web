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
