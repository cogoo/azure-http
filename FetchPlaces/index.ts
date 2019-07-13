import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { get } from '../Shared/node-fetch';

const fetchPlaces: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const query = req.query.query || (req.body && req.body.query);

  if (query) {
    const res = await get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?input=${query}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry,price_level,rating,user_ratings_total&key=${
        process.env.GCP_API_KEY
      }`
    );

    context.res = {
      body: {
        places: res,
      },
    };

    return;
  }

  context.res = {
    status: 400,
    body: 'Please pass a name on the query string or in the request body',
  };
};

export default fetchPlaces;
