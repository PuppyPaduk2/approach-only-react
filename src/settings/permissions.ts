export type Permission = {
  old: boolean;
};

export type PermissionKey =
  | "roles.read"
  | "roles.write";

export const permissions: Record<PermissionKey, Permission> = {
  "roles.read": { old: false },
  "roles.write": { old: false },
};
