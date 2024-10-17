import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

import { getCurrentTab } from "../../helpers/tabs";

import { useGlobalContext } from "./context/GlobalContext"
import { INIT_REWARDS } from "./utils/constants";
import { Reward as RewardItem, Rewards } from "./utils/types";
import Footer from "./footer";
import Header from "./header";
import Offer from "./offer";
import Reward from "./reward";

const App = () => {
  const [rewards] = useState<Rewards>(INIT_REWARDS);
  const [myRewards, setMyRewards] = useState<RewardItem[]>([]);

  const { currentTab, setCurrentTab } = useGlobalContext();

  useEffect(() => {
    const loadMyRewards = async () => {
      const storedRewards = localStorage.getItem(`myRewards`);
      if (storedRewards) {
        setMyRewards(JSON.parse(storedRewards));
      }
    };
    loadMyRewards();
  }, []);

  const handleClose = async () => {
    const tab = await getCurrentTab();

    // save my rewards
    if (tab.url) {
      localStorage.removeItem("myRewards");
      localStorage.setItem(`myRewards`, JSON.stringify(myRewards));
    }

    const tabId = tab.id;
    if (tabId) {
      browser.tabs.sendMessage(tabId, { action: "close-iframe" });
    }
  };

  return (
    <div className="flex h-[620px] w-[470px] flex-col justify-between rounded-md bg-[#FFD936] text-base shadow-md">
      <>
        <Header onClose={handleClose} />

        {currentTab === "offer" ? (
          <Offer rewards={myRewards} />
        ) : (
          <Reward
            myRewards={myRewards}
            setMyRewards={setMyRewards}
            rewards={rewards}
          />
        )}

        <Footer tab={currentTab} setTab={setCurrentTab} />
      </>
    </div>
  );
};

export default App;
