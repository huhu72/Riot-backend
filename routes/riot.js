const express = require("express");
const router = express.Router();
const needle = require("needle");
const url = require("url");

//Env Var
const API_BASE_URL = "https://na1.api.riotgames.com";
const API_KEY = process.env.API_KEY;
const API_SUMMONER_URL = "/lol/summoner/v4/summoners/by-name/";
router.get("/summoner", async (req, res) => {
  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
    });
    const requestData = url.parse(req.url, true).query.summoner;
    const apiRes = await needle("get", `${API_BASE_URL}${API_SUMMONER_URL}${requestData}?${params}`);
    const data = apiRes.body;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("error");
  }
});
router.get("/second", (req, res) => {
  res.json({ secondSuccess: true });
});

module.exports = router;
