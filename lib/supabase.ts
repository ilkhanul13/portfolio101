// lib/supabase.ts - FIXED VERSION
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Buat client Supabase dengan fallback untuk development
export const supabase = createClient(
  supabaseUrl || 'https://demo.supabase.co',
  supabaseAnonKey || 'demo-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
)

// Function untuk cek koneksi Supabase
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Jika environment variables tidak ada, anggap tidak terhubung
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('⚠️ Supabase environment variables not set')
      return false
    }
    
    // Test koneksi dengan query sederhana
    const { data, error } = await supabase
      .from('testimonials')
      .select('id', { count: 'exact', head: true })
      .limit(1)
    
    // Jika error tapi karena table tidak ada, masih consider connected
    if (error) {
      // Error code untuk "relation tidak ditemukan" atau "table tidak ada"
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.log('⚠️ Supabase connected but testimonials table not found')
        return true // Masih consider connected, table bisa dibuat nanti
      }
      
      console.error('❌ Supabase connection error:', error.message)
      return false
    }
    
    console.log('✅ Supabase connected successfully')
    return true
    
  } catch (error: any) {
    console.error('❌ Error checking Supabase connection:', error.message)
    return false
  }
}

// Function untuk cek apakah Supabase environment variables sudah di-set
export const hasSupabaseConfig = (): boolean => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Function untuk mendapatkan status koneksi dengan detail
export const getConnectionStatus = async () => {
  const hasConfig = hasSupabaseConfig()
  const isConnected = hasConfig ? await checkSupabaseConnection() : false
  
  return {
    hasConfig,
    isConnected,
    mode: hasConfig ? (isConnected ? 'supabase' : 'demo') : 'demo'
  }
}