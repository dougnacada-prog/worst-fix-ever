// Worst Fix Ever: Funniest Commit Message
// Writes one commit message line (<=100 chars) to ENTRY_OUTPUT or /output/entry.txt.
// Gate (per RULES.txt): UTF-8 text of 1 to 100 characters, not only white space.
import { writeFileSync } from "node:fs";

const ENTRY = "fix: infinite loop; it now ends, along with the server";

function main(): void {
  // Gate: length 1..100 chars, single non-blank line, no leading/trailing
  // whitespace, no control characters.
  if (ENTRY.length < 1 || ENTRY.length > 100) {
    throw new Error(`entry length ${ENTRY.length} outside 1..100`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have leading/trailing whitespace");
  }
  for (let i = 0; i < ENTRY.length; i++) {
    const c = ENTRY.charCodeAt(i);
    if (c < 0x20 || c === 0x7f) {
      throw new Error(`control character at index ${i}`);
    }
  }
  const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
  writeFileSync(out, ENTRY, "utf8");
}

main();
