const keywordFilterBuilder = keywords => {
  const keywordsJoined = keywords.join('__');
  const bodyIn = `body__in=${keywordsJoined}`;
  const subjectIn = `subject__in=${keywordsJoined}`;
  return `${bodyIn}&${subjectIn}`;
};

export default keywordFilterBuilder;
