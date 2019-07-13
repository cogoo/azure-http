import fetch from 'node-fetch';

export async function get(url) {
  const response = await fetch(url);
  return await response.json();
}
