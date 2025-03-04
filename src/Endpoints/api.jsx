/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import axios from "axios";

const Api = axios.create({
   
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY }`
    }
});

export const addToFavorites = (mediaType, mediaId) => {
    return Api.post(`/account/${accountId}/favorite`, {
      media_type: mediaType,
      media_id: mediaId,
      favorite: true,
    });
  };
  
  export const removeFromFavorites = (mediaType, mediaId) => {
    return Api.post(`/account/${accountId}/favorite`, {
      media_type: mediaType,
      media_id: mediaId,
      favorite: false,
    });
  };

export default Api;
