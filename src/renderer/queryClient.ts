import { MutationCache, QueryCache, QueryClient } from 'react-query';
import toast from 'react-hot-toast';

export default new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),
});
