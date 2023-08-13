const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const url = require('url');
const firebase = require('firebase-admin');
var SERVICE_ACCOUNT = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

firebase.initializeApp({
	credentials: firebase.credential.cert(SERVICE_ACCOUNT),
	databaseURL: process.env.FIREBASE_URL,
});
var db = firebase.database();

const ref = db.ref('Users');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post('/POST', async (req, res) => {
	const userRef = ref.child(`/${req.body.summonerName}`);
	let name = req.body.summonerName;
	const playerData = req.body;
	delete playerData.summonerName;
	userRef.set(playerData, (error) => {
		if (error) {
			res.status(500).send('Error: ' + error.message);
		} else {
			res.status(200).send(`${name} has been added successfully`);
		}
	});
});

router.get('/GET', async (req, res) => {
	try {
		const data = await getPlayersDataFromDB();
		if (data === null) {
			res.sendStatus(204);
		} else {
			res.status(200).json(data);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred');
	}
});
async function getPlayersDataFromDB() {
	return new Promise((resolve, reject) => {
		ref.on(
			'value',
			(snapshot) => {
				if (snapshot.val() === null) {
					console.log('Database is not yet populated');
					resolve(null);
				} else {
					const data = Object.keys(snapshot.val()).map((value) => {
						const summonerInfo = snapshot.val()[value];
						summonerInfo['summonerName'] = value;
						return summonerInfo;
					});
					resolve(data);
				}
			},
			(errorObject) => {
				reject(errorObject);
			}
		);
	});
}
router.get('/GETUSER', async (req, res) => {
	const summonerName = url.parse(req.url, true).query.summoner;
	try {
		const data = await getPlayerDataFromDB(summonerName);
		if (data === null) {
			res.sendStatus(204);
		} else {
			res.status(200).json(data);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred');
	}
});

function getPlayerDataFromDB(summonerName) {
	return new Promise((resolve, reject) => {
		const userRef = ref.child(`/${summonerName}`);
		userRef.on(
			'value',
			(snapshot) => {
				if (snapshot.val() === null) {
					console.log(summonerName + ' does not exist');
					resolve(null);
				} else {
					const data = snapshot.val();
					data['summonerName'] = summonerName;
					resolve(data);
				}
			},
			(errorObject) => {
				reject(errorObject);
			}
		);
	});
}

module.exports = router;
