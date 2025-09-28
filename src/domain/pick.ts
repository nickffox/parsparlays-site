import { z } from 'zod';

// You can adjust these as you learn your sheet's columns.
export const PickSchema = z.object({
  id: z.string().min(1),                 // stable key (from sheet or generated)
  date: z.string().min(1),               // we'll refine to ISO later if needed
  sport: z.string().min(1),
  league: z.string().min(1),            // e.g., "NCAAF" | "NBA" | "NFL" | etc.
  teams: z.string().min(1),              // e.g., "OSU @ Michigan"
  betType: z.string().min(1),            // "ML" | "Spread" | "Total" | etc.
  odds: z.preprocess(n => (typeof n === 'string' ? Number(n) : n), z.number().finite()).optional(),
  stake: z.preprocess(n => (typeof n === 'string' ? Number(n) : n), z.number().finite()).optional(),
  status: z.enum(['PENDING', 'WIN', 'LOSS', 'PUSH']).default('PENDING'),
});

export type Pick = z.infer<typeof PickSchema>;
