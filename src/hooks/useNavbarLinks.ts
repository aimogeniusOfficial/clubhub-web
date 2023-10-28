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
        label: 'Verified Cultivars',
        Icon: IconSeeding,
      });
    }

    growerLinks.push({
      link: '/my-cultivars',
      label: 'My Cultivars',
      Icon: IconSeeding,
    });

    if (pathname === `${'/breeders/'}${breederId}`) {
      growerLinks.push({
        link: `/breeders/${breederId}`,
        label: 'Breeders',
        Icon: IconPlant2,
      });
    } else {
      growerLinks.push({
        link: '/breeders',
        label: 'Breeders',
        Icon: IconPlant2,
      });
    }

    // growerLinks.push({
    //   link: '/journal',
    //   label: 'Timeline Journal',
    //   Icon: IconTimeline,
    // });

    growerLinks.push({
      link: '/grow-cycle',
      label: 'Grow Cycles',
      Icon: IconRepeat,
    });

    growerLinks.push({
      link: '/grow-space',
      label: 'Grow Spaces',
      Icon: IconBox,
    });

    // growerLinks.push({
    //   link: '/light-control-panel',
    //   label: 'Light Control Panel',
    //   Icon: IconAdjustments,
    // });

    growerLinks.push({
      link: '/vault',
      label: 'My Seed Vault',
      Icon: IconBoxModel,
    });

    growerLinks.push({
      link: '/chat',
      label: 'Shaman Assistant',
      Icon: IconMessageChatbot,
    });

    return growerLinks;
  }

  return growerLinks;
}
