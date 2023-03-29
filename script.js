const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');
const path = require('path');

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.txt');

// створюємо трансформ стрім
const upperCaseFirstLetter = new Transform({
  transform(chunk, encoding, callback) {
    // перетворюємо буфер у строку
    const str = chunk.toString();
    // міняємо першу букву на велику в кожному слові
    const result = str.replace(/\b\w/g, (l) => l.toUpperCase());
    // викликаємо callback з результатом
    callback(null, result);
  },
});

// створюємо read та write стріми
const readStream = createReadStream(inputPath);
const writeStream = createWriteStream(outputPath);

// піплайн стрімів
readStream.pipe(upperCaseFirstLetter).pipe(writeStream);