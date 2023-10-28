import {
  IconBox,
  IconBoxModel,
  IconMessageChatbot,
  IconPlant2,
  IconSeeding,
  IconSmartHome,
  IconRepeat,
  TablerIconsProps,
} from '@tabler/icons-react';
import { useFeatureGate } from 'contexts/FeatureGateContext';
import { useParams, useLocation } from 'react-router-dom';
import { isAdmin, isGrower } from 'utils/roleAccessHelper';

import useProfile from './auth/useProfile';

export default function useNavbarLinks(): {
  link: string;
  label: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
}[] {
  const { data: userProfile } = useProfile();
  const { breederId } = useParams();
  const { cultivarId } = useParams();
  const { pathname } = useLocation();
  const { isFeatureEnabled } = useFeatureGate();

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

    if (pathname === `cultivars/${cultivarId}`) {
      growerLinks.push({
        link: `/cultivars/${cultivarId}`,
        label: 'Cultivars',
        Icon: IconSeeding,
      });
    } else {
      growerLinks.push({
        link: '/cultivars',
        label: 'Club List',
        Icon: IconSeeding,
      });
    }

    growerLinks.push({
      link: '/my-cultivars',
      label: 'My Clubs',
      Icon: IconSeeding,
    });

    growerLinks.push({
      link: '/grow-space',
      label: 'Calendar',
      Icon: IconBox,
    });

    return growerLinks;
  }

  return growerLinks;
}
