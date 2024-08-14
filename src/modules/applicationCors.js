export default (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "GET");
  res.setHeader("Access-Control-Allow-Credentials", "false");
  res.setHeader("Content-Type", "application/json");

  next();
};
