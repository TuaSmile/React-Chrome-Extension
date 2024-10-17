import React, { useMemo } from "react";
import classNames from "classnames";

import { clickButtonEvent } from "../../../../api/analytics";
import { trackClickThrough } from "../../../../api/ga-event";
import { DISCOUNT_PROVIDER } from "../../../../icons/discount";
import { Discount } from "../../utils/types";

const OfferCard = ({
  offer,
  isOther,
}: {
  offer: Discount;
  isOther?: boolean;
}) => {
  const onClickOffer = async () => {
    if (isOther) {
      trackClickThrough()
      window.open(offer.signup_link.toString(), "_blank");
      await clickButtonEvent("signup-button", offer.signup_link.toString());
    } else {
      window.open(offer.button_link.toString(), "_blank");
      await clickButtonEvent("offer-button", offer.button_link.toString());
    }
  };

  const offerType = useMemo(() => {
    const value = offer.offer_type;
    switch (value) {
      case "Freebie":
        return "";
      case "% off":
      case "£ off":
        return "off";
      case "Deal":
        return "Deal";
      default:
        return "";
    }
  }, [offer]);

  const asyncTextSize = offer.amount.length > 4 ? 10 : 12;

  return (
    <div
      className={classNames(
        "mt-2 flex items-center justify-between rounded-xl border p-2 pb-1 pt-1",
        isOther ? "bg-[#F5F5F5]" : "bg-white",
      )}
    >
      <div className="offer-left">
        <div className="offer-percent-wrap">
          <div className="offer-amount" style={{ fontSize: asyncTextSize }}>
            {offer.amount}
          </div>
          {offerType && (
            <div className="offer-type" style={{ fontSize: asyncTextSize }}>
              {offerType}
            </div>
          )}
        </div>
        {offer.provider && DISCOUNT_PROVIDER[offer.provider] && (
          <img
            src={DISCOUNT_PROVIDER[offer.provider]}
            alt=""
            className="offer-provider"
          />
        )}
        <div className="offer-content">
          <div className="font-bold">{offer.browser1}</div>
          <div>{offer.browser2}</div>
          <div>{offer.browser3}</div>
        </div>
      </div>
      <div
        onClick={onClickOffer}
        className={classNames(
          "cursor-pointer rounded-3xl pb-1 pl-2 pr-2 pt-1 text-xs",
          isOther ? "bg-[#C9C8C8]" : "bg-[#ffdc14]",
        )}
      >
        {isOther ? "Sign Up" : "Redeem"}
      </div>
    </div>
  );
};

export default OfferCard;
