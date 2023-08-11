const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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
	const playerData = req.body;
	delete playerData.summonerName;
	userRef.set(playerData);
});

module.exports = router;
