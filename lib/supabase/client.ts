import type { createClient } from "@supabase/supabase-js"

// Variáveis de ambiente para Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// Cliente Supabase para o lado do cliente
const supabaseClient: ReturnType<typeof createClient> | null = null

// Função para obter o cliente Supabase no lado do cliente
export function getSupabaseClient() {
  // Sempre retornar null para forçar o uso de dados mockados
  return null
}

// Função para criar um cliente Supabase no lado do servidor
export function createServerSupabaseClient() {
  // Sempre retornar null para forçar o uso de dados mockados
  return null
}

// Função para verificar se o cliente Supabase está autenticado
export async function ensureSupabaseAuth() {
  // Sempre retornar false para forçar o uso de dados mockados
  return false
}
