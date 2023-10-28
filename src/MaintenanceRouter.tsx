import React, { useState } from 'react';
import Maintenance from 'pages/shared/Maintenance';
import useMaintenance from 'hooks/announcements/useMaintenance';

export function MaintenanceRouter({ children }: any) {
  const { data, isLoading } = useMaintenance();
  const isUnderMaintenance = !!data?.data
  return (
    isUnderMaintenance ? <Maintenance /> : !isLoading && children
  );
}
