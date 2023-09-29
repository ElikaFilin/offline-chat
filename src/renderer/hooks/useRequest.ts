import toast from 'react-hot-toast';
import config from '../config';

export default function useRequest(method: string, url: string) {
  return async (body: unknown) => {
    try {
      const response = await fetch(`${config.HOST}/${url}`, {
        method,
        body: JSON.stringify(body),
      });
      const json = await response.json();
      if (!response.ok) {
        toast.error(`${json}`);
        return { error: json };
      }
      return json;
    } catch (error) {
      toast.error(`${error}`);
      return { error };
    }
  };
}
