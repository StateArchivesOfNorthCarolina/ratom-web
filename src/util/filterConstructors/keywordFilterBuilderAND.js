const keywordFilterBuilderAND = keywords => {
  const keywordsJoined = keywords.join('+');
  return `search_simple_query_string=${keywordsJoined}`;
};

export default keywordFilterBuilderAND;
