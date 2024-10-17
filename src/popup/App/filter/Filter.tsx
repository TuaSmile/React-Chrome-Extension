
import { TermKey, TypeKey, useGlobalContext } from "../context/GlobalContext";

import FilterItem from "./FilterItem";


const Filter = ({ onCloseFilter }: { onCloseFilter: () => void }) => {
  const { filters, setFilters } = useGlobalContext()

  const setTermsFilter = (field: TermKey) => {
    setFilters((prevState) => ({
      ...prevState,
      terms: {
        ...prevState.terms,
        [field]: !prevState.terms[field],
      },
    }));
  };

  const setTypesFilter = (field: TypeKey) => {
    setFilters((prevState) => ({
      ...prevState,
      types: {
        ...prevState.types,
        [field]: !prevState.types[field],
      },
    }));
  };

  return (
    <div className="flex flex-col gap-4 rounded-t-3xl border-t border-[#E3E3E3] bg-[#FFF8CE] pb-16 pl-6 pr-6 pt-3">
      <div className="flex justify-between">
        <div />
        <p className="ml-6 text-center font-bold">Filter</p>
        <img
          src={require("../../../icons/icon-close.png")}
          alt=""
          className="w-4 cursor-pointer object-contain"
          onClick={onCloseFilter}
        />
      </div>

      <div className="rounded-2xl border border-[#E3E3E3] bg-white p-3">
        <p className="pb-2 font-bold">Offer Terms</p>

        <FilterItem
          label="New Customer"
          isChecked={filters.terms.new_customer}
          onClick={() => setTermsFilter("new_customer")}
        />

        <FilterItem
          label="Product Specific"
          isChecked={filters.terms.product_specific}
          onClick={() => setTermsFilter("product_specific")}
        />

        <FilterItem
          label="Minimum Spend"
          isChecked={filters.terms.min_spend}
          onClick={() => setTermsFilter("min_spend")}
        />

        <FilterItem
          label="Outlet Purchases"
          isChecked={filters.terms.outlet_purchases}
          isLastOne
          onClick={() => setTermsFilter("outlet_purchases")}
        />
      </div>

      <div className="rounded-2xl border border-[#E3E3E3] bg-white p-3">
        <p className="pb-2 font-bold">Offer Types</p>

        <FilterItem
          label="Cashback"
          isChecked={filters.types.cashback}
          onClick={() => setTypesFilter("cashback")}
        />

        <FilterItem
          label="Promo Code"
          isChecked={filters.types.promo_code}
          onClick={() => setTypesFilter("promo_code")}
        />

        <FilterItem
          label="Discounted Giftcard"
          isChecked={filters.types.discounted_giftcard}
          onClick={() => setTypesFilter("discounted_giftcard")}
        />

        <FilterItem
          label="Auto-Applied Saving"
          isChecked={filters.types.auto_applied_saving}
          onClick={() => setTypesFilter("auto_applied_saving")}
        />

        <FilterItem
          label="Pay with Points"
          isChecked={filters.types.pay_with_points}
          onClick={() => setTypesFilter("pay_with_points")}
        />

        <FilterItem
          label="Earn Points"
          isChecked={filters.types.earn_points}
          isLastOne
          onClick={() => setTypesFilter("earn_points")}
        />
      </div>
    </div>
  );
};

export default Filter;
