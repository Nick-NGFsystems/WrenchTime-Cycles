import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { relayLeadToNgf } from '@/lib/ngf-lead'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, bikeYear, bikeMake, bikeModel, service, description, bikeStarts, location } = body

    if (!name || !email || !phone || !bikeYear || !bikeMake || !bikeModel || !service || !description) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
    }

    const request = await db.serviceRequest.create({
      data: {
        name,
        email,
        phone,
        bikeYear,
        bikeMake,
        bikeModel,
        service,
        description,
        bikeStarts: bikeStarts ?? null,
        location: location ?? null,
        status: 'pending',
      },
    })

    // Additive: also surface this in the client's portal "Form Submissions"
    // inbox. The row above stays the system of record for the shop's own
    // service-request workflow — nothing about it changes. relayLeadToNgf never
    // throws and has a 5s timeout, so a slow or down portal cannot fail an
    // intake that has already been persisted.
    await relayLeadToNgf('intake', body)

    return NextResponse.json({ success: true, data: request })
  } catch (error) {
    console.error('Intake API error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
  }
}
