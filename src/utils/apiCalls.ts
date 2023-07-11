import axios from "axios";

//endpoints
export const photosEndpoint = "/api/photos/"


//calls
export const getPhotos = async () => {
  const res = await axios.get(photosEndpoint+"userid");
  return res.data;
};

export const deletePhoto = async (uuid: string) => {
    const res = await axios.delete(photosEndpoint+"userid"+uuid);
    return res.data
}

