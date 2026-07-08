// Ad-platform compliance matrix — sourced from Meta/Google/TikTok ad policies +
// FTC/FDA/LegitScript (2026). Policies change constantly and enforcement is
// tightening (35+ state AGs pressured Meta on GLP-1 ads Dec 2025; FDA DTC
// crackdown Sept 2025). Treat every cell as "verify against live policy".

export type Status = 'allowed' | 'restricted' | 'cert' | 'prohibited';

export interface ComplianceCell {
  platform: 'Meta' | 'Google' | 'TikTok';
  status: Status;
  rule: string;
}

export interface ComplianceRow {
  vertical: string;
  cells: ComplianceCell[];
}

export const STATUS_LABEL: Record<Status, string> = {
  allowed: 'Allowed (with conditions)',
  restricted: 'Restricted',
  cert: 'Requires certification',
  prohibited: 'Prohibited',
};

export const COMPLIANCE_MATRIX: ComplianceRow[] = [
  {
    vertical: 'GLP-1 / weight loss',
    cells: [
      { platform: 'Meta', status: 'cert', rule: 'Naming the Rx needs LegitScript + Meta authorization, US/CA/NZ, 18+. No before/after or “lose X lbs”; no negative self-perception.' },
      { platform: 'Google', status: 'cert', rule: 'Drug-term promotion only in US/CA/NZ; keyword-targeting drug names needs certification. No “natural Ozempic” equivalence; hCG prohibited.' },
      { platform: 'TikTok', status: 'prohibited', rule: 'Banned for paid ads in US/CA/UK/EU. Products with “GLP” in the name are not permitted. Use for brand awareness only.' },
    ],
  },
  {
    vertical: 'Supplements / DTC',
    cells: [
      { platform: 'Meta', status: 'restricted', rule: 'Allowed with structure/function language only. No disease/cure claims; banned ingredients (steroids, ephedra, HGH, DHEA) prohibited.' },
      { platform: 'Google', status: 'restricted', rule: 'Allowed if compliant. No disease claims or drug-equivalence names; ephedra, hCG, DMAA, prohormones prohibited.' },
      { platform: 'TikTok', status: 'cert', rule: 'Pre-authorization in Ads Manager with cGMP cert + Supplement Facts. Any weight-loss/muscle/sexual/mental-health claim converts to prohibited.' },
    ],
  },
  {
    vertical: 'Telehealth / Rx',
    cells: [
      { platform: 'Meta', status: 'cert', rule: 'LegitScript + Meta authorization required to promote Rx; US/CA/NZ, 18+, consult disclaimer. Educational non-drug creative needs no authorization.' },
      { platform: 'Google', status: 'cert', rule: 'LegitScript → Google Prescription drug services certification. No “buy without prescription” path. Manufacturer track is separate.' },
      { platform: 'TikTok', status: 'prohibited', rule: 'Consumer Rx promotion prohibited in most markets; narrow market exceptions conflict across TikTok’s own docs. Verify per market.' },
    ],
  },
  {
    vertical: 'TRT / hormone',
    cells: [
      { platform: 'Meta', status: 'cert', rule: 'Falls under Prescription Drugs + Unsafe Substances (anabolic steroids/HGH prohibited outright). Cert to name the Rx; no “low T?” targeting or before/after.' },
      { platform: 'Google', status: 'cert', rule: 'Among the most-disapproved categories. Prescribing needs LegitScript + Google cert; “testosterone” triggers restricted drug terms. No enhancement claims.' },
      { platform: 'TikTok', status: 'prohibited', rule: 'Effectively unavailable for hormone Rx promotion; treat as brand-awareness only.' },
    ],
  },
  {
    vertical: 'Med spa / aesthetics',
    cells: [
      { platform: 'Meta', status: 'restricted', rule: 'Allowed with 18+ age-gate. No before/after side-by-sides for wrinkle/anti-aging or body-contouring; no insecurity-exploiting copy. Single “after” shots allowed.' },
      { platform: 'Google', status: 'allowed', rule: 'Allowed; high-intent local keywords are expensive. Weight-loss-injection offers cross into GLP-1 cert rules.' },
      { platform: 'TikTok', status: 'restricted', rule: 'Aesthetic/procedure ads restricted and market-dependent; no before/after or body-shaming.' },
    ],
  },
];

// Cross-cutting regulatory backdrop (drives every platform rule).
export const REG_BACKDROP = [
  { h: 'FTC substantiation', p: 'Health-benefit claims need “competent and reliable scientific evidence” — often RCT-level for strong wording. “Results not typical” disclaimers do not cure a misleading typical-result implication.' },
  { h: 'FTC Endorsement Guides (2023)', p: 'Material connections must be disclosed clearly; fake or manipulated reviews are prohibited, and agencies can be held liable.' },
  { h: 'FDA structure/function (DSHEA)', p: 'Supplements may support body function but may not claim to diagnose, treat, cure, or prevent disease — and must carry the FDA disclaimer.' },
  { h: 'Compounded GLP-1', p: 'With the FDA shortage resolved (semaglutide Feb 2025), mass-compounding is largely unlawful and cannot be marketed as equivalent to the branded drug — why platforms treat it as high-risk.' },
  { h: 'TRT as a controlled substance', p: 'Testosterone is Schedule III; platforms treat online TRT clinics like online pharmacies, so LegitScript is effectively required.' },
  { h: 'LegitScript', p: 'Required by Google, Meta, Bing, and TikTok for permitted Rx categories. Process runs ~4–8 weeks with licensing and ownership review.' },
];
