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

//CALLS

//AUTH

export const registerUser = async (email: string,password:string) => {
  const res = await axios.post("/api/account",{email,password});
  console.log(res.data)
  return res.data;
};

//PHOTOS
export const getPhotos = async (userId: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.get(PHOTOS_ENDPOINT + userId);
  return res.data;
};

export const deletePhoto = async (userId: string, uuid: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.delete(PHOTOS_ENDPOINT + userId + "/" + uuid);
  return res.data;
};

//ACCOUNT
export const changeImage = async (userId: string, photoId: string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.post("/api/account/photo/" + userId, { photoId });
  return res.data;
};

export const changePassword = async (userId: string, password:string,newPassword:string) => {
  const authFetch = getAuthFetch(userId);
  const res = await authFetch.post("/api/account/password/" + userId, { password,newPassword });
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
export const findPublicPhoto = async (photoId: string) => {
  const res = await axios.get("/api/public/" + photoId);
  return res.data;
};
