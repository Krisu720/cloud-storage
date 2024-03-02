import Banner from "~/components/sections/Banner";
import PhotosSection from "~/components/sections/PhotosSection";
import { redirect } from "next/navigation";
import { sortPhotos } from "~/lib/helpers";
import { api } from "~/trpc/server";


const Photos = async ({}) => {
  try {

  const photos = await api.photos.getPhotos.query();
  const info = await api.auth.getUserInfo.query()
  if (!photos) redirect("/login");

  const sortedPhotos = sortPhotos(photos.photos);
  
  if (photos) {
    return (
      <div className="">
        <Banner info={info} />
        <PhotosSection photos={sortedPhotos} />
      </div>
    );
  } else {
    redirect("/login");
  }
 } catch(err){
  redirect("/login")
 }

};

export default Photos;
