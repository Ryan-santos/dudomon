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
      heroes: {
        Row: {
          class: string
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          class: string
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          class?: string
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      jukebox: {
        Row: {
          created_at: string
          id: number
          track: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          track?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          track?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jukebox_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tierlist: {
        Row: {
          adc: string | null
          created_at: string
          id: number
          jg: string | null
          mid: string | null
          sup: string | null
          top: string | null
        }
        Insert: {
          adc?: string | null
          created_at?: string
          id?: number
          jg?: string | null
          mid?: string | null
          sup?: string | null
          top?: string | null
        }
        Update: {
          adc?: string | null
          created_at?: string
          id?: number
          jg?: string | null
          mid?: string | null
          sup?: string | null
          top?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tierlist_adc_fkey"
            columns: ["adc"]
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tierlist_id_fkey"
            columns: ["id"]
            referencedRelation: "heroes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tierlist_jg_fkey"
            columns: ["jg"]
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tierlist_mid_fkey"
            columns: ["mid"]
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tierlist_sup_fkey"
            columns: ["sup"]
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tierlist_top_fkey"
            columns: ["top"]
            referencedRelation: "tiers"
            referencedColumns: ["id"]
          }
        ]
      }
      tiers: {
        Row: {
          color: string
          contrast: string
          created_at: string
          description: string
          id: string
          order: number
        }
        Insert: {
          color?: string
          contrast?: string
          created_at?: string
          description: string
          id: string
          order: number
        }
        Update: {
          color?: string
          contrast?: string
          created_at?: string
          description?: string
          id?: string
          order?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
