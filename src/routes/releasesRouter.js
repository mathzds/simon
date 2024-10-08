import Hyper from "hyper-express";
import Axios from "axios";

import { Controller } from "../services/Anroll.js";
import { extractReleaseData } from "../utils/extrasFunctions.js";

const Router = new Hyper.Router();

const getReleases = async (url) => {
  try {
    const Response = await Axios.get(url);
    const jsonData = extractReleaseData(Response.data);

    return JSON.parse(jsonData);
  } catch (err) {
    throw new Error("Não foi possível coletar os dados");
  }
};

Router.get("/releases", async (req, res) => {
  try {
    const url = Controller.realese();
    const Releases = await getReleases(url);

    res.send(JSON.stringify(Releases));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Não foi possível coletar os dados" });
  }
});

export default Router;
