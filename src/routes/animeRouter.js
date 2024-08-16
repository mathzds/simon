import Hyper from "hyper-express";
import Axios from "axios";

import { Controller } from "../services/Anroll.js";
import { extractDataFromHtml } from "../utils/test.js";

const Router = new Hyper.Router();

const getAnime = async (url) => {
  try {
    const response = await Axios.get(url);
    const jsonData = extractDataFromHtml(response.data);

    return JSON.parse(jsonData);
  } catch (err) {
    throw new Error("Não foi possível coletar os dados");
  }
};

Router.get("/anime", async (req, res) => {
  try {
    const query = req.query.q;
    const url = Controller.anime(query);
    const releases = await getAnime(url);

    res.send(JSON.stringify(releases));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Não foi possível coletar os dados" });
  }
});

export default Router;
