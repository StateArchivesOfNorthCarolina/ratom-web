export function formatNumber(x) {
  if (typeof x !== 'number') return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
