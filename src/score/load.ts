import { validateScore, type ValidationResult } from './validate';

/** Which group a state is listed under. */
export type ScoreCategory = 'psychological' | 'physical';

export interface ScoreIndexEntry {
  id: string;
  title: string;
  file: string;
  /** Missing on older lists; treated as psychological. */
  category?: ScoreCategory;
  /** False until the state's claims have been checked against its sources. */
  reviewed: boolean;
  /** How and when it was checked; shown in the claims sheet. */
  reviewNote?: string;
}

const base = import.meta.env?.BASE_URL ?? './';

export async function loadScoreIndex(fetchFn: typeof fetch = fetch): Promise<ScoreIndexEntry[]> {
  const response = await fetchFn(`${base}scores/index.json`);
  if (!response.ok) throw new Error('Could not load the list of states.');
  return (await response.json()) as ScoreIndexEntry[];
}

/**
 * Fetch and check one score file. Never throws: a failed download, broken JSON
 * and an invalid score all come back as a list of readable errors.
 */
export async function loadScore(
  file: string,
  regionNames: Set<string>,
  fetchFn: typeof fetch = fetch,
): Promise<ValidationResult> {
  let text: string;
  try {
    const response = await fetchFn(`${base}scores/${file}`);
    if (!response.ok) return { ok: false, errors: [`${file}: could not load (status ${response.status})`] };
    text = await response.text();
  } catch {
    return { ok: false, errors: [`${file}: could not load (no response)`] };
  }
  // Some servers answer a missing file with their home page instead of an error.
  if (text.trimStart().startsWith('<')) return { ok: false, errors: [`${file}: could not load (file not found)`] };
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, errors: [`${file}: not valid JSON`] };
  }
  return validateScore(raw, regionNames);
}
