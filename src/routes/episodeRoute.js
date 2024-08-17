import Hyper from "hyper-express";
import { handleSpecificEpisode } from "../utils/episodeUtils.js";
import path from "node:path";

const assetsPath = path.join("src", "assets");
const Router = new Hyper.Router();

Router.get("/episode/:name/:episode", async (req, res) => {
  const { name, episode } = req.params;

  try {
    await handleSpecificEpisode(name, episode);
    const videoPath = path.resolve(assetsPath, name, `${episode}.m3u8`);
    res.sendFile(videoPath);
  } catch (error) {
    console.error("Error fetching episode:", error.message);
    res.status(500).send("Error fetching episode");
  }
});

export default Router;
