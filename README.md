# Deno Test Scripts

These are simple Deno test scripts to quickly demonstrate how the Deno runtime
prevents processes from accessing the outside world.

## A Good Example - Capitalizing Input

Deno allows programs to read from standard input and write to standard output.

```bash
echo 'Hello' | deno run capitalize-input.ts
```