import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, bikeYear, bikeMake, bikeModel, service, description } = body

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
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, data: request })
  } catch (error) {
    console.error('Intake API error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
  }
}
