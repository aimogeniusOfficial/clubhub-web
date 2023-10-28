import { matchRoutes, useLocation } from 'react-router-dom';
import { growerBreederRoutesMap } from 'routes/ShamanAppRoutes';
import { authRoutesMap } from 'routes/PublicRoutes';

export default function useCurrentRoute(): string {
  const routes = ['/'].concat(Object.keys(authRoutesMap), Object.keys(growerBreederRoutesMap));

  const location = useLocation();
  const uniqRoutes = [...new Set(routes)];
  const matchedRoutes = matchRoutes(
    uniqRoutes.map(item => ({ path: item })),
    location,
  );

  if (Array.isArray(matchedRoutes)) {
    return matchedRoutes[0].route.path;
  }

  return '';
}
