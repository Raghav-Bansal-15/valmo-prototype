# Reuse correction · version 2

The reported screenshot selected a pre-dispatch parcel while showing a verified failed delivery. The old flow also allowed “customer unavailable” to override a quality exclusion. Both cases were reproduced before correction. The brother’s exact failure report remained unspecified.

## Correct demo sequence

1. Open Reuse. It defaults to VAL-8842; only delivery-attempt parcels are listed.
2. Open RiderTrust, load a genuine attempt, verify, and continue to triage.
3. Use genuine refusal, destination-hub intake, marking within 24 hours, seller opt-in and permitted policy. Leave quality exclusion off, hold at 2 days and capacity at 9%.
4. Select a nearby synthetic buyer. High fit can receive an offer. Medium fit requires explicit consent to the disclosed variant difference. Low fit cannot receive an offer.
5. Send an offer, simulate buyer acceptance, re-dispatch, and simulate delivery. Each is a separate action. The completed delivery records the conservative ₹130 planning benefit once.
6. A failed rematch goes to normal reverse without a successful-delivery benefit. Editing a parcel’s rules before dispatch invalidates its previous offer and consent.

## Exceptions

Quality, customised-item and hygiene exclusions take precedence. An unavailable original buyer gets rescheduling; an address failure gets landmark recovery. Missing seller opt-in, restricted policy, late refusal marking, more than seven hold days or more than 15% hub capacity keep the parcel out of reuse. Numeric inputs update the displayed route immediately. Gate decisions remain visible in the form as well as the summary above it.

## Verification

13 automated tests pass. Browser checks exercised the quality/unavailable combination, successful high-fit flow, medium-fit consent, low-fit rejection, seller-policy override, offer invalidation, hub intake, marking time, hold/capacity limits, failed rematch, persistence and deferred savings. Reuse had no horizontal page overflow at 800 px and 390 px. Browser error logs were empty. Mid-mile engine and screen were compared with the original package and are unchanged.

All data, evidence, buyer responses and delivery outcomes are synthetic. Economics are proposal assumptions. The app is frontend-only and does not send messages or run model inference.
