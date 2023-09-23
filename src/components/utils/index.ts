export function constructHrefWithOrg(orgKey: string, target: string): string {
  if (orgKey === "") {
    return "#";
  }
  return `/${orgKey}${target}`;
}
