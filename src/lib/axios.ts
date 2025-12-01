import axios from 'axios';

export async function postJSON(url: string, body: unknown) {
  const { data } = await axios.post(url, body);
  return data;
}