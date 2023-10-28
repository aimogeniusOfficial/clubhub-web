import React, { createContext, useContext, useEffect, useState } from 'react';

import { FEATURE_FLAGS } from 'utils/featureFlags';
import supabaseInstance from 'utils/supabaseInstance';

const FeatureGateContext = createContext({});

export function useFeatureGate(): any {
  return useContext(FeatureGateContext);
}

export function FeatureGateProvider({ children }: any) {
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatures = async () => {
      const { data, error } = await supabaseInstance
        .from('FeatureFlag')
        .select('name')
        .eq('isEnabled', true);

      if (error) {
        console.error('Something went wrong', error);
        return;
      }

      setFeatures(data.map(feature => feature.name));
      setLoading(false);
    };
    getFeatures();
  }, []);

  const isFeatureEnabled = (featureName: string) => {
    return features.includes(featureName);
  };

  const value = {
    isFeatureEnabled,
    isInviteOnlySignup: isFeatureEnabled(FEATURE_FLAGS.INVITE_ONLY_SIGNUP),
    features,
  };

  return (
    <FeatureGateContext.Provider value={value}>{!loading && children}</FeatureGateContext.Provider>
  );
}
