import { FEE_DATA } from "../constants/api";
import { useFetcher } from "./useFetcher";

export const useFees = () => {
  return useFetcher({ key: FEE_DATA.key, url: FEE_DATA.endpoint }, true);
};
