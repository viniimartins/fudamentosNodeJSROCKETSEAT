import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// - Criar usuarios
// - Listagem de usuarios
// - Edição de usuarios
// - Remoção de usuarios

// - HTTP
//   - Método HTTP
//   - URL

//  - GET, POST, PUT, PATCH, DELETE

//    GET  => Buscar uma recurso do back-end
//    POST => Criar uma recurso no back-end
//    PUT  => Atualizar uma recurso no back-end
//    PATCH => Atualizar uma informação especifica de um recurso no back-end
//    DELETE => Deletar um recurso do back-end

//    GET /users => Buscando usuarios do back-end
//    POST /users => Criar um usuario no back-end

//    Stateful - Stateless

//    Cabecalhos (Requisição/resposta) => Metadados

//    HTTP Status

// Query Parameters : URL Stateful => Filtros, paginacao, nao-obrigatorios
// Route Parameters : Identificacao de recurso
// Request Body : Envio de informacoes de um formulario  (HTTPs )

// http://localhost:333/users?userId=1&name=Diego

// GET http://localhost:3333/users/1
// DELETE  http://localhost:3333/users/1

// POST  http://localhost:3333/users/1

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    console.log(routeParams.groups);

    return route.handler(req, res);
  }

  console.log(route);

  return res.writeHead(404).end();
});

server.listen(3333);
