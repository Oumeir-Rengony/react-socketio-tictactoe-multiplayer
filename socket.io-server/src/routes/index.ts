import * as express from "express";

const router = express.Router();

/* GET home page. */
router.get("/health", function (req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
