export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // O cõdigo está executando até mesmo quando buffer[] está vazio. Isso dá erro
  // We can use try
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    // If error exists the req shall be null
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json')
}
