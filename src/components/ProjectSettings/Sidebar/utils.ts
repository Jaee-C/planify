export enum SettingPages {
  Details = "Details",
  Users = "Users",
}

export const pagePaths: Record<SettingPages, string> = {
  Details: "/details",
  Users: "/users",
};

export function getSettingsPath(path: string): string {
  return path.substring(0, path.lastIndexOf("/"));
}
