import { Photos } from "@prisma/client";
import { SortedPhotos } from "../../types";

export function sortPhotos(photos: Photos[]) {
  const sorted: SortedPhotos = {};

  photos.forEach((photo) => {
    const year = photo.createdAt.getFullYear().toString();
    const month = (photo.createdAt.getMonth() + 1).toString(); // Months are zero-based

    if (!sorted[year]) {
      sorted[year] = {};
    }
    if (!sorted[year][month]) {
      sorted[year][month] = [];
    }

    sorted[year][month].push(photo);
  });
  return sorted;
}

export function download(items: {name?:string | null,url:string}[]) {
  items.forEach((el,index) => {
    fetch(el.url)
    .then((response) => response.blob())
    .then((blob) => {
      const temporary = document.createElement("a");
      temporary.setAttribute("download", el.name ?? index.toString());
      const href = URL.createObjectURL(blob);
      temporary.setAttribute("href", href);
      temporary.setAttribute("target", "_blank");
      temporary.click();
      URL.revokeObjectURL(href);
    })
  });

}