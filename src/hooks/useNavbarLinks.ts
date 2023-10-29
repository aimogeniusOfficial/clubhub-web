import { IconSmartHome, IconCalendar, IconStar, IconDatabaseSearch } from '@tabler/icons-react';
import { isAdmin, isGrower } from 'utils/roleAccessHelper';

import useProfile from './auth/useProfile';

export default function useNavbarLinks(): {
  link: string;
  label: string;
  
}[] {
  const { data: userProfile } = useProfile();

  const growerLinks: any[] = [];

  if (isAdmin(userProfile?.data)) {
    growerLinks.push({
      link: '/admin',
      label: 'Admin Home',
      Icon: IconSmartHome,
    });
  }

  if (isGrower(userProfile?.data)) {
    growerLinks.push({
      link: '/',
      label: 'Home',
      Icon: IconSmartHome,
    });

    growerLinks.push({
      link: '/find',
      label: 'Club List',
      Icon: IconDatabaseSearch,
    });

    growerLinks.push({
      link: '/clubs',
      label: 'My Clubs',
      Icon: IconStar,
    });

    growerLinks.push({
      link: '/calendar',
      label: 'Calendar',
      Icon: IconCalendar,
    });

    return growerLinks;
  }

  return growerLinks;
}
