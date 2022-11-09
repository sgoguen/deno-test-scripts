//  This is a simple application that violates the run policy by trying to use the network

const sourceUrl = 'https://www.google.com';

const downloadResponse = await fetch(sourceUrl);
const buffer = await downloadResponse.arrayBuffer();

// Show the byte count
console.log(`Status code ${downloadResponse.status} for ${sourceUrl} (${buffer.byteLength} bytes)`);