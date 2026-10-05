# VALMO Decision Studio

[Open the hosted prototype](https://Raghav-Bansal-15.github.io/valmo-prototype/) · [Portable offline demo](dist/valmo-demo.html)

Meesho DICE Stage 2 · NewGenLabs · IIT (BHU)

Interactive frontend for the NewGenLabs Meesho DICE prototype. Its design uses the provided PDF: sampled plum `#620555`, pink, warm yellow, white panels and pale blush backgrounds.

## Run

```sh
npm start
```

Open http://localhost:4187. No package installation is required. Node is the only runtime dependency. Alternatively, open `dist/valmo-demo.html` directly in a browser for the complete self-contained offline demo.

```sh
npm test
npm run build
```

## Judge walkthrough

1. Start the guided demo. Inspect the high-risk kurti order in AddressSense.
2. Preview and queue the synthetic WhatsApp nudge; confirm delivery on the phone preview. Try an address correction or hub mismatch too.
3. RiderTrust: load a genuine attempt and verify. Move GPS outside 500 m or call duration to 15 seconds to inspect the rejection case.
4. Reuse: verify the dinner-set parcel, select genuine refusal, seller permission and a parcel received at the destination hub. Choose a nearby buyer, send a simulated offer, accept it, re-dispatch, then record the delivery outcome. Medium fit requires explicit acceptance of the disclosed variant difference. Try a defect, unavailable buyer, low fit, refusal marking >24 hours, hold >7 days, or capacity >15% to see exceptions.
5. Intercept: inspect VAL-5519. Delhi demand selects ₹70 total / ₹100 saving. Disable Delhi and Jaipur wins at ₹83 / ₹87. Disable both for partial reverse at ₹129 / ₹41. Costs include ₹10 operations.
6. Impact: default match shares reproduce ₹64.30 expected net saving. Export the action log as JSON.

State persists in local browser storage. Reset Demo clears only this app’s saved synthetic run. Completed routing outcomes are idempotent. Reuse offers, consent, dispatch and outcomes persist per parcel; savings enter the run only after simulated successful delivery. Version 2 starts a fresh saved run so invalid version 1 parcel verification is not carried over.

## What is implemented

Six responsive screens; parcel selection and search; risk scenario display; hub-zone gate; phone confirmation preview; strict GPS + call verification; refusal triage; destination-hub intake, 24-hour marking, seller policy, quality, compatibility and capacity gates; staged offer, buyer consent, local dispatch and delivery outcomes; Delhi/Jaipur demand routing; full cost breakdowns; weighted economics; action trail; JSON export; guided demo; keyboard-accessible dialog; reduced-motion support.

## What is simulated

All orders, buyer identities, demand, telemetry, graph illustration and scores are synthetic. No messages are sent and no actual parcels are rerouted. The provided training ZIP has seven Python scripts, but no cleaned tables, graph artifacts or trained checkpoint. The current training script reports evaluation metrics but does not export a model checkpoint. This frontend therefore does **not** claim live GraphSAGE / DPHGNN inference or measured pilot performance.

`model-source/` preserves the provided training scripts for later integration. They were inspected, not executed; only trusted datasets should be loaded by their pickle/PyTorch readers.

## Design sequence

See `design/PROCESS.md` and `design/board.html` for the foundation and screen sequence. [Open the editable Paper file](https://app.paper.design/file/01M45N62H1HM7FX426JC4XPR56/p-1-0). Its 26 tokens, foundation artboard and overview were built incrementally and visually reviewed. AddressSense has its shell, heading, parcel selector and order context. Paper then reached the account's weekly MCP limit (reset in five days), so the remaining module artboards could not be completed. All six modules are complete in the runnable frontend; the local board preserves their screenshots and design rationale. The local implementation is not claimed to be a generated export of Paper.

## Model integration

Use `scoreOrder(order)` behind an adapter when artifacts are available. The response should include `probability`, `modelVersion`, `generatedAt`, `featureProvenance`, `coldStart`, and `availableSignals`. Replace sample scores only after prediction calibration and holdout validation. GraphSAGE in the supplied ZIP is a baseline; it is not the DPHGNN system cited in the deck. Graph proximity is not a causal explanation or an estimate of nudge treatment effect.

Real operations would consume separate commands: `queueNudge`, `verifyAttempt`, `requestAddressCorrection`, `confirmBuyer`, and `commitRoute`, with parcel-scoped idempotency keys and server-authoritative policy checks. A backend adds value once we have model artifacts or real integrations; a fake inference endpoint would add complexity without evidence.

## Submission packaging

Submission repository: https://github.com/Raghav-Bansal-15/valmo-prototype

GitHub Pages publishes `main` from the repository root. All app assets use relative paths, so the prototype works under `/valmo-prototype/`. Open the hosted prototype and select **Start guided demo**. **Reset demo** returns each browser to the same initial run. Actions are stored independently in each browser.

The original supplied files remain separate from this release.

## Reuse correction · v2

See `REUSE-V2.md` for the repaired flow and browser verification. Mid-mile routing and its screen are unchanged. The standalone build embeds a classic script with no module imports or external resources. Send the generated HTML rather than opening the source `index.html` without a server.
