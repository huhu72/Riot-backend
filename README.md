# Riot-backend

This is a backend server for obtaining information about League of Legends summoners and their ranked stats.

## API Endpoint

The API endpoint is deployed at [https://riot-backend.onrender.com](https://riot-backend.onrender.com).

## Usage

### Get Summoner Info

To get information about a League of Legends summoner, use the following endpoint:

```
https://riot-backend.onrender.com/summoner?summoner={enter-summoner-name-here}
```

Replace `{enter-summoner-name-here}` with the name of the summoner you want to get information for.

### Get Ranked Info

To get the ranked information for a League of Legends summoner, use the following endpoint:

```
https://riot-backend.onrender.com/summoner/ranked?summonerID={enter-summoner-id-here}
```

Replace `{enter-summoner-id-here}` with the ID of the summoner you want to get ranked information for.

## Deployment

### Locally

You can also deploy this server locally by following these steps:

1. Clone this repository to your local machine.

```
git clone https://github.com/huhu72/Riot-backend.git
```

2. Install the dependencies using `npm` or `yarn`.

```
npm install
```

or

```
yarn install
```

3. Start the server.

```
npm start
```

or

```
yarn start
```

4. Access the server at `http://localhost:5000` with the same routes as the deployed address.

### On Render

This backend server is deployed on Render, a modern cloud provider for web apps and websites. To deploy your own instance of this server on Render, you can follow these steps:

1. Clone this repository to your local machine.

```
git clone https://github.com/huhu72/Riot-backend.git
```

2. Create a new web service on Render.

3. Connect your Render web service to your cloned repository.

4. Set the following environment variables in your Render web service:

   - `RIOT_API_KEY`: Your Riot API key. You can obtain one from the [Riot Developer Portal](https://developer.riotgames.com/).
   
5. Deploy your web service to Render.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
