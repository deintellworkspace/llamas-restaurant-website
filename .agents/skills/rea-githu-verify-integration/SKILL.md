---
name: rea-githu-verify-integration
description: "Evaluate rea-githu/REA before any installation or website-tool integration. Trigger when this exact repository or its Windows download is proposed; inspect provenance and implementation, then enable only verified capabilities or route to official morluto/rea."
---
# Verify the rea-githu/REA integration

## Known inspection result
Treat this repository as unverified, not as an established alternative distribution of morluto/rea.
On 2026-10-15 its README claimed a Windows x64 REA distribution and version 6.3.0. The recursive tree contained small C++/header files; sampled agent/Skill.cpp and cli/Setup.cpp contained only a revision comment, filename and directory name. They did not implement the claimed functions. notes/USAGE.txt supplied minimal generic setup text.
These observations do not establish that a downloadable artifact is malicious; they also do not establish authenticity or working functionality. The official morluto/rea README explicitly directs users to its own repository, rea.tools and the linked npm package.

## Verification procedure
1. Resolve the exact owner/repository and record commit, metadata, release assets, source tree and relevant license. Reinspect current content; do not assume the dated findings remain unchanged.
2. Trace any claimed affiliation through links from the official upstream project. A copied README, similar name, license label or matching screenshot is not provenance.
3. Compare substantive source, package/build manifests, release process and tool contracts with upstream. Distinguish placeholders from implementations. Verify a release artifact against maintainer-published checksums or attestations where available; a checksum obtained from the same unverified distributor proves consistency, not identity.
4. Keep downloaded executables and installer scripts unexecuted while provenance is unresolved. Do not direct an agent to fetch and run an opaque Windows archive merely because the README recommends it.
5. If sufficient provenance and usable implementation are established, inspect dependencies and configuration changes, select a pinned version, and test one documented browser capability in an isolated project. Check that installed tools match the claimed release.
6. If evidence is insufficient, report the exact gap and use official morluto/rea for the website investigation. Do not install both to discover whether they are equivalent.
7. Preserve existing site code and agent configuration during evaluation. Do not request deployment secrets for repository provenance checks.

## Website role
Use this skill as an integration gate, not as a website generator or performance optimizer. Enable it only if this repository later offers a verified capability needed by the project. Prefer the official REA browser workflow for current investigation work.

## Output
Return repository revision, observed files, affiliation evidence, artifact verification status, supported capabilities actually demonstrated, and one disposition: verified for stated use, insufficient evidence, or unsuitable for the task.
Avoid asserting malware without evidence or inventing commands for absent functionality.

## Sources
https://github.com/rea-githu/REA
https://github.com/rea-githu/REA/blob/main/agent/Skill.cpp
https://github.com/rea-githu/REA/blob/main/cli/Setup.cpp
https://github.com/morluto/rea
