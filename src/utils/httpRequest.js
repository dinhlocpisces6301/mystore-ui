import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
  // withCredentials: true,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, data = {}, options = {}) => {
  const response = await httpRequest.post(path, data, options);
  return response;
};

export const put = async (path, data, options = {}) => {
  const response = await httpRequest.put(path, data, options);
  return response;
};

export const remove = async (path, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response;
};

export default httpRequest;
