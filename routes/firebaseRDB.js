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
	const summonerName = url.parse(req.url, true).query.summoner;
	const data = await getPlayerDataFromDB(summonerName);
	if (data === null) {
		res.sendStatus(204);
	} else {
		res.status(200).json(data);
	}
});

async function getPlayerDataFromDB(summonerName) {
	const userRef = ref.child(`/${summonerName}`);
	userRef.on(
		'value',
		(snapshot) => {
			if (snapshot.val() === null) {
				console.log(summonerName + ' does not exist');
				return null;
			} else {
				return snapshot.val();
			}
		},
		(errorObject) => {}
	);
}

module.exports = router;
