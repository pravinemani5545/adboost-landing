---
title: "Healthcare Incrementality: Are Your Ads Actually Creating New Patients?"
seoTitle: "Healthcare Incrementality | AdBoost Health"
description: "Find out how incrementality can help healthcare marketers understand whether advertising is actually generating new patients or claiming existing demand."
pubDate: 2026-11-12
tags: ["incrementality", "measurement", "paid media"]
heroImage: "/blog/healthcare-incrementality.webp"
heroAlt: "AdBoost Health brand graphic: healthcare incrementality and whether ads create new patients, with an incremental lift test results card"
ctaHeading: "Find out which of your patients your ads actually created."
ctaText: "Book a free 30-minute call. We review your channel mix, pick the first holdout test worth running, and send you a written test plan either way."
---

Every health brand has a campaign that looks too good to question. Branded search at a 9x return. Retargeting that "drives" a third of all bookings. A Meta campaign whose attributed patients climb every time you raise the budget. The uncomfortable question none of those dashboards can answer is the simplest one: how many of those patients would have booked anyway?

That question is incrementality. Attribution tells you which touchpoint gets credit for a patient. Incrementality tells you whether the ad caused the patient at all. In healthcare, where a large share of demand already exists before any ad runs (referrals, insurance directories, word of mouth, people searching a clinic they already know), the gap between the two can decide whether a channel deserves more budget or none.

This post is the practical guide: what healthcare incrementality means, why health brands are especially exposed to "claimed" demand, how to design a test that a clinic or telehealth brand can actually run, how to read the result, and how to turn it into budget decisions. If you want the broader measurement picture first, start with our guide to [healthcare marketing attribution](/blog/healthcare-marketing-attribution/).

## What is incrementality in healthcare marketing?

Incrementality is the number of new patients your advertising caused, measured against what would have happened without it. It is found by comparing a group exposed to your ads with a comparable group that was not, and treating the difference as the true effect.

The definition sounds academic, but the question behind it is commercial. A booked consult that would have happened with or without your ad is not a return on that ad. It is a cost you paid to be present at a decision the patient had already made. Our [glossary entry on incrementality](/glossary/incrementality/) has the short version of the formula: incremental lift equals conversions in the exposed group minus conversions in a matched holdout.

Two terms you will see throughout:

- **Incremental patients**: new patients who exist only because the ad ran.
- **Incremental CAC (iCAC)**: spend divided by incremental patients, rather than by every patient the platform claimed. This is the cost that actually matters when you decide where the next dollar goes, and it is always equal to or higher than reported CAC.

## Why are healthcare ads so likely to claim existing demand?

Because so much healthcare demand is created outside of paid media and then passes through it on the way to booking. Ads sit at the last step of journeys they did not start.

A few patterns make health brands especially exposed:

- **Referral and directory demand.** A patient referred by their physician, or who found you in an insurer's provider directory, will often search your name before booking. Branded search catches them and claims the patient.
- **Existing patients and returning visits.** Unless new-patient conversions are separated cleanly, campaigns quietly get credit for follow-ups, refills, and returning patients who were never acquisition opportunities.
- **Retargeting the already decided.** Retargeting audiences are made of people who already visited your site. Many were mid-journey and on their way to booking regardless.
- **Seasonal and news-driven demand.** Open enrollment, the start of the year, or a wave of coverage about a new treatment can lift bookings on their own. Ads running during the spike absorb the credit for it.
- **Offline conversions.** A large share of healthcare conversions happen on the phone. When a platform models a conversion it cannot see, it tends to credit itself.

None of this means paid media does not work in healthcare. It means platform numbers mix patients the ad created with patients it merely touched, and only the first kind should set your budget.

## How is incrementality different from attribution and MMM?

Attribution splits credit among touchpoints, incrementality testing measures causation with an experiment, and marketing mix modeling (MMM) estimates causation statistically across all channels over time. They answer different questions and work best together.

| Method | Question it answers | Strength | Weakness |
|---|---|---|---|
| Attribution | Which touchpoint gets credit? | Fast, granular, daily | Measures correlation, not causation |
| Incrementality test | Did this spend cause new patients? | Closest thing to ground truth | One channel or campaign at a time |
| Marketing mix model | How does each channel contribute over time? | Covers the whole budget, no user-level data | Needs history and calibration |

