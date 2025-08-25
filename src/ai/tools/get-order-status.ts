
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Order, products } from '@/lib/data';

// This is a mock database. In a real app, you would fetch this from a real database.
// For the purpose of this prototype, we're creating a mock list of orders.
const mockOrders: Order[] = [
    {
        id: 'MW-54321',
        userId: 'user1',
        items: [
            { productId: '1', quantity: 2, price: 80 },
            { productId: '3', quantity: 1, price: 200 },
        ],
        total: 360,
        status: 'delivered',
        createdAt: new Date('2024-07-20T10:00:00Z'),
        deliveryAddress: '123 Main St, Hyderabad',
        deliveryDate: new Date('2024-07-21T10:00:00Z'),
    },
    {
        id: 'MW-98765',
        userId: 'user2',
        items: [{ productId: '2', quantity: 1, price: 120 }],
        total: 120,
        status: 'confirmed',
        createdAt: new Date('2024-07-22T14:30:00Z'),
        deliveryAddress: '456 Oak Ave, Hyderabad',
    },
    {
        id: 'MW-12345',
        userId: 'user3',
        items: [
            { productId: '4', quantity: 1, price: 800 },
        ],
        total: 800,
        status: 'pending',
        createdAt: new Date(),
        deliveryAddress: '789 Pine St, Hyderabad',
    },
];

const getOrderStatusInputSchema = z.object({
  orderId: z.string().describe('The ID of the order to get the status for.'),
});

const getOrderStatusOutputSchema = z.object({
  status: z.string().describe('The status of the order.'),
  date: z.string().describe('The date the order was placed.'),
  total: z.number().describe('The total amount of the order.'),
});


export const getOrderStatus = ai.defineTool(
  {
    name: 'getOrderStatus',
    description: 'Get the status of a customer\'s order by their order ID.',
    inputSchema: getOrderStatusInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const order = mockOrders.find((o) => o.id === input.orderId);
    
    if (!order) {
        return `Order with ID ${input.orderId} not found.`
    }

    const orderDate = order.createdAt.toLocaleDateString();

    return `The status for order #${order.id} (placed on ${orderDate}) is: ${order.status}. The total was ₹${order.total.toFixed(2)}.`;
  }
);
