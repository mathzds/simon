import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "url";
import Hyper from "hyper-express";

export const handleRouter = async (Server) => {
  const files = await glob("src/routes/*.js");

  for (const file of files) {
    const modulePath = `./${path.relative(path.dirname(fileURLToPath(import.meta.url)), file)}`;
    const { default: router } = await import(modulePath);

    if (router instanceof Hyper.Router) {
      Server.use("/", router);
      console.log(`Rota registrada: ${modulePath}`);
    } else {
      console.warn(`${modulePath} não exporta uma instância`);
    }
  }
};
