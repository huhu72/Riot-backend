const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
const db = mysql.createConnection({
	host: process.env.AWS_ENDPOINT,
	user: 'admin',
	password: process.env.DB_PASS,
	database: 'league_db',
});

router.post('/POST', async (req, res) => {
	const eid = req.body.eid;
	const summonerName = req.body.summonerName;
	const summonerLevel = req.body.summonerLevel;
	const postQuery =
		'INSERT INTO summoners (eid, summonerName, summonerLevel) VALUES (?,?,?)';
	db.query('SELECT * FROM summoners WHERE eid =?', [eid], (err, result) => {
		if (err) {
			res.status(500).send('ERROr checking for existing user').end();
			return;
		}
		if (result.length > 0) {
			res.status(400).send('ERROR: Already exists').end();
			return;
		}

		db.query(postQuery, [eid, summonerName, summonerLevel], (err, result) => {
			if (err) {
				res.status(500).send('Error inserting user').end();
				return;
			}
			res.status(200).send('User added').end();
		});
	});
});
router.get('/GET', async (req, res) => {
	db.query('SELECT * FROM summoners', (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('ERROR table is empty').end();
			return;
		}
		res.status(200).send(result).end();
		// if (result.length > 0) {
		// 	res.status(400).send('ERROR: Already exists').end();
		// 	return;
		// }
	});
});

router.put('/put', async (req, res) => {
	const eid = req.body.eid;
	const summonerName = req.body.summonerName;
	const summonerLevel = req.body.summonerLevel;
	const putQuery =
		'UPDATE summoners SET summonerName = ?, summonerLevel = ? WHERE eid = ?';
	db.query('SELECT * FROM summoners WHERE eid =?', [eid], (err, result) => {
		if (err) {
			res.status(500).send('ERROR checking for existing user').end();
			return;
		}
		console.log(result);

		db.query(putQuery, [summonerName, summonerLevel, eid], (err, result) => {
			if (err) {
				res.status(500).send('Error user does not exist').end();
				return;
			}
			console.log(result);
			res.status(200).send('User added').end();
		});
	});
});
module.exports = router;
