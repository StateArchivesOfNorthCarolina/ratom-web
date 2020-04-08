export default function getCommonString(strings) {
  if (strings.length <= 1) return '';
  const strs = strings.concat().sort();
  const strOne = strs[0];
  const strTwo = strs[strs.length - 1];
  const len = strOne.length;
  let i = 0;
  while (i < len && strOne.charAt(i) === strTwo.charAt(i)) i++;
  const fullSubstring = strOne.substring(0, i);
  return fullSubstring.substring(0, fullSubstring.lastIndexOf('/'));
}
