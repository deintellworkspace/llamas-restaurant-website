---
name: morluto-web-investigation
description: "Use official morluto/rea browser and JavaScript evidence workflows to investigate website behavior, scripts, resource loading and capture differences. Trigger when browser observation or authorized JavaScript analysis can explain a feature or migration discrepancy."
---
# Evidence-based website investigation with REA

## Setup and provenance
Use https://github.com/morluto/rea, https://rea.tools or the rea-agents npm package linked by those sources. Verify the chosen package version and documentation together. Do not infer authenticity from a similar repository name.
The upstream setup command is npx rea-agents setup. Resolve a reviewed version for repeatable execution, inspect proposed agent configuration changes, preserve backups, and restart the agent when required. A skill file alone does not install the server.
Read docs/browser-observation.md and the installed tool schemas. Use browser/JavaScript capabilities for website work; do not install native decompilers without a concrete need.

## Investigation
1. State one question, such as which event changes the navigation state or why an image request arrives late. Record target URL, revision where available, and expected user action.
2. Use a dedicated Chrome-family debugging profile with a loopback-only CDP endpoint. Restrict discovery to exact target origins. Keep session credentials out of captures and reports.
3. Discover targets with list_browser_targets, then capture baseline evidence with inspect_web_page. Record available DOM/accessibility/resource information and exclusions.
4. Use observe_web_session around a user action driven by a separate authorized browser controller or the user. The passive CDP surfaces do not themselves click, navigate or evaluate page scripts. Do not confuse observation with automation.
5. Capture matched viewport screenshots with capture_web_screenshot when needed. Use compare_web_captures and compare_web_screenshots for like-for-like evidence. Incomplete evidence is not proof of equivalence. Compare dynamic media separately using aligned frames and playback observations.
6. If behavior remains unexplained, inspect selected scripts with analyze_web_bundle. Read docs/website-script-export.md before exporting captured scripts. Analyze only the relevant authorized artifacts and keep inferred routes or endpoints labeled as candidates.
7. Separate observation, inference, limitation and implementation proposal. Implement a maintainable version in the target app only within the user's change scope. Confirm behavior using functional browser tests and render comparisons.
8. Export a sanitized evidence bundle if needed; inspect it for credentials, personal data and unrelated origins before sharing.

## Performance boundary
Use Chrome performance traces or the project's browser runner for main-thread layout and page vitals. REA evidence can support a diagnosis but does not automatically prove causality or replace performance measurement.

## Fallback
If REA/CDP is unavailable, use accessible browser observations and source inspection, explicitly marking missing evidence. If the MCP package lacks a tool documented on main, consult its release documentation rather than inventing a call.

## Output
Return the exact question, tool/package revision, target and scope, evidence identifiers, observed behavior, uncertainty, a minimal implementation proposal and validation results. Claim only what the captured evidence establishes.

## Sources
https://github.com/morluto/rea
https://github.com/morluto/rea/blob/main/docs/browser-observation.md
Inspected on 2026-10-15. Revalidate capabilities against the installed release.
