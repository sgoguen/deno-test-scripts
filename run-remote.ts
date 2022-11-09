import { readAll } from "https://deno.land/std@0.163.0/streams/conversion.ts";

// const sourceUrl = 'https://raw.githubusercontent.com/sgoguen/deno-test-scripts/main/capitalize-input.ts';

// Get the first argument
const scriptPath = Deno.args[0];

// If the script path is not provided, exit asking the user for a URL
if (!scriptPath) {
    console.log('Please provide a script path');
    Deno.exit(1);
}

const sourceUrl = scriptPath;

//  Get the filename from the URL
const filename = sourceUrl.split('/').pop();

//  Make sure a download directory exists
const downloadDir = './downloads';
await Deno.mkdir(downloadDir, { recursive: true });

//  Download the script into a downloaded directory
const downloadPath = `${downloadDir}/${filename}`;
const downloadFile = await Deno.create(downloadPath);



const downloadResponse = await fetch(sourceUrl);
downloadResponse.body?.pipeTo(downloadFile.writable);

console.log(`Downloaded ${sourceUrl} to ${downloadPath}`);

// Create a new process to run the script in the downloaded directory, but provide ZERO access
const process = Deno.run({
    cmd: [
        'deno',
        'run',
        downloadPath
    ],
    stdin: 'piped',
    stdout: 'piped',
});

//  Write the input to the process
const input = 'Hello, World!';
await process.stdin?.write(new TextEncoder().encode(input));
process.stdin?.close();

//  Read the output from the process
const outputBuffer = await readAll(process.stdout);
const output = new TextDecoder().decode(outputBuffer);

//  Print the output
console.log(output);

