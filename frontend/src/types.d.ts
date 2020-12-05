import {Dispatch} from "redux";

type User = {
  id: number;
  username: string;
};
type Auth = {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: User | null;
  errors: object;
};
type PathMethod = {
  (): Promise<{default: {[key: string]: string}}>;
};
type Locale = {
  id: string;
  shortcode: string;
  name: string;
  flag: string;
  path: PathMethod;
};

type Category = {
  id: number;
  url: string;
  name: string;
  parent: null | number;
  parents: Category[];
};
type DDocument = {
  id: number;
  url: string;
  category: number | null;
  name: string;
  barcode: string;
  added_at: string;
  is_in_progress: boolean;
  file: string;
  barcode_label: string;
};
type Messages = {[key: string]: {[key: string]: string}};
export {User, Auth, PathMethod, Locale, Messages, Category, DDocument};
