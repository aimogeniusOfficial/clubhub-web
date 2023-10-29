import { Database } from './supabase';

export type BreederRow = Database['public']['Tables']['Breeder']['Row'];
export type BreederInsert = Database['public']['Tables']['Breeder']['Insert'];

export type CultivarRow = Database['public']['Tables']['Cultivar']['Row'];
export type CultivarInsert = Database['public']['Tables']['Cultivar']['Insert'];

export type GrowSpaceRow = Database['public']['Tables']['GrowSpace']['Row'];
export type GrowSpaceInsert = Database['public']['Tables']['GrowSpace']['Insert'];

export type ShamanVersionRow = Database['public']['Tables']['Versions']['Row'];

export type UserInvitationRow = Database['public']['Tables']['UserInvitation']['Row'];
export type UserInvitationInsert = Database['public']['Tables']['UserInvitation']['Insert'];

export type UserRolesRow = Database['public']['Tables']['UserRole']['Row'];
export type UserRolesInsert = Database['public']['Tables']['UserRole']['Insert'];

export type AccessRolesRow = Database['public']['Tables']['AccessRole']['Row'];
export type AccessRolesInsert = Database['public']['Tables']['AccessRole']['Insert'];

// export type PlantDetailsRow = PlantRow & {
//   cultivars: CultivarRow;
//   breeders: BreederRow;
//   plant_types: PlantTypeRow;
// };

export type CultivarDetailsRow = CultivarRow & {
  cultivars: CultivarRow;
  Breeder: BreederRow;
  isVerified: CultivarRow;
};

// export type GrowSpacesWithPlant = GrowSpaceRow & { plants: PlantRow[] };
// export type GrowSpacesWithPlantDetails = GrowSpaceRow & { plants: PlantDetailsRow[] };

export type GrowCycleRow = Database['public']['Tables']['GrowCycle']['Row'];
export type GrowCycleInsert = Database['public']['Tables']['GrowCycle']['Insert'];
export type GrowCycleStatusEnum = Database['public']['Enums']['GrowCycleStatus'];

export type FeatureRow = Database['public']['Tables']['FeatureFlag']['Row'];
export type FeatureInsert = Database['public']['Tables']['FeatureFlag']['Insert'];

export type AnnouncementRow = Database['public']['Tables']['Announcement']['Row'];
export type AnnouncementInsert = Database['public']['Tables']['Announcement']['Insert'];

export type SubscriptionPlan = Database['public']['Tables']['SubscriptionPlan']['Row'];

export type JournalEntryRow = Database['public']['Tables']['JournalEntry']['Row'];
export type JournalEntryInsert = Database['public']['Tables']['JournalEntry']['Insert'];
export type JournalEntryAttachmentRow =
  Database['public']['Tables']['JournalEntryAttachment']['Row'];
export type JournalEntryLikeRow = Database['public']['Tables']['JournalEntryLike']['Row'];

export type SeedVaultRow = Database['public']['Tables']['Vault']['Row'];

export type SeedVaultWithCultivarsRow = SeedVaultRow & {
  cultivars: CultivarRow;
};
export type UserRow = Database['public']['Tables']['User']['Row'];

export type JournalEntryWithAttachments = JournalEntryRow & {
  user: UserRow;
  attachments: JournalEntryAttachmentRow[];
  likes: JournalEntryLikeRow[];
};

export type GrowSpaceEnvironmentEnum = Database['public']['Enums']['GrowSpaceEnvironment'];
export type GrowSpaceTypeEnum = Database['public']['Enums']['GrowSpaceType'];

export type SubscriptionPlanRow = Database['public']['Tables']['SubscriptionPlan']['Row'];

export type GeneticLineageRow = Database['public']['Tables']['GeneticLineage']['Row'];
export type GeneticLineageInsert = Database['public']['Tables']['GeneticLineage']['Insert'];
export type LandraceEnum = Database['public']['Enums']['Landrace'];

export type CultivarWithGeneticLineage = CultivarInsert & {
  motherId: number | null;
  fatherId: number | null;
};

export type GrowActionRow = Database['public']['Tables']['GrowAction']['Row'];
export type GrowActionInsert = Database['public']['Tables']['GrowAction']['Insert'];
export type GrowActionMeasureTypeEnum = Database['public']['Enums']['ActionMeasureType'];

export type ClubRow = Database['public']['Tables']['Clubs']['Row'];

export type ClubCategoryRow = Database['public']['Tables']['ClubCategory']['Row'];
