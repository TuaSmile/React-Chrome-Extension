import { TermKey, TypeKey } from "../context/GlobalContext";

export type Reward = {
  name: string;
  icon: string;
  browser: string[];
  link: string;
  originalCategory?: string; // Optional because it won't exist in the initial rewards
  originalIndex?: number; // Optional for the same reason
};

export interface Rewards {
  [category: string]: Reward[];
}

export type Discount = {
  provider: string;
  browser1: string;
  browser2: string;
  browser3: string;
  amount: string;
  offer_type: string;
  button_link: string;
  button_title: string;
  shop_site: string;
  signup_link: string;
  filter_terms: {
    [key in TermKey]: boolean;
  };
  filter_types: {
    [key in TypeKey]: boolean;
  };
};
