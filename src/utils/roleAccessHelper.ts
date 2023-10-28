import { UserProfile } from 'hooks/auth/useProfile';
import { AccessRoleNames } from 'types/enums/access-role-types';

export const hasAccessRole = (
  userProfile: UserProfile | undefined,
  roleNames: string[],
): boolean => {
  return !!userProfile?.roles.some(role => roleNames.includes(role.accessRole.name));
};

export const isAdmin = (userProfile: UserProfile | undefined): boolean => {
  return hasAccessRole(userProfile, [AccessRoleNames.ADMIN]);
};

export const isGrower = (userProfile: UserProfile | undefined): boolean => {
  return hasAccessRole(userProfile, [AccessRoleNames.GROWER, AccessRoleNames.ADMIN]);
};

export function isBreeder(userProfile: UserProfile | undefined): boolean {
  return hasAccessRole(userProfile, [AccessRoleNames.BREEDER]);
}

export function isStaff(userProfile: UserProfile | undefined): boolean {
  return hasAccessRole(userProfile, [AccessRoleNames.STAFF]);
}
