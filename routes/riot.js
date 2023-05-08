const express = require('express');
const { request } = require('http');
const router = express.Router();
const needle = require('needle');
const url = require('url');

//Env Var
const API_BASE_URL = 'https://na1.api.riotgames.com';
const API_KEY = process.env.API_KEY;
const API_SUMMONER_URL = '/lol/summoner/v4/summoners/by-name/';
const API_RANKED_URL = '/lol/league/v4/entries/by-summoner/';
const params = new URLSearchParams({
	api_key: API_KEY,
});

router.get('/', async (req, res) => {
	try {
		const requestData = url.parse(req.url, true).query.summoner;
		const apiRes = await needle(
			'get',
			`${API_BASE_URL}${API_SUMMONER_URL}${requestData}?${params}`
		);
		const data = apiRes.body;
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json('error');
	}
});
router.get('/ranked', async (req, res) => {
	this.summonerData = {};
	this.summonerId = '';
	const data = await getPlayerData(url.parse(req.url, true).query.summoner);
	try {
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json('error: in redirect');
	}
});
async function getPlayerData(playerName) {
	try {
		const playerData = await needle(
			'get',
			`${API_BASE_URL}${API_SUMMONER_URL}${playerName}?${params}`
		);
		const rankedData = await needle(
			'get',
			`${API_BASE_URL}${API_RANKED_URL}${playerData.body.id}?${params}`
		);
		console.log(
			`${API_BASE_URL}${API_RANKED_URL}${playerData.body.id}?${params}`
		);
		let data = {};
		console.log(rankedData.body);
		for (var index in rankedData.body) {
			console.log(
				`${rankedData.body[index].summonerName} ${
					rankedData.body[index].queueType === 'RANKED_SOLO_5x5'
				}`
			);
			if (rankedData.body[index].queueType === 'RANKED_SOLO_5x5') {
				data = rankedData.body[index];
			}
		}
		Object.assign(data, playerData.body);
		console.log(data);
		if (data.name) {
			data['summonerName'] = data.name;
			if (!data.rank) {
				data['rank'] = 'NA';
				data['tier'] = 'NA';
			}
			delete data.name;
		}
		if (data.summonerId) {
			data['encriptedId'] = data.summonerId;
			delete data.summonerId;
			delete data.id;
			delete data.accountId;
		}
		return data;
	} catch (error) {
		return { error: '500' };
	}
}

module.exports = router;
