import Hyper from "hyper-express";
import Axios from "axios";
import { Controller } from "../services/Anroll.js";

const Router = new Hyper.Router();

Router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).send("Parametro 'q' obrigatorio");

    const Response = await Axios.get(Controller.search(query));
    const data = Response.data;

    const updatedData = data.data.map((anime) => {
      const typeAnime = anime.type === "anime" ? "animes" : "filmes";
      return {
        ...anime,
        imageUrl: Controller.imagesThumbnail(typeAnime,anime.slug),
      };
    });

    res.send(JSON.stringify(updatedData));
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Não foi possível coletar os dados" });
  }
});

export default Router;
