import { Photos } from "@prisma/client";
import { DatabaseUserAttributes } from "./server/auth";

export type SortedPhotos = {
  [year: string]: {
    [month: string]: Photos[];
  };
};

export type User = DatabaseUserAttributes