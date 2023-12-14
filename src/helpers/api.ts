import axios from 'axios';
import {
  ApiResponse,
  DeleteApiParams,
  GetApiParams,
  PostApiParams,
  PutApiParams,
} from '../types/apiParams.ts';

const errHandler = async (promise: Promise<ApiResponse>) => {
  try {
    const { data } = await promise;

    return { data, err: null };
  } catch (err) {
    console.log('err', err);
    err = err.response ? err.response.data : err;
    return { data: null, err: err };
  }
};

const api = {
  delete: ({ url, params = {} }: DeleteApiParams) => {
    return errHandler(
      axios.delete(url, {
        params,
      }),
    );
  },

  get: ({ url, params = {}, headers = {} }: GetApiParams) => {
    return errHandler(
      axios.get(url, {
        headers,
        params,
      }),
    );
  },

  post: ({ url, data = null, headers = {} }: PostApiParams) => {
    return errHandler(
      axios.post(url, data, {
        headers,
      }),
    );
  },

  put: ({ url, data = null }: PutApiParams) => {
    return errHandler(axios.put(url, data));
  },
};

export default api;
