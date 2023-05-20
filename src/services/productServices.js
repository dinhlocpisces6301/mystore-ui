import Cookies from 'js-cookie';
import { httpRequest } from '~/utils';

export const getAllProduct = async (page, size = 10) => {
  try {
    const res = await httpRequest.get(`games/paging?pageindex=${page}&pagesize=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const search = async (q) => {
  try {
    const res = await httpRequest.get(`games/paging?keyword=${q}&pageindex=1&pagesize=5`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByKeyword = async (q, page, size = 10) => {
  try {
    const res = await httpRequest.get(`games/paging?keyword=${q}&pageindex=${page}&pagesize=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByGenreId = async (genreID, page, size = 10) => {
  try {
    const res = await httpRequest.get(`games/paging?GenreID=${genreID}&pageindex=${page}&pagesize=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await httpRequest.get(`games/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestProduct = async (page, size = 10) => {
  try {
    const res = await httpRequest.get(`games/latest?pageindex=${page}&pagesize=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getBestSellerProduct = async (page, size = 10) => {
  try {
    const res = await httpRequest.get(`games/bestseller?pageindex=${page}&pagesize=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSalesProduct = async (page, size = 10) => {
  try {
    const res = await httpRequest.get(`games/getgamesale?pageindex=${page}&pagesize=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductComment = async (id, page = 1, size = 1000000) => {
  try {
    const res = await httpRequest.get(`comment?gameId=${id}&pageindex=${page}&pagesize=${size}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const rating = async (payload) => {
  try {
    const res = await httpRequest.post(`comment`, payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const activeGame = async (payload) => {
  try {
    const userId = Cookies.get('user-id');
    const res = await httpRequest.post(`games/active-game`, {
      userId: userId,
      gameId: payload.gameId,
      key: payload.key,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPublisher = async () => {
  try {
    const res = await httpRequest.get(`publisher`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getGameIMG = async (id) => {
  try {
    const res = await httpRequest.get(`games/${id}/images`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
