import Hyper from "hyper-express";

const Router = new Hyper.Router();

Router.get("/", (req, res) => {
  res.send("Main page");
});

export default Router;
