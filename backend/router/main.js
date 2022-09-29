const express = require("express");
const { data, comment } = require("../models");
const moment = require("moment");
const { fn, col } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  const dt = moment();
  const Now = `${dt.format("YYYY-MM-DD HH:mm")}`;
  try {
    const tests = await data.create({
      text: "tests",
      time: Now,
    });
    res.status(200).json(tests);
  } catch (err) {
    console.error(err);
  }
});

router.get("/GET_DATAS", async (req, res) => {
  try {
    const getdatas = await data.findAll();
    res.status(200).json(getdatas);
  } catch (err) {
    console.error(err);
  }
});

router.get("/DATA_SETTING", async (req, res) => {
  try {
    const test = await comment.findAll({
      group: ["Type"],
      attributes: ["Type", [fn("count", "Type"), "count"]],
      where: {
        Type: "tests",
      },
    });
    res.send(test);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
