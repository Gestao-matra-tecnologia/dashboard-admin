"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"

// Singleton pattern para o cliente Supabase
let supabaseClient: SupabaseClient<Database> | null = null

export function useSupabase() {
  const [client, setClient] = useState<SupabaseClient<Database> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initializeClient = async () => {
      try {
        if (!supabaseClient) {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
          const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

          if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error("Supabase URL or Anon Key is missing")
          }

          supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
        }

        setClient(supabaseClient)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to initialize Supabase client"))
      } finally {
        setLoading(false)
      }
    }

    initializeClient()
  }, [])

  return { client, loading, error }
}
