import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/orders - Get user's orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const { userId, cartItems, deliveryAddress, phone, notes } = await request.json()

    if (!userId || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'User ID and cart items are required' }, { status: 400 })
    }

    // Calculate total
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + (item.product.price * item.quantity), 0
    )

    // Create order with order items
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        deliveryAddress,
        phone,
        notes,
        orderItems: {
          create: cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    // Clear user's cart after successful order
    await prisma.cartItem.deleteMany({
      where: { userId }
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
