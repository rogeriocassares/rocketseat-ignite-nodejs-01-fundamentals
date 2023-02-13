import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed))); //transformed must be sent as a Buffer
    // The first parameter of a callback is the error. If there was no error, this is null
    // The second parameter is the transformed number
  }
}

// req => ReadableStream
// res => WriteableStream
const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  } // await each chunk of a stream to be returned. While the buffers is not complete nothing bellow shall be executed

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);

  // return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);
