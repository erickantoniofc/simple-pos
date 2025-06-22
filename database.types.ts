export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      branches: {
        Row: {
          active: boolean
          address: string
          commercial_name: string
          created_at: string | null
          department: string
          hacienda_code: string
          id: string
          municipality: string
          name: string
          stablishment_type: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          address: string
          commercial_name: string
          created_at?: string | null
          department: string
          hacienda_code: string
          id?: string
          municipality: string
          name: string
          stablishment_type: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          address?: string
          commercial_name?: string
          created_at?: string | null
          department?: string
          hacienda_code?: string
          id?: string
          municipality?: string
          name?: string
          stablishment_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          active: boolean
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          active: boolean
          activity: number | null
          address: string | null
          created_at: string | null
          department: string | null
          dui: string | null
          email: string | null
          id: string
          municipality: string | null
          name: string
          nit: string | null
          nrc: string | null
          phone: string | null
          send_method: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          activity?: number | null
          address?: string | null
          created_at?: string | null
          department?: string | null
          dui?: string | null
          email?: string | null
          id?: string
          municipality?: string | null
          name: string
          nit?: string | null
          nrc?: string | null
          phone?: string | null
          send_method?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          activity?: number | null
          address?: string | null
          created_at?: string | null
          department?: string | null
          dui?: string | null
          email?: string | null
          id?: string
          municipality?: string | null
          name?: string
          nit?: string | null
          nrc?: string | null
          phone?: string | null
          send_method?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dte: {
        Row: {
          control_number: string | null
          created_at: string
          dte: Json | null
          id: number
        }
        Insert: {
          control_number?: string | null
          created_at?: string
          dte?: Json | null
          id?: number
        }
        Update: {
          control_number?: string | null
          created_at?: string
          dte?: Json | null
          id?: number
        }
        Relationships: []
      }
      pos_points: {
        Row: {
          active: boolean
          branch_id: string
          created_at: string | null
          hacienda_code: string
          id: string
          location: string
          name: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          branch_id: string
          created_at?: string | null
          hacienda_code: string
          id?: string
          location: string
          name: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          branch_id?: string
          created_at?: string | null
          hacienda_code?: string
          id?: string
          location?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pos_points_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          category: string | null
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_category"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string
          permissions: Json
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          permissions?: Json
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          permissions?: Json
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      sale_items: {
        Row: {
          created_at: string | null
          discount: number
          id: string
          price: number
          product: Json
          product_id: string | null
          quantity: number
          sale_id: string
          subtotal: number
          total: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          discount: number
          id?: string
          price: number
          product: Json
          product_id?: string | null
          quantity: number
          sale_id: string
          subtotal: number
          total: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          discount?: number
          id?: string
          price?: number
          product?: Json
          product_id?: string | null
          quantity?: number
          sale_id?: string
          subtotal?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sale_items_product"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          cancelled_date: string | null
          created_at: string | null
          customer: Json | null
          customer_id: string | null
          date: string | null
          document_number: string
          document_type: number
          id: string
          payment_method: string
          payment_term: Json
          pos_id: string
          send_date: string | null
          signed_dte: Json | null
          status: number
          total: number
          transaction_term: string
          updated_at: string | null
        }
        Insert: {
          cancelled_date?: string | null
          created_at?: string | null
          customer?: Json | null
          customer_id?: string | null
          date?: string | null
          document_number: string
          document_type: number
          id?: string
          payment_method: string
          payment_term: Json
          pos_id: string
          send_date?: string | null
          signed_dte?: Json | null
          status: number
          total: number
          transaction_term: string
          updated_at?: string | null
        }
        Update: {
          cancelled_date?: string | null
          created_at?: string | null
          customer?: Json | null
          customer_id?: string | null
          date?: string | null
          document_number?: string
          document_type?: number
          id?: string
          payment_method?: string
          payment_term?: Json
          pos_id?: string
          send_date?: string | null
          signed_dte?: Json | null
          status?: number
          total?: number
          transaction_term?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sales_customer"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      sequential_counters: {
        Row: {
          counter_key: string
          counter_value: number | null
          updated_at: string
        }
        Insert: {
          counter_key: string
          counter_value?: number | null
          updated_at?: string
        }
        Update: {
          counter_key?: string
          counter_value?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
