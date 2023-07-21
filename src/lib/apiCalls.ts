import axios from "axios";

const getAuthFetch = (userId: string) => {
  return axios.create({
    headers: {
      userId: `Baerer ${userId}`,
    },
  });
};

//ENDPOINTS

export const PHOTOS_ENDPOINT = "/api/photos/";
export const ACCOUNT_ENDPOINT = "/api/account/"
//CALLS

//AUTH

export const registerUser = async (email: string,password:string) => {
  const res = await axios.post(ACCOUNT_ENDPOINT,{email,password});
  console.log(res.data)
  return res.data;
};

//PHOTOS
export const getPhotos = async (userId: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.get(PHOTOS_ENDPOINT + userId);
  return res.data;
};

export const deletePhoto = async (userId: string, photoId: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.delete(PHOTOS_ENDPOINT + userId + "/" + photoId);
  return res.data;
};

//ACCOUNT
export const changeImage = async (userId: string, photoId: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.post(ACCOUNT_ENDPOINT+"photo/" + userId, { photoId });
  return res.data;
};

export const changePassword = async (userId: string, password:string,newPassword:string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.post(ACCOUNT_ENDPOINT+"password/" + userId, { password,newPassword });
  return res.data;
};

//SHARE
export const setPublicPhoto = async (userId: string, photoId: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.post(PHOTOS_ENDPOINT + "share/" + userId, {
    photoId,
  });
  return res.data;
};

export const removePublicPhoto = async (userId: string, photoId: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.patch(PHOTOS_ENDPOINT + "share/" + userId, {
    photoId,
  });
  return res.data;
};

//PUBLIC
export const findPublicPhoto = async (publicPhotoId: string) => {
  const res = await axios.get("/api/public/" + publicPhotoId);
  return res.data;
};
