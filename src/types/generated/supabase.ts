export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _CultivarToFlavor: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
        Relationships: [
          {
            foreignKeyName: "_CultivarToFlavor_A_fkey"
            columns: ["A"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_CultivarToFlavor_B_fkey"
            columns: ["B"]
            referencedRelation: "Flavor"
            referencedColumns: ["id"]
          }
        ]
      }
      _CultivarToTerpene: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
        Relationships: [
          {
            foreignKeyName: "_CultivarToTerpene_A_fkey"
            columns: ["A"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_CultivarToTerpene_B_fkey"
            columns: ["B"]
            referencedRelation: "Terpene"
            referencedColumns: ["id"]
          }
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      AccessRole: {
        Row: {
          createdAt: string
          description: string | null
          id: number
          name: string
          rank: number
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id?: number
          name?: string
          rank?: number
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: number
          name?: string
          rank?: number
        }
        Relationships: []
      }
      Announcement: {
        Row: {
          announcementType: Database["public"]["Enums"]["AnnouncementType"]
          createdAt: string | null
          finish: string | null
          id: number
          start: string | null
        }
        Insert: {
          announcementType: Database["public"]["Enums"]["AnnouncementType"]
          createdAt?: string | null
          finish?: string | null
          id?: number
          start?: string | null
        }
        Update: {
          announcementType?: Database["public"]["Enums"]["AnnouncementType"]
          createdAt?: string | null
          finish?: string | null
          id?: number
          start?: string | null
        }
        Relationships: []
      }
      Breeder: {
        Row: {
          country: string | null
          id: number
          isVerified: boolean | null
          name: string
          state: string | null
          website: string | null
        }
        Insert: {
          country?: string | null
          id?: number
          isVerified?: boolean | null
          name: string
          state?: string | null
          website?: string | null
        }
        Update: {
          country?: string | null
          id?: number
          isVerified?: boolean | null
          name?: string
          state?: string | null
          website?: string | null
        }
        Relationships: []
      }
      Cultivar: {
        Row: {
          breederId: number | null
          description: string
          id: number
          imageUrl: string | null
          isAutoflower: boolean
          isUnknown: boolean
          isVerified: boolean
          landrace: Database["public"]["Enums"]["Landrace"] | null
          name: string
        }
        Insert: {
          breederId?: number | null
          description: string
          id?: number
          imageUrl?: string | null
          isAutoflower?: boolean
          isUnknown?: boolean
          isVerified?: boolean
          landrace?: Database["public"]["Enums"]["Landrace"] | null
          name: string
        }
        Update: {
          breederId?: number | null
          description?: string
          id?: number
          imageUrl?: string | null
          isAutoflower?: boolean
          isUnknown?: boolean
          isVerified?: boolean
          landrace?: Database["public"]["Enums"]["Landrace"] | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Cultivar_breederId_fkey"
            columns: ["breederId"]
            referencedRelation: "Breeder"
            referencedColumns: ["id"]
          }
        ]
      }
      Clubs: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string | null
          category: number | null
          logo_url: string | null
          members: number | null
          instagram: string | null
          tiktok: string | null
          categoryId: any
        }
        Insert: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string | null
          category?: number | null
          logo_url: string | null
          members?: number | null
          instagram?: string | null
          tiktok?: string | null
          categoryId?: any
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string | null
          category?: number | null
          logo_url: string | null
          members?: number | null
          instagram?: string | null
          tiktok?: string | null
          categoryId?: any
        }
        Relationships: [
          {
            columns: ["category"]
            referencedRelation: "ClubCategory"
            referencedColumns: ["id"]
          }
        ]
      }
      ClubCategory: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      Document: {
        Row: {
          content: string
          embedding: string | null
          id: string
          metadata: Json
        }
        Insert: {
          content: string
          embedding?: string | null
          id: string
          metadata: Json
        }
        Update: {
          content?: string
          embedding?: string | null
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      FeatureFlag: {
        Row: {
          createdAt: string | null
          description: string | null
          id: number
          isEnabled: boolean
          name: string
        }
        Insert: {
          createdAt?: string | null
          description?: string | null
          id?: number
          isEnabled?: boolean
          name: string
        }
        Update: {
          createdAt?: string | null
          description?: string | null
          id?: number
          isEnabled?: boolean
          name?: string
        }
        Relationships: []
      }
      Flavor: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      GeneticLineage: {
        Row: {
          cultivarId: number
          fatherId: number | null
          id: number
          motherId: number | null
        }
        Insert: {
          cultivarId: number
          fatherId?: number | null
          id?: number
          motherId?: number | null
        }
        Update: {
          cultivarId?: number
          fatherId?: number | null
          id?: number
          motherId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "GeneticLineage_cultivarId_fkey"
            columns: ["cultivarId"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GeneticLineage_fatherId_fkey"
            columns: ["fatherId"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GeneticLineage_motherId_fkey"
            columns: ["motherId"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          }
        ]
      }
      GrowAction: {
        Row: {
          actionDate: string | null
          createdAt: string | null
          growCycleId: string | null
          id: string
          isMeasurement: boolean | null
          note: string | null
          type: Database["public"]["Enums"]["ActionMeasureType"] | null
          userId: string
          value: string | null
        }
        Insert: {
          actionDate?: string | null
          createdAt?: string | null
          growCycleId?: string | null
          id: string
          isMeasurement?: boolean | null
          note?: string | null
          type?: Database["public"]["Enums"]["ActionMeasureType"] | null
          userId: string
          value?: string | null
        }
        Update: {
          actionDate?: string | null
          createdAt?: string | null
          growCycleId?: string | null
          id?: string
          isMeasurement?: boolean | null
          note?: string | null
          type?: Database["public"]["Enums"]["ActionMeasureType"] | null
          userId?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "GrowAction_growCycleId_fkey"
            columns: ["growCycleId"]
            referencedRelation: "GrowCycle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GrowAction_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      GrowCycle: {
        Row: {
          createdAt: string | null
          cultivarId: number | null
          currentGrowStage: Database["public"]["Enums"]["GrowStage"] | null
          description: string | null
          endDate: string | null
          expectedFlowerStartDate: string | null
          expectedHarvestDate: string | null
          growerCultivarId: string | null
          growSpaceId: string | null
          id: string
          initialPlantCount: number | null
          name: string
          startDate: string | null
          startingGrowStage: Database["public"]["Enums"]["GrowStage"] | null
          status: Database["public"]["Enums"]["GrowCycleStatus"]
          userId: string
        }
        Insert: {
          createdAt?: string | null
          cultivarId?: number | null
          currentGrowStage?: Database["public"]["Enums"]["GrowStage"] | null
          description?: string | null
          endDate?: string | null
          expectedFlowerStartDate?: string | null
          expectedHarvestDate?: string | null
          growerCultivarId?: string | null
          growSpaceId?: string | null
          id: string
          initialPlantCount?: number | null
          name: string
          startDate?: string | null
          startingGrowStage?: Database["public"]["Enums"]["GrowStage"] | null
          status: Database["public"]["Enums"]["GrowCycleStatus"]
          userId: string
        }
        Update: {
          createdAt?: string | null
          cultivarId?: number | null
          currentGrowStage?: Database["public"]["Enums"]["GrowStage"] | null
          description?: string | null
          endDate?: string | null
          expectedFlowerStartDate?: string | null
          expectedHarvestDate?: string | null
          growerCultivarId?: string | null
          growSpaceId?: string | null
          id?: string
          initialPlantCount?: number | null
          name?: string
          startDate?: string | null
          startingGrowStage?: Database["public"]["Enums"]["GrowStage"] | null
          status?: Database["public"]["Enums"]["GrowCycleStatus"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "GrowCycle_cultivarId_fkey"
            columns: ["cultivarId"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GrowCycle_growerCultivarId_fkey"
            columns: ["growerCultivarId"]
            referencedRelation: "GrowerCultivar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GrowCycle_growSpaceId_fkey"
            columns: ["growSpaceId"]
            referencedRelation: "GrowSpace"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GrowCycle_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      GrowCyclePlant: {
        Row: {
          growCycleId: string
          id: number
          seedId: number
        }
        Insert: {
          growCycleId: string
          id?: number
          seedId: number
        }
        Update: {
          growCycleId?: string
          id?: number
          seedId?: number
        }
        Relationships: [
          {
            foreignKeyName: "GrowCyclePlant_growCycleId_fkey"
            columns: ["growCycleId"]
            referencedRelation: "GrowCycle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GrowCyclePlant_seedId_fkey"
            columns: ["seedId"]
            referencedRelation: "Seed"
            referencedColumns: ["id"]
          }
        ]
      }
      GrowerCultivar: {
        Row: {
          description: string
          growerId: string
          growthType: Database["public"]["Enums"]["GrowthType"] | null
          id: string
          linkedCultivarId: number | null
          name: string
          plantType: string | null
          seedType: Database["public"]["Enums"]["SeedType"] | null
        }
        Insert: {
          description: string
          growerId: string
          growthType?: Database["public"]["Enums"]["GrowthType"] | null
          id: string
          linkedCultivarId?: number | null
          name: string
          plantType?: string | null
          seedType?: Database["public"]["Enums"]["SeedType"] | null
        }
        Update: {
          description?: string
          growerId?: string
          growthType?: Database["public"]["Enums"]["GrowthType"] | null
          id?: string
          linkedCultivarId?: number | null
          name?: string
          plantType?: string | null
          seedType?: Database["public"]["Enums"]["SeedType"] | null
        }
        Relationships: [
          {
            foreignKeyName: "GrowerCultivar_growerId_fkey"
            columns: ["growerId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GrowerCultivar_linkedCultivarId_fkey"
            columns: ["linkedCultivarId"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          }
        ]
      }
      GrowSpace: {
        Row: {
          createdAt: string | null
          environment:
            | Database["public"]["Enums"]["GrowSpaceEnvironment"]
            | null
          height: number | null
          id: string
          length: number | null
          location: string | null
          name: string | null
          otherSpaceType: string | null
          spaceType: Database["public"]["Enums"]["GrowSpaceType"] | null
          userId: string
          width: number | null
        }
        Insert: {
          createdAt?: string | null
          environment?:
            | Database["public"]["Enums"]["GrowSpaceEnvironment"]
            | null
          height?: number | null
          id: string
          length?: number | null
          location?: string | null
          name?: string | null
          otherSpaceType?: string | null
          spaceType?: Database["public"]["Enums"]["GrowSpaceType"] | null
          userId: string
          width?: number | null
        }
        Update: {
          createdAt?: string | null
          environment?:
            | Database["public"]["Enums"]["GrowSpaceEnvironment"]
            | null
          height?: number | null
          id?: string
          length?: number | null
          location?: string | null
          name?: string | null
          otherSpaceType?: string | null
          spaceType?: Database["public"]["Enums"]["GrowSpaceType"] | null
          userId?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "GrowSpace_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Journal: {
        Row: {
          createdAt: string | null
          growCycleId: string | null
          id: number
          name: string | null
        }
        Insert: {
          createdAt?: string | null
          growCycleId?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          createdAt?: string | null
          growCycleId?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Journal_growCycleId_fkey"
            columns: ["growCycleId"]
            referencedRelation: "GrowCycle"
            referencedColumns: ["id"]
          }
        ]
      }
      JournalEntry: {
        Row: {
          createdAt: string | null
          createdBy: string
          entryText: string | null
          growCycleId: string | null
          id: number
          journalId: number | null
        }
        Insert: {
          createdAt?: string | null
          createdBy: string
          entryText?: string | null
          growCycleId?: string | null
          id?: number
          journalId?: number | null
        }
        Update: {
          createdAt?: string | null
          createdBy?: string
          entryText?: string | null
          growCycleId?: string | null
          id?: number
          journalId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "JournalEntry_createdBy_fkey"
            columns: ["createdBy"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JournalEntry_growCycleId_fkey"
            columns: ["growCycleId"]
            referencedRelation: "GrowCycle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JournalEntry_journalId_fkey"
            columns: ["journalId"]
            referencedRelation: "Journal"
            referencedColumns: ["id"]
          }
        ]
      }
      JournalEntryAttachment: {
        Row: {
          fileUrl: string
          id: number
          journalEntryId: number
        }
        Insert: {
          fileUrl: string
          id?: number
          journalEntryId: number
        }
        Update: {
          fileUrl?: string
          id?: number
          journalEntryId?: number
        }
        Relationships: [
          {
            foreignKeyName: "JournalEntryAttachment_journalEntryId_fkey"
            columns: ["journalEntryId"]
            referencedRelation: "JournalEntry"
            referencedColumns: ["id"]
          }
        ]
      }
      JournalEntryLike: {
        Row: {
          id: number
          journalEntryId: number | null
          userId: string
        }
        Insert: {
          id?: number
          journalEntryId?: number | null
          userId: string
        }
        Update: {
          id?: number
          journalEntryId?: number | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "JournalEntryLike_journalEntryId_fkey"
            columns: ["journalEntryId"]
            referencedRelation: "JournalEntry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JournalEntryLike_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Seed: {
        Row: {
          cultivarId: number
          id: number
          plantId: number | null
          status: Database["public"]["Enums"]["SeedStatus"]
          vaultId: number
        }
        Insert: {
          cultivarId: number
          id?: number
          plantId?: number | null
          status: Database["public"]["Enums"]["SeedStatus"]
          vaultId: number
        }
        Update: {
          cultivarId?: number
          id?: number
          plantId?: number | null
          status?: Database["public"]["Enums"]["SeedStatus"]
          vaultId?: number
        }
        Relationships: [
          {
            foreignKeyName: "Seed_cultivarId_fkey"
            columns: ["cultivarId"]
            referencedRelation: "Cultivar"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Seed_vaultId_fkey"
            columns: ["vaultId"]
            referencedRelation: "Vault"
            referencedColumns: ["id"]
          }
        ]
      }
      ShamanChat: {
        Row: {
          createdAt: string
          id: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ShamanChat_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      ShamanChatMessage: {
        Row: {
          chatId: string
          content: string
          createdAt: string
          id: string
          speaker: Database["public"]["Enums"]["Speaker"]
        }
        Insert: {
          chatId: string
          content: string
          createdAt?: string
          id: string
          speaker?: Database["public"]["Enums"]["Speaker"]
        }
        Update: {
          chatId?: string
          content?: string
          createdAt?: string
          id?: string
          speaker?: Database["public"]["Enums"]["Speaker"]
        }
        Relationships: [
          {
            foreignKeyName: "ShamanChatMessage_chatId_fkey"
            columns: ["chatId"]
            referencedRelation: "ShamanChat"
            referencedColumns: ["id"]
          }
        ]
      }
      SubscriptionPlan: {
        Row: {
          activeGrowCycles: number
          description: string | null
          growSpaces: number
          id: number
          monthlyPrice: number
          name: string
          plantsPerGrowCycle: number
          productId: string | null
          stripeMonthlyPriceId: string | null
          stripeYearlyPriceId: string | null
          yearlyPrice: number | null
        }
        Insert: {
          activeGrowCycles: number
          description?: string | null
          growSpaces: number
          id?: number
          monthlyPrice: number
          name: string
          plantsPerGrowCycle: number
          productId?: string | null
          stripeMonthlyPriceId?: string | null
          stripeYearlyPriceId?: string | null
          yearlyPrice?: number | null
        }
        Update: {
          activeGrowCycles?: number
          description?: string | null
          growSpaces?: number
          id?: number
          monthlyPrice?: number
          name?: string
          plantsPerGrowCycle?: number
          productId?: string | null
          stripeMonthlyPriceId?: string | null
          stripeYearlyPriceId?: string | null
          yearlyPrice?: number | null
        }
        Relationships: []
      }
      Terpene: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          birthdate: string | null
          email: string
          id: string
          invitationsLeft: number
          name: string | null
          stripeCustomerId: string | null
          username: string
        }
        Insert: {
          birthdate?: string | null
          email: string
          id: string
          invitationsLeft?: number
          name?: string | null
          stripeCustomerId?: string | null
          username: string
        }
        Update: {
          birthdate?: string | null
          email?: string
          id?: string
          invitationsLeft?: number
          name?: string | null
          stripeCustomerId?: string | null
          username?: string
        }
        Relationships: []
      }
      UserInvitation: {
        Row: {
          createdAt: string | null
          expirationDate: string
          id: number
          inviteeEmail: string
          inviterId: string
          status: Database["public"]["Enums"]["InvitationStatus"]
          token: string
        }
        Insert: {
          createdAt?: string | null
          expirationDate?: string
          id?: number
          inviteeEmail: string
          inviterId: string
          status?: Database["public"]["Enums"]["InvitationStatus"]
          token: string
        }
        Update: {
          createdAt?: string | null
          expirationDate?: string
          id?: number
          inviteeEmail?: string
          inviterId?: string
          status?: Database["public"]["Enums"]["InvitationStatus"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserInvitation_inviterId_fkey"
            columns: ["inviterId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      UserRole: {
        Row: {
          accessRoleId: number | null
          createdAt: string | null
          id: number
          userId: string
        }
        Insert: {
          accessRoleId?: number | null
          createdAt?: string | null
          id?: number
          userId: string
        }
        Update: {
          accessRoleId?: number | null
          createdAt?: string | null
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserRole_accessRoleId_fkey"
            columns: ["accessRoleId"]
            referencedRelation: "AccessRole"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserRole_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      UserSubscription: {
        Row: {
          activationDate: string
          expiryDate: string | null
          id: number
          isActive: boolean
          paymentStatus: Database["public"]["Enums"]["PaymentStatusType"]
          stripeSubscriptionId: string | null
          subscriptionPlanId: number
          userId: string
        }
        Insert: {
          activationDate?: string
          expiryDate?: string | null
          id?: number
          isActive?: boolean
          paymentStatus: Database["public"]["Enums"]["PaymentStatusType"]
          stripeSubscriptionId?: string | null
          subscriptionPlanId: number
          userId: string
        }
        Update: {
          activationDate?: string
          expiryDate?: string | null
          id?: number
          isActive?: boolean
          paymentStatus?: Database["public"]["Enums"]["PaymentStatusType"]
          stripeSubscriptionId?: string | null
          subscriptionPlanId?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserSubscription_subscriptionPlanId_fkey"
            columns: ["subscriptionPlanId"]
            referencedRelation: "SubscriptionPlan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserSubscription_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Vault: {
        Row: {
          id: number
          userId: string
        }
        Insert: {
          id?: number
          userId: string
        }
        Update: {
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Vault_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Versions: {
        Row: {
          createdAt: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          createdAt?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          createdAt?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      ActionMeasureType:
        | "WATER"
        | "TRIM"
        | "FEED"
        | "HARVEST"
        | "TRAINING"
        | "OTHER"
        | "VPD"
        | "TEMPERATURE"
        | "LIGHT_INTENSITY"
        | "HUMIDITY"
      AnnouncementType:
        | "Maintenance"
        | "Outage"
        | "Update"
        | "NewFeature"
        | "BugFix"
      GrowCycleStatus:
        | "DRAFT"
        | "PREPARING"
        | "ACTIVE"
        | "COMPLETED"
        | "CANCELED"
        | "ARCHIVED"
      GrowSpaceEnvironment: "INDOOR" | "OUTDOOR"
      GrowSpaceType: "TENT" | "GROW_ROOM" | "OTHER"
      GrowStage:
        | "SEED"
        | "SEEDLING"
        | "CLONE"
        | "VEGETATIVE"
        | "FLOWER"
        | "HARVEST"
      GrowthType: "PHOTOPERIOD" | "AUTOFLOWER"
      InvitationStatus: "PENDING" | "ACCEPTED" | "EXPIRED"
      Landrace: "Afghan" | "Thai" | "Columbian" | "Mexican" | "Jamaican"
      PaymentStatusType:
        | "FREE"
        | "PAID_MONTHLY"
        | "PAID_YEARLY"
        | "CANCELLED"
        | "OVERDUE"
      SeedStatus: "AVAILABLE" | "LOCKED" | "GERMINATED" | "FAILED"
      SeedType: "REGULAR" | "FEMINIZED"
      Speaker: "USER" | "BOT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

