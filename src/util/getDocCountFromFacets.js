import { objectIsEmpty } from './objectIsEmpty';

export const getDocCountFromFacets = facets => {
  if (facets && !objectIsEmpty(facets)) {
    const arbKey = Object.keys(facets)[0];
    return facets[arbKey].doc_count;
  }
};
