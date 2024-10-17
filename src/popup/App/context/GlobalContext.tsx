import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type TermKey =
  | "new_customer"
  | "product_specific"
  | "min_spend"
  | "outlet_purchases";
export type TypeKey =
  | "cashback"
  | "promo_code"
  | "discounted_giftcard"
  | "auto_applied_saving"
  | "pay_with_points"
  | "earn_points";

interface FiltersState {
  terms: {
    [key in TermKey]: boolean;
  };
  types: {
    [key in TypeKey]: boolean;
  };
}

interface IGlobalContextState {
  currentTab: "offer" | "reward";
  setCurrentTab: Dispatch<SetStateAction<"offer" | "reward">>;
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}

const initFilters = {
  terms: {
    new_customer: true,
    product_specific: true,
    min_spend: true,
    outlet_purchases: true,
  },
  types: {
    cashback: true,
    promo_code: true,
    discounted_giftcard: true,
    auto_applied_saving: true,
    pay_with_points: true,
    earn_points: true,
  },
}

const GlobalContext = React.createContext<IGlobalContextState>({
  currentTab: "offer",
  setCurrentTab: (): void => {},
  filters: initFilters,
  setFilters: (): void => {}
});

export const GlobalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentTab, setCurrentTab] = useState<"offer" | "reward">("offer");
  const [filters, setFilters] = useState<FiltersState>(initFilters)

  const globalContextValue = useMemo<IGlobalContextState>(() => {
    return {
      currentTab,
      setCurrentTab,
      filters,
      setFilters
    };
  }, [currentTab, setCurrentTab, filters, setFilters]);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
