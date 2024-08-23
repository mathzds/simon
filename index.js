import Hyper from "hyper-express";

export const Server = new Hyper.Server();
const Port = process.env.PORT || 3000;

import applicationCors from "./src/modules/applicationCors.js";
import { handleRouter } from "./src/modules/handleRouters.js";

await handleRouter(Server);
Server.use(applicationCors);

Server.listen(Port)
  .then((socket) => console.log(`Server started on ${Port}`))
  .catch((code) => console.log(`Failed to start server on ${Port}`));
