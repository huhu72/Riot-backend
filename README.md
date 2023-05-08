Here's a possible README.md file for the given repo:

# Riot-backend

This is a backend server for obtaining information about League of Legends summoners and their ranked stats.

## API Endpoint

The API endpoint is deployed at `riot-backend.onrender.com`.

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

## Example

Here's an example of how to use the API to get information about a summoner named "huhu72" and their ranked stats:

```
https://riot-backend.onrender.com/summoner?summoner=huhu72
```

```
https://riot-backend.onrender.com/summoner/ranked?summonerID=1234567890
```

## Deployment

This backend server is deployed on Render, a modern cloud provider for web apps and websites. To deploy your own instance of this server, you can follow these steps:

1. Clone this repository to your local machine.
2. Create a new web service on Render.
3. Connect your Render web service to your cloned repository.
4. Set the following environment variables in your Render web service:

   - `RIOT_API_KEY`: Your Riot API key. You can obtain one from the [Riot Developer Portal](https://developer.riotgames.com/).
   
5. Deploy your web service to Render.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
