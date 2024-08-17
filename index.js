import Hyper from "hyper-express";

const Server = new Hyper.Server();
const Port = process.env.PORT;

import applicationCors from "./src/modules/applicationCors.js";

import mainRouter from "./src/routes/mainRouter.js";
import searchRouter from "./src/routes/searchRoute.js";
import relasesRouter from "./src/routes/releasesRouter.js";
import animeRouter from "./src/routes/animeRouter.js";
import episodeRouter from "./src/routes/episodeRoute.js";

Server.use("/", mainRouter);
Server.use("/", searchRouter);
Server.use("/", relasesRouter);
Server.use("/", animeRouter);
Server.use("/", episodeRouter);

Server.use(applicationCors);

Server.listen(Port)
  .then((socket) => console.log(`Server started on ${Port}`))
  .catch((code) => console.log(`Failed to start server on ${Port}`));
