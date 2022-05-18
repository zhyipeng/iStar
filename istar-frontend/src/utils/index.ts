export function getQueryParam(name: string): string {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  let result: string = '';
  vars.forEach((item) => {
    const pair = item.split('=');
    const [k, v] = pair;
    if (k === name) {
      result = v;
    }
  });
  return result;
}
