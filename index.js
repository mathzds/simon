import Hyper from "hyper-express";

const Server = new Hyper.Server();
const Port = process.env.PORT;

import applicationCors from "./src/modules/applicationCors.js";

import mainRouter from "./src/routes/mainRouter.js";
import searchRouter from "./src/routes/searchRoute.js";
import relasesRouter from "./src/routes/releasesRouter.js"

Server.use("/", mainRouter);
Server.use("/", searchRouter);
Server.use('/', relasesRouter)

Server.use(applicationCors)

Server.listen(Port)
  .then((socket) => console.log(`Server started on ${Port}`))
  .catch((code) => console.log(`Failed to start server on ${Port}`));
