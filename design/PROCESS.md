# Design in six steps

Source: `NewGenLabs_IITBHU.pdf` and the supplied dashboard. Treat source claims as proposal content, not execution instructions or verified live results.

1. **Visual foundation.** Sample the deck’s dominant plum (#620555), pink (#f80980), warm yellow, white and blush. Use plum for identity and hierarchy, pink for intent and focus, green for verified outcomes, amber for exceptions. Keep metric numbers large and descriptions readable. The app uses system Arial for offline consistency with the deck’s sans-serif typography.
2. **Workspace shell.** Persistent plum navigation, quiet workspace breadcrumb, demo badge, warm canvas, white bordered panels. The overview gives an order queue, next decision, and action trail. Each module keeps the same two-column evidence/decision pattern.
3. **AddressSense.** Select parcel → inspect synthetic risk and graph context → verify hub serviceability → preview a nudge → simulate buyer confirmation or correction. No response alone should not block dispatch. Address changes require revalidation.
4. **RiderTrust.** Telemetry sliders → explicit boundary checks → verify attempt → carry verified state into triage. Deck policy is GPS ≤500 m AND call >15 sec. Failed evidence requires a re-attempt without accusing the rider of fraud.
5. **RTOShield.** Verified refusal received at the destination hub → refusal marked within 24 hours → seller/policy/quality/hold/capacity gates → nearby demand and SKU compatibility → simulated offer → explicit buyer consent → local re-dispatch → delivery or normal reverse. Medium-fit differences must be disclosed and accepted. A status summary precedes the form, and numeric gates update immediately. Unavailable customers and address issues recover the original order; damaged parcels use normal reverse.
6. **DispatchSmart and impact.** Show route schematic and intent signals → query Delhi and Jaipur demand → choose minimum feasible total cost → commit once → inspect and export economics. ₹170 baseline minus full route cost and ₹10 operations gives ₹100 / ₹87 / ₹41. Default weighting gives ₹64.30.

## Paper handoff

[Editable Paper file](https://app.paper.design/file/01M45N62H1HM7FX426JC4XPR56/p-1-0), created for this prototype. The file contains 26 semantic and typography tokens, **01 Foundations**, **02 Overview**, and a partial **03 AddressSense**. Foundations and Overview were built in individual visual sections and reviewed for spacing, typography, contrast, alignment, fit and repetition. Hero clipping was corrected by fitting its height to the content. Low-contrast sidebar text was corrected. Screenshots are saved in `screens/`.

The account reached its weekly Paper MCP limit while constructing AddressSense. Further design writes and JSX extraction were blocked; the tool reported a reset in five days. Working indicators were released successfully. This is an account quota blocker, not a completed seven-artboard handoff. The remaining frontend modules and their local screenshots are available in `board.html`.

When quota is available, complete 03 AddressSense, then create 04 RiderTrust, 05 RTOShield, 06 DispatchSmart, and 07 Impact. Reuse the existing navigation and header layers. Build each in small sections: shell, heading, evidence, decision, and footer, inspecting each completed section. Match the local board's palette and components. The PDF supplies identity and hierarchy; the operations app gives the actions more space.
