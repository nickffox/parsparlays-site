import { z } from 'zod';

// You can adjust these as you learn your sheet's columns.
export const PickSchema = z.object({
  id: z.string().min(1),
  result: z.enum(['PENDING', 'WIN', 'LOSS', 'PUSH']).default('PENDING'),
  picker: z.string().min(1).default('Par'),
  pickDate: z.string().min(1), // Date when pick was made
  gameDate: z.string().min(1).optional(), // Date when game is played (UTC string)
  name: z.string().min(1),
  sport: z.string().min(1),
  notes: z.string().min(1).default(''),
});

export type Pick = z.infer<typeof PickSchema>;