export function verifyUrlParam(
  param: string | string[] | undefined | null
): string {
  if (Array.isArray(param) || param === undefined || param === null) {
    return "";
  }
  return param;
}
