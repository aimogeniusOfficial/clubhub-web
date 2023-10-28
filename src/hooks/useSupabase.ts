import { useMemo } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'types/generated/supabase';
import supabaseInstance from 'utils/supabaseInstance';

export default function useSupabase(): SupabaseClient<Database> {
  return useMemo(() => supabaseInstance, []);
}
