import { useMemo } from "react";

import { sortOffers } from "../../utils/helper";
import { Discount } from "../../utils/types";
import OfferCard from "../offer-card";

import EmptyOffer from "./EmptyOtherOffer";

const OtherOffer = ({ offers }: { offers: Discount[] }) => {
  const sortedOffers = useMemo(() => {
    return sortOffers(offers);
  }, [offers]);

  return (
    <div className="mt-[-40px] gap-4 rounded-t-3xl border-t border-[#E3E3E3] bg-[#FFFFFF] pb-8 pl-6 pr-6 pt-3">
      <div className="text-center font-bold">Other Offers</div>
      {sortedOffers.length > 0 ? (
        <div className={"offers"}>
          {sortedOffers.map((offer, index) => {
            return <OfferCard offer={offer} key={index} isOther />;
          })}
        </div>
      ) : (
        <EmptyOffer />
      )}
    </div>
  );
};

export default OtherOffer;
