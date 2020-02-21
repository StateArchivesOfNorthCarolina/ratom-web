export const keywordFilterBuilderAND = keywords => {
  const keywordsJoined = keywords.join('+');
  return `search_simple_query_string=${keywordsJoined}`;
};

export const emailFilterBuilderOR = emails => {
  const emailsJoined = emails.join('%20');
  // ? should we highlight emails addresses? It can get a bit confusing.
  return `search=${emailsJoined}`; //&highlight=msg_to&highlight=msg_from`;
};
