#!/usr/bin/node
if (process.argv.length <= 2) {
    console.log("Missing size");
    process.exit(1);
}

const size = parseInt(process.argv[2], 10);

for (let i = 0; i < size; i++) {
    console.log('X'.repeat(size));
}
