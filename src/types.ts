import { Photos } from "@prisma/client";

export type SortedPhotos = {
  [year: string]: {
    [month: string]: Photos[];
  };
};