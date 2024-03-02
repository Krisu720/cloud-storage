import { Photos } from "@prisma/client";
import { User as LuciaUser} from "lucia/dist/core";

export type SortedPhotos = {
  [year: string]: {
    [month: string]: Photos[];
  };
};

export type User = LuciaUser