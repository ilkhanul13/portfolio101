// app/api/testimonials/route.ts - SUPABASE VERSION
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const status = searchParams.get('status') || 'approved'
    
    let query = supabase
      .from('testimonials')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    
    return NextResponse.json(data || [])
    
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json([], { status: 200 })
  }
}