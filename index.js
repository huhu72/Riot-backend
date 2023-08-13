const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

//Rate Limiting
const limiter = rateLimit({
	windowMs: 120000,
	max: 90,
});

app.use(limiter);
app.set('trust proxy, 1');
//Enable cors
app.use(cors());
app.use('/summoner', require('./routes/riot'));
app.use('/user', require('./routes/firebaseRDB'));
app.listen(PORT, () => console.log(`workin on ${PORT}`));

// const firebase = require('firebase-admin');
// var db = firebase.database();
// const ref = db.ref('Users/');

// ref.on(
// 	'value',
// 	(snapshot) => {
// 		if (snapshot.val() === null) {
// 			console.log('no snapshot');
// 		}

// 		var data = [];
// 		Object.keys(snapshot.val()).forEach(function (value, key) {
// 			var summonerInfo = snapshot.val()[value];
// 			summonerInfo['summonerName'] = value;
// 			data.push(summonerInfo);
// 		});
// 		console.log(data[0]);
// 	},
// 	(errorObject) => {
// 		console.log(errorObject.name);
// 	}
// );
