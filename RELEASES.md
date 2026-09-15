# Releases

## 0.1.0-rc.9 · 2026-09-14

Refresh bilingual host/pairing UI, preserve history semantics and request-origin checks, harden gateway lifecycle, and update setup documentation.

Source: [`a84f302d30e4fa146672740475280512ae728d9d`](https://github.com/baixianger/dsh-network/commit/a84f302d30e4fa146672740475280512ae728d9d) · [`v0.1.0-rc.9`](https://github.com/baixianger/dsh-network/tree/v0.1.0-rc.9). Distribution: `latest`.

Release tags point at the exact source commit used to build the package. The bookkeeping commit that fills in a source SHA intentionally comes after that tag.

## Unreleased

- Drop the stale `@deepseek-ai/dsh-host-apiproxy` peer dependency. The package was
  removed upstream (deepseek-ai/deepseek-harness `4f00a8b82a`, "refactor(api):
  remove ApiProxy package") and no longer exists in any published version that
  satisfies the declared range. Keeping the declaration broke every install in a
  profile that contains this plugin: pnpm 11 dereferences the unresolvable peer as
  `undefined` and aborts with `Cannot convert undefined or null to object` inside
  `inheritedParentPkgBreaksPeerDiamond`. The `apiProxy` service was always consumed
  dynamically through `ctx.inject(["apiProxy"], …)` with a missing-service guard, so
  the runtime behavior is unchanged.

| Version | Tag | Source commit | Summary |
| --- | --- | --- | --- |
| 0.1.0-rc.8 | `v0.1.0-rc.8` | [`6f0074339c860eb6535d3ef59338f334ca47db34`](https://github.com/baixianger/dsh-network/commit/6f0074339c860eb6535d3ef59338f334ca47db34) | Bilingual user documentation, clearer setup and troubleshooting guidance, and tokenless GitHub OIDC publishing to `latest`. |
| 0.1.0-rc.7 | `v0.1.0-rc.7` | [`e3c1cb0c14160bf75e2749e32a3643f77d6ff75b`](https://github.com/baixianger/dsh-network/commit/e3c1cb0c14160bf75e2749e32a3643f77d6ff75b) | Atomic pairing/device state, one-use ticket concurrency, secure state permissions, LAN browser cookies, current history RPC name, configuration schema and public types. |
