---
name: inventer-network-diagnostics
description: "Use inventer-dev/mcp-internet-speed-test to characterize the runner's network during website investigations. Trigger for bandwidth, latency, jitter, CDN-header checks or separating connection variability from page-rendering failures; do not substitute it for Core Web Vitals measurement."
---
# Network context for website performance

## Establish the measurement boundary
Record runner location, host, time, VPN/proxy, tool version and endpoints. A cloud agent measures its own connection, not the user's home connection. Internet throughput is not LCP, browser rendering time or Vercel server performance.

## Setup
Inspect upstream pyproject.toml, lockfile and mcp_internet_speed_test/main.py at a recorded revision. The inspected README requires Python 3.12+. Install in an isolated environment, resolve and pin the chosen release, and register its mcp-internet-speed-test executable using the active agent's documented MCP configuration. Preserve existing configuration.
Discover exposed tool schemas after connection. Treat examples below as names and known parameters to verify, not an assumed tool binding.

## Run a bounded investigation
1. Confirm endpoint reachability and HTTP success before trusting throughput. The inspected implementation does not call raise_for_status; an error body can therefore contaminate measurements. Check expected payload and status with a separate HTTP probe where necessary.
2. Start with measure_latency and measure_jitter. Record samples, minimum/variation, endpoint and errors. HTTP round-trip measurements include server and protocol overhead; do not describe them as pure ICMP ping.
3. If bandwidth is relevant, use measure_download_speed with a modest size_limit such as 8MB and sustain_time of 2. This is a quick diagnostic, not a saturated-link certification. Increase only when needed. The inspected download source is GitHub LFS test files; the function has no target-website URL parameter.
4. Use measure_upload_speed only when upload performance matters. Send synthetic data to the verified test service, never project files or secrets. Avoid running throughput tests concurrently with page benchmarks.
5. Use get_server_info with its actual url_download, url_upload and url_latency parameters. Check all endpoints it will contact. Treat provider/location identification as header-based inference and unknown values as unknown; do not assume its CDN detection supports Vercel.
6. Use run_complete_test only when all measurements are needed. Record the size budget, duration and external endpoints first.
7. Report raw units faithfully. The inspected source labels values Mbps while calculating bytes*8/(1024*1024)/seconds. Note this binary divisor or convert to decimal Mbps explicitly when comparing tools.

## Connect results to browser evidence
Measure browser LCP, FCP, CLS, request timing, font readiness and long layout tasks separately with the project's browser runner or performance trace. Repeat at least three comparable runs when investigating variability; retain every result and report median plus range, cold/warm state and throttling.
Hold browser version, CPU/network throttle, viewport, commit and authentication method constant. If testing request-interception overhead, label the alternate authentication run as a control.
Do not lower acceptance thresholds, blame the network solely from a speed-test result, or claim an optimization based on this tool alone.

## Output
Return runner context, tool revision, endpoints/status, sample results, unit caveats, uncertainty and the next browser measurement that can distinguish causes.

## Source
https://github.com/inventer-dev/mcp-internet-speed-test
Inspected README and mcp_internet_speed_test/main.py on 2026-10-15. Recheck schema and implementation before execution.
