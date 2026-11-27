// The visible "Updated" date of a family page, from src/data/pages.json (pageDate), in the
// format every Health interior template already prints: "October 2026" (month and year, UTC).
import { pageDate } from '../lib/live';

export function updatedLabel(path: string): string | undefined {
  const d = pageDate(path);
  return d ? new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : undefined;
}
