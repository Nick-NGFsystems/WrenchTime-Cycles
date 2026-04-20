import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ token: string }>
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { token } = await context.params

    const request = await db.serviceRequest.findUnique({
      where: { bookingToken: token },
    })

    if (!request) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    if (request.status === 'confirmed') {
      return NextResponse.json({ success: false, error: 'This booking has already been confirmed' }, { status: 400 })
    }

    await db.serviceRequest.update({
      where: { bookingToken: token },
      data: { status: 'confirmed' },
    })

    return NextResponse.json({ success: true, message: 'Booking confirmed' })
  } catch (error) {
    console.error('Booking confirm error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
  }
}
