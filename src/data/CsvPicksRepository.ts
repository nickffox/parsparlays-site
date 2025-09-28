import papa from 'papaparse';
import { PickSchema, type Pick } from '../domain/Pick';
import { PicksRepository } from './PicksRepository';
import { cache } from 'react';

export class CsvPicksRepository implements PicksRepository {
  constructor(private csvUrl: string) { }

  async getAll(): Promise<Pick[]> {
    if (!this.csvUrl) {
      throw new Error('CSV URL not configured (VITE_PICKS_CSV_URL)');
    }

    const res = await fetch(this.csvUrl, { cache: 'no-store' });
    
    if (!res.ok) throw new Error(`CSV fetch failed: ${res.status} ${res.statusText}`);
    const text = await res.text();

    const parsed = papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false, // we'll coerce manually for more control
    });

    if (parsed.errors.length) {
      const first = parsed.errors[0];
      throw new Error(`CSV parse error: ${first.message} @ row ${first.row ?? 'n/a'}`);
    }

    // TODO: Adjust these column names to YOUR sheet.
    const picks: Pick[] = [];
    for (const row of parsed.data) {
      const candidate = {
        id: row['ID'] || crypto.randomUUID(),
        date: row['Date'],
        sport: row['Sport'],
        league: row['League'],
        teams: row['Teams'],
        betType: row['Bet Type'],
        odds: coerceNumber(row['Odds']),
        stake: coerceNumber(row['Stake']),
        status: normalizeStatus(row['Status']),
      };

      const model = PickSchema.parse(candidate);
      picks.push(model);
    }

    return picks;
  }
}

function coerceNumber(v?: string) {
  if (v == null || v === '') return undefined;
  const n = Number(v.replace?.(/,/g, '') ?? v);
  return Number.isFinite(n) ? n : undefined;
}

function normalizeStatus(v?: string) {
  const s = (v ?? 'PENDING').trim().toUpperCase();
  return (['PENDING', 'WIN', 'LOSS', 'PUSH'] as const).includes(s as any) ? (s as any) : 'PENDING';
}