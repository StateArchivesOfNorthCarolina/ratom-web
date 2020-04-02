import {
  ALL,
  OPEN,
  RESTRICTED,
  NEEDS_REDACTION,
  NON_RECORD
} from '../components/Containers/Messages/FilterPanel/RecordStatusFilter/RecordStatusFilter';

export const keywordFilterBuilderAND = keywords => {
  const keywordsJoined = keywords.join('+');
  return `search_simple_query_string=${keywordsJoined}`;
};

export const keywordFilterBuilderOR = keywords => {
  const keywordsJoined = keywords.join(',');
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

export const processedStatusBuilder = processedStatus => {
  let status = false;
  if (processedStatus === ALL) return '';
  if (processedStatus === 'Processed') status = true;
  return `processed=${status}`;
};

export const recordStatusBuilder = recordStatus => {
  switch (recordStatus) {
    case ALL:
      return '';
    case OPEN:
      return 'processed=true&is_record=true&needs_redaction=false&is_restricted=false';
    case RESTRICTED:
      return 'is_restricted=true';
    case NEEDS_REDACTION:
      return 'needs_redaction=true';
    case NON_RECORD:
      return 'is_record=false';
    default:
      return '';
  }
};

export const folderFilterBuilderOR = folders => {
  return `directory__terms=${folders.join('__')}`;
};
