// app/api/track-click/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Read environment variables inside the function (runtime)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json(
        { error: 'Server configuration error' }, 
        { status: 500 }
      )
    }

    // Create client inside the function
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body = await request.json()
    const { hotelName, city, affiliateUrl } = body

    const userAgent = request.headers.get('user-agent') || null
    const referer = request.headers.get('referer') || null
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               null

    const { data, error } = await supabase
      .from('click_tracking')
      .insert({
        hotel_name: hotelName,
        city: city,
        affiliate_url: affiliateUrl,
        user_agent: userAgent,
        referer: referer,
        ip_address: ip,
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track click error:', error)
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 })
  }
}