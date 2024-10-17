import { useEffect, useMemo, useState } from "react";
import { storage } from "webextension-polyfill";

import { pageView, sessionEvent } from "../../../api/analytics";
import { trackFilterClick, trackPageView } from "../../../api/ga-event";
import { getCurrentTab } from "../../../helpers/tabs";
import { TermKey, TypeKey, useGlobalContext } from "../context/GlobalContext";
import Filter from "../filter";
import { Discount, Reward } from "../utils/types";

import MyOffer from "./my-offer";
import OtherOffer from "./other-offer";

import "./Offer.css";

const Offers = ({ rewards }: { rewards: Reward[] }) => {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState<Discount[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const { filters } = useGlobalContext()

  // it works only on the browser
  useEffect(() => {
    const readBackgroundMessage = async () => {
      setLoading(true);
      const tab = await getCurrentTab();
      const tabId = tab.id;
      if (tabId) {
        const data = await storage.local.get(tabId.toString());
        const currentValue = data?.[tabId] ?? [];
        const pageTitle = currentValue?.length
          ? "Available Offers"
          : "No offers";
        pageView(pageTitle, window.location.href.toString());
        // Set a timeout to call sessionEvent after 10 seconds
        setTimeout(() => {
          sessionEvent();
        }, 10000);
        setOffers(currentValue);
      }
      setLoading(false);
    };
    readBackgroundMessage();
  }, []);

  const onFilter = () => {
    trackFilterClick()
    setIsOpenFilter(true);
  };

  const onCloseFilter = () => {
    setIsOpenFilter(false);
  };

  const filteredOffers = useMemo(() => {
    if (!offers || !filters) return [];
  
    return offers.filter((offer) => {
      // Check filter_terms
      const termsMatch = Object.entries(filters.terms || {}).some(
        ([term, isActive]) => {
          const key = term as TermKey;
          return isActive && offer.filter_terms?.[key];
        }
      );
  
      // Check filter_types
      const typesMatch = Object.entries(filters.types || {}).some(
        ([type, isActive]) => {
          const key = type as TypeKey;
          return isActive && offer.filter_types?.[key];
        }
      );
  
      return termsMatch && typesMatch;
    });
  }, [offers, filters]);

  const myOffers = useMemo(() => {
    return filteredOffers.filter((offer) =>
      rewards.findIndex((reward) =>
        reward.browser.some((browser) =>
          browser.toLowerCase().includes(offer.browser1.trim().toLowerCase())
        )
      ) !== -1
    );
  }, [filteredOffers, rewards]);
  
  const otherOffers = useMemo(() => {
    return filteredOffers.filter(
      (offer) =>
        myOffers.findIndex(
          (myOffer) =>
            myOffer.browser1.trim().toLowerCase() === offer.browser1.trim().toLowerCase()
        ) === -1
    );
  }, [filteredOffers, myOffers]);
  

  useEffect(() => {
    if (myOffers.length && otherOffers.length)
      trackPageView(true, true)
    if (myOffers.length && !otherOffers.length)
      trackPageView(true, false)
    if (!myOffers.length && otherOffers.length)
      trackPageView(false, true)
    if (!myOffers.length && !otherOffers.length)
      trackPageView(false, false)
  }, [myOffers, otherOffers]);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="flex-1 overflow-auto rounded-t-3xl bg-white">
      {isOpenFilter && <Filter onCloseFilter={onCloseFilter} />}
      {!isOpenFilter && (
        <>
          <MyOffer
            offers={filteredOffers}
            myOffers={myOffers}
            onFilter={onFilter}
            rewards={rewards}
          />
          <OtherOffer offers={otherOffers} />
        </>
      )}
    </div>
  );
};

export default Offers;
