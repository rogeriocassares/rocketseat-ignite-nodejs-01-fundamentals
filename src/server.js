import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res); // POis json() é uma funcao assincrona e preceisamos aguardar que essa funcao execute antesde prosseguir.

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    // console.log(extractQueryParams(routeParams.groups.query))

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {}; // TO not return undefined if the query was not set

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
