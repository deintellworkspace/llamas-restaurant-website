---
name: jcodesmore-website-fidelity
description: "Reconstruct or audit an authorized website using JCodesMore/ai-website-cloner-template workflows. Use for platform migrations, responsive fidelity checks, reference-site benchmarking, and repairing visual or interaction drift in existing websites."
---
# Website fidelity and reference benchmarking

## Inputs and scope
Resolve the target repository, branch, source URLs, destination routes, asset ownership, and requested mode from the session. Choose fidelity migration when the user wants the same site; choose benchmark analysis when a reference is inspiration. Do not interpret a benchmark URL as permission to replace an existing design.

Keep this skill portable across agents. Discover browser, shell and file capabilities before using them. Reading this file does not install an MCP server, browser or template.

## Workflow
1. Inspect repository instructions, package scripts, lockfiles, route structure and existing work. Record the starting commit and dirty files. Use the existing framework for an established site; do not overlay template files or dependencies.
2. Inspect the reference at matched desktop and phone viewports. Record section order, type metrics, image crops, breakpoints, primary actions, focus states, loading states and motion. Exercise scroll, touch, pointer and keyboard behavior. If rendered browser access is unavailable, label findings as document inspection and leave visual claims unverified.
3. Build a route/state inventory and asset manifest. For an owned-site migration, preserve source media and record checksums, dimensions and content types. For a third-party benchmark, derive usability criteria and use the destination's own branding, text and licensed media.
4. Implement the smallest coherent change in isolated feature work. Preserve fonts, global resets, aspect ratios and responsive behavior. Distinguish time-driven, scroll-driven and interaction-driven animation. Make every promised control functional.
5. Compare rendered output at identical viewport, scroll, state and font readiness. Freeze dynamic media at a documented frame for still comparisons, then test playback separately. Check full-page geometry and below-fold sections; a passing functional suite does not prove visual fidelity.
6. Run the actual repository's build and relevant checks. Use npm run check only when that script exists; it is a template command, not a universal requirement. Preserve test thresholds. Verify keyboard navigation, reduced motion, media fallback, mobile overflow and all affected routes.
7. Report tested commit, preview, differences, evidence and remaining gaps. Never claim pixel identity without matched captures and an explicit comparison tolerance.

## Fresh-project route
Only for a requested new project, inspect the upstream README, package.json and canonical .agents/skills/clone-website/SKILL.md at a recorded revision. Create an isolated destination and adopt its verified setup instructions. Avoid changing remotes on an existing client repository.

## Deliverables
Return a route/state map, asset provenance, a short implementation diff summary, desktop/phone comparison evidence, checks run and unresolved differences. Keep reference-site experiments separate from production changes.

## Source
https://github.com/JCodesMore/ai-website-cloner-template
Inspected README and canonical skill on 2026-10-15. Refresh commands and prerequisites against the chosen revision before execution. These are independently authored workflow instructions; preserve upstream license notices if copying upstream code.
