import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { get } from '../Shared/node-fetch';

const fetchGeocode: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const { address, latlng } = req.query;

  if (address) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Hello ' + (req.query.name || req.body.name),
    };

    return;
  }

  if (latlng) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: 'Hello ' + (req.query.name || req.body.name),
    };

    return;
  }

  context.res = {
    status: 400,
    body:
      'Please pass an address or latlng on the query string or in the request body',
  };

  return;
};

export default fetchGeocode;
