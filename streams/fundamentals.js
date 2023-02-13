// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null); // No more data to stream
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed))); //transformed must be sent as a Buffer
    // The first parameter of a callback is the error. If there was no error, this is null
    // The second parameter is the transformed number
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    // Chunks is the buffer parts from the stream
    //encoding is how the message is encoded
    // callback is a function that the write streams needs to call when it have finished that action
    console.log(Number(chunk.toString()) * 10);
    callback(); // finishes everything that would be executed
  }
}

// new OneToHundredStream().pipe(process.stdout);

// Read each of number received at the buffer and multiply by ten!
new OneToHundredStream() // Just read
  .pipe(new InverseNumberStream()) // Must read data from somewhere and write to the othewhere! BetweenStreams!
  .pipe(new MultiplyByTenStream()); //Just write data
