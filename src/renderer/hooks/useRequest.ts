import config from '../config';

export default function useRequest(method: string, url: string) {
  return async (body: unknown) => {
    const response = await fetch(config.HOST + url, {
      method,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  };
}
