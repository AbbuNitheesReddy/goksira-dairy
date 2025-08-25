import { config } from 'dotenv';
config();

import '@/ai/flows/calculate-milk-requirement.ts';
import '@/ai/flows/chat.ts';
import '@/ai/tools/get-order-status.ts';
