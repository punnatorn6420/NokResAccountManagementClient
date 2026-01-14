export enum IUserRole {
  Admin = 'Admin',
  Director = 'Director',
  Manager = 'Manager',
  Officer = 'Officer',
}

export interface IUserInfo {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  createdAt: string;
  modifiedAt: string;
  active: boolean;
  team: string;
  roles: IUserRole[];
}
