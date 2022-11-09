import { readAll } from "https://deno.land/std@0.163.0/streams/conversion.ts";

// Read the entire console input into a string variable
const inputBuffer = await readAll(Deno.stdin);
const input = new TextDecoder().decode(inputBuffer);

// Capitalize the input and write it to the console
const output = input.toUpperCase();

console.log(output);