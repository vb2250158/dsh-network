import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { setupModeForChoice } from "../lib/cli.js";

const execFileAsync = promisify(execFile);

test("maps interactive setup choices to explicit connection modes", () => {
  assert.equal(setupModeForChoice("1"), "lan");
  assert.equal(setupModeForChoice(" 2 "), "tailscale");
  assert.equal(setupModeForChoice("3"), "custom");
  assert.equal(setupModeForChoice(""), undefined);
  assert.equal(setupModeForChoice("4"), undefined);
});

test("runs when invoked through a package-manager bin link", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "dsh-network-cli-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const executable = process.platform === "win32"
    ? join(directory, "linked-lib", "cli.js")
    : join(directory, "dsh-network");
  if (process.platform === "win32") {
    await symlink(fileURLToPath(new URL("../lib/", import.meta.url)), join(directory, "linked-lib"), "junction");
  } else {
    await symlink(new URL("../lib/cli.js", import.meta.url), executable);
  }
  const { stdout } = await execFileAsync(process.execPath, [executable, "status"], {
    env: { ...process.env, DSH_HOME: join(directory, "dsh-home") },
  });
  const status = JSON.parse(stdout);
  assert.equal(typeof status.hostId, "string");
  assert.equal(status.pairedDevices, 0);
});
