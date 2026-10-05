# Prototype handoff

Use `dist/valmo-demo.html` for a portable demo, or run `npm start` and open http://localhost:4187. Use the modular source for the team's GitHub repository and static hosting. Repository target: https://github.com/Raghav-Bansal-15/valmo-prototype

Hosted demo target: https://Raghav-Bansal-15.github.io/valmo-prototype/

The repository and hosted demo are the submission links after deployment verification. No hackathon portal submission is performed by this project.

## Two-minute demonstration

- **Problem:** A refusal should not automatically trigger the most expensive return path. VALMO connects buyer intent, address serviceability, attempt evidence and local demand.
- **Prevent:** Open AddressSense. Show a high-risk COD order and the confirmation preview. Queue the demo nudge and confirm the buyer's response. Explain that silence proceeds normally and address changes require validation.
- **Recover:** Open RiderTrust, select the dinner-set order, load a genuine attempt and verify it. Show both rules: within 500 metres and contact longer than 15 seconds.
- **Reuse:** Continue to triage. A verified genuine refusal at the destination hub can enter the reuse pool. Choose a compatible buyer, send an offer, accept it, re-dispatch, and record delivery. Medium-fit variant differences need explicit consent. Toggle quality exclusion to show normal reverse logistics.
- **Intercept:** Open Mid-mile Intercept and select VAL-5519. Compare Delhi, Jaipur and no-demand outcomes: ₹100, ₹87 and ₹41 net savings, including operations.
- **Impact:** Show ₹64.30 weighted planning savings and export the traceable run.

## What to say precisely

The workflows and policy engine work in the browser. Orders, risk scores, telemetry, demand and message integrations are synthetic. The training ZIP supplies a GraphSAGE baseline but no datasets, graph artifacts or checkpoint, so inference is not live. Pilot targets in the deck are proposal assumptions.

The prototype uses the deck's colors and hierarchy. Paper contains the editable foundation and overview plus partial AddressSense; the remaining Paper artboards were blocked by the account's weekly MCP quota. All six screens run in the frontend.

## Verification

Thirteen policy and workflow tests passed, covering verification boundaries, recovery/reuse gates, SKU-derived buyer compatibility, consent, ordered journey transitions, route economics, weighting and duplicate-action protection. Browser checks exercised the core journey and its exception states. The mobile overview had no page overflow at 390 px; the rebuilt reuse page has no horizontal page overflow at 800 px or 390 px, and its routing summary appears before the form. The generated single-file JavaScript passed syntax validation and contains no external resources. Direct `file:` navigation was blocked by the browser tool's protocol policy, so direct file opening was not verified through that tool.

For the v2 handoff, use `VALMO Prototype v2.html` for the offline demo and `VALMO Full Project v2.zip` for source submission. The full project includes `dist/valmo-demo.html`. Extract the ZIP, then upload the contents of `valmo-prototype/` to the repository root for static hosting. Download the HTML attachment and open it in a browser; a WhatsApp attachment preview does not run the interactive workflow.
