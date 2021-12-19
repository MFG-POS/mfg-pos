export enum UserRole {
  ADMIN = 'Administrator',
  WAITER = 'Kelner',
  UNCLASSIFIED = 'Niesklasyfikowany',
}

export type UserRoleKey = keyof typeof UserRole;
