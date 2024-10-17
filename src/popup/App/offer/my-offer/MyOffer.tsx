import { useMemo } from "react";

import { trackNoRewardsClick } from "../../../../api/ga-event";
import { useGlobalContext } from "../../context/GlobalContext";
import { sortOffers } from "../../utils/helper";
import { Discount, Reward } from "../../utils/types";
import OfferCard from "../offer-card";

import AddReward from "./AddReward";
import EmptyMyOffer from "./EmptyMyOffer";

const MyOffer = ({
  rewards,
  myOffers,
  offers,
  onFilter,
}: {
  rewards: Reward[];
  myOffers: Discount[];
  offers: Discount[];
  onFilter: () => void;
}) => {
  const { setCurrentTab } = useGlobalContext();

  const sortedOffers = useMemo(() => {
    return sortOffers(myOffers);
  }, [myOffers]);

  const onClickAddReword = () => {
    trackNoRewardsClick()
    setCurrentTab("reward");
  };

  return (
    <div className="flex flex-col rounded-t-3xl border-t border-[#E3E3E3] bg-[#FFF8CE] pb-10 pl-6 pr-6 pt-3">
      <div className="flex items-center justify-between pb-4">
        <div />
        <div className="pl-8 text-center font-bold">My Offers</div>
        <img
          src={require("../../../../icons/icon-filter.png")}
          alt=""
          className="w-6 cursor-pointer object-contain"
          onClick={onFilter}
        />
      </div>

      {offers.length ? (
        <div className="mb-6">
          {rewards.length ? (
            sortedOffers.length ? (
              sortedOffers.map((offer, index) => {
                return <OfferCard offer={offer} key={index} />;
              })
            ) : (
              <EmptyMyOffer />
            )
          ) : (
            <AddReward onClick={onClickAddReword} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MyOffer;