MMM has become far more accessible. Google made [Meridian, its open-source marketing mix model](https://blog.google/products/ads-commerce/meridian-marketing-mix-model-open-to-everyone/), available to all marketers in January 2025, and Meta maintains its own open-source MMM package, [Robyn](https://facebookexperimental.github.io/Robyn/). Both work from aggregated data rather than user-level tracking, which suits health brands that should not be sending sensitive data to ad platforms in the first place. The catch is that an MMM is only as trustworthy as the experiments used to calibrate it, which brings us back to running real tests.

For the tracking side of the stack (PHI-safe server-side events, call tracking, and post-booking surveys), see our [telehealth attribution and server-side tracking guide](/blog/telehealth-attribution-server-side-tracking/).

## What incrementality tests can a health brand actually run?

There are three practical designs: geo holdouts you run yourself, platform conversion lift studies, and budget on/off or spend-step tests. Pick based on spend level, how local your business is, and how much you trust the platform to grade its own work.

### Geo holdout tests

You split markets into matched groups, turn a channel off (or down) in the holdout markets, keep it running in the test markets, and compare new-patient volume. Geo tests are the most natural fit for healthcare because so many businesses are already geographic: clinics with service areas, multi-location groups, and telehealth brands licensed state by state.

What makes them work:

- **Matched markets.** Pick holdout and test regions with similar historical new-patient trends, similar seasonality, and similar share of total volume. Comparing one large metro to one rural county tells you nothing.
- **A long enough window.** Healthcare decisions take longer than a typical ecommerce purchase. Run long enough to cover your normal consideration cycle plus a buffer, usually several weeks rather than several days.
- **Measurement in your own system.** Count new patients from your EHR, practice-management system, or CRM, not from the ad platform. The platform is the thing being tested.

### Platform conversion lift studies

Meta and Google both offer lift studies that randomly withhold ads from a holdout audience and compare conversion rates. Meta reports the result as [conversion lift percent](https://www.facebook.com/business/help/673450219767299), the increase in conversions among people exposed to ads versus the estimated conversions without them. On Google, the barrier to entry dropped sharply: Google says experiments that [once might have cost upwards of $100,000 can now be run for $5,000](https://support.google.com/google-ads/answer/16719772?hl=en), and its [user-based Conversion Lift setup guide](https://support.google.com/google-ads/answer/12005564?hl=en) covers eligibility and configuration.

Two cautions for health advertisers. First, lift studies need conversion signal, and health brands often send deliberately limited, PHI-filtered events to platforms, which can make studies slow to reach a conclusive read. Second, the platform is grading itself. Use lift studies for fast directional answers, and confirm the big budget calls with a test measured in your own data.

### On/off and spend-step tests

The simplest design: pause or sharply cut a campaign for a defined period, then compare total new patients and [blended CAC](/glossary/blended-cac/) against the periods before and after. It is cheap but the weakest design, because anything else that changes in the window (seasonality, a competitor, a news cycle) contaminates the result. Treat the answer as a strong hint, not a verdict.

## How do you design a healthcare incrementality test that holds up?

Write the plan before you touch the budget: one hypothesis, one primary metric measured in your own system, matched groups, a fixed duration, and a decision rule agreed in advance. A test without a pre-agreed decision rule usually ends in an argument rather than a budget change.

A workable checklist:

1. **Choose the highest-stakes, most-suspect spend first.** Branded search and retargeting are the usual starting points, because they mostly reach people already close to booking. A large prospecting campaign that dominates the budget is the next candidate.
2. **Define the outcome as a new patient, not a lead.** A form fill or a booked consult that no-shows is not a patient. If your intake has drop-off, measure at completed intake or first visit, using your own records.
3. **Separate new from existing patients.** If returning patients sit in the same conversion count, the test will mostly measure your existing patient base.
4. **Control for capacity.** This is the healthcare-specific trap. If your providers are fully booked, an ad cannot create additional patients no matter how good it is, and the test will read as zero lift. Test when there is real open capacity, or measure demand (booking requests, waitlist sign-ups) alongside booked visits.
5. **Count phone bookings.** Use call tracking on marketing pages, so calls in holdout and test regions are captured. Keep any vendor that touches patient information under a business associate agreement, and keep health context out of anything shared with ad platforms.
6. **Fix the window and do not peek.** Decide the duration up front, and do not stop early because the first week looks dramatic. Early reads in small healthcare samples swing wildly.
7. **Write the decision rule.** For example (illustrative): "If incremental CAC comes in above our allowable CAC, we cut this campaign by half and retest next quarter."

If your volume is very small, be honest about it. A single clinic seeing a modest number of new patients a month may not have the sample size for a statistically clean answer. In that case, lean on longer windows, on/off tests, post-booking surveys, and blended metrics, and save formal geo tests for when volume supports them.

## How do you read the results of an incrementality test?

Translate the lift into incremental patients, then into incremental CAC, then compare that number with what a patient is worth to you. Lift percentages are interesting; incremental CAC is what changes the budget.

Here is a worked example with round numbers that are purely illustrative, not benchmarks. A telehealth brand spends $20,000 a month on branded search. The platform reports 400 patients from it, a $50 reported CAC that looks spectacular. The brand runs a geo holdout and finds that in markets where branded search was paused, new-patient volume fell by an amount equivalent to 80 patients a month across the full footprint.

| Metric | Platform view | Incremental view |
|---|---|---|
| Spend | $20,000 | $20,000 |
| Patients | 400 claimed | 80 caused |
| CAC | $50 | $250 |

The campaign did not stop working. Most of its patients were simply coming anyway, through organic results, directories, and referrals. Whether $250 is acceptable depends on the fully loaded [patient acquisition cost](/blog/patient-acquisition-cost/) you can afford given lifetime value and payback. It may still be worth keeping at a lower budget to protect your name from competitors bidding on it. It is just not a $50 channel.

The reverse happens too: upper-funnel video or social can look weak in the platform and then show real lift when holdout markets lose new patients.

## What should you do with incrementality results?

Reprice channels on incremental CAC, move budget toward the spend that creates patients, and retest on a schedule, because incrementality changes as budgets, competition, and seasons change.

Practical steps after a clean read:

- **Apply a correction factor.** If a test shows a campaign's true contribution is a fraction of what the platform claims, keep using the platform for day-to-day optimization but discount its reported results by that factor when making budget decisions.
- **Shift budget at the margin.** Move dollars gradually from low-lift spend to channels that showed real lift, and watch blended CAC and total new patients, not platform ROAS, as you do.
- **Separate brand and non-brand in reporting.** Branded search should not be in the same line as demand-creating channels. Our [Google Ads strategy for telehealth](/blog/google-ads-telehealth-strategy/) covers how to structure that split.
- **Feed results into your KPI set.** Incremental CAC belongs next to blended CAC and payback in the numbers leadership reviews. Our guide to [healthcare marketing KPIs](/blog/healthcare-marketing-kpis/) shows where it fits.
- **Retest on a cadence.** A result from last spring does not describe this winter. A small number of clean tests a year, rotating through your largest channels, is enough for most health brands.

## What are the most common incrementality mistakes in healthcare?

Most failed tests fail on design, not math. Beyond testing at full capacity and measuring in the platform, watch for:

- **Contaminated holdouts.** Running a launch, a promotion, or a press push in only one group during the test.
- **Too short a window.** Ending before the typical patient has had time to decide understates lift for anything above the bottom of the funnel.
- **Holding out the wrong things.** Pausing promotional spend is fine. Withholding information patients need for care, such as service availability or safety messaging, is not a test you should run.

## The bottom line on healthcare incrementality

Attribution tells you who touched the patient. Incrementality tells you who created the patient. For health brands with strong referral, directory, and brand demand, those two answers can be very far apart, and the budget follows whichever one you trust. A handful of well-designed tests a year, measured in your own patient records and read as incremental CAC, will tell you more about where to spend than any dashboard.

If you want help deciding which test to run first and how to set it up without compromising patient privacy, [book a free 30-minute strategy call](https://cal.com/pira-ahilan-ef2dl8/strategy-call): we will review your channel mix and send you a written test plan whether we work together or not.
