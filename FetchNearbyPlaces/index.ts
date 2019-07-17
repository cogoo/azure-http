import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { get } from '../Shared/node-fetch';

const fetchNearbyPlaces: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const {
    location = '51.4644309,-0.1721212',
    radius = 1000,
    keyword = 'hair',
    opennow,
  } = req.query;

  try {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
      process.env.GCP_API_KEY
    }&location=${location}&radius=${radius}&keyword=${keyword}`;

    if (opennow) {
      url = `${url}&opennow`;
    }

    const res = await get(url);

    context.res = {
      body: {
        places: res,
      },
    };
  } catch (err) {
    context.res = {
      status: 400,
      body: err,
    };
  }
};

export default fetchNearbyPlaces;
