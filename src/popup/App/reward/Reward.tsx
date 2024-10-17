import { useState } from "react";

import { Reward as RewardItem, Rewards } from "../utils/types";

import MyReward from "./my-reward";
import OtherReward from "./other-reward";

const Reward = ({
  rewards,
  myRewards,
  setMyRewards,
}: {
  myRewards: RewardItem[];
  rewards: Rewards;
  setMyRewards: React.Dispatch<React.SetStateAction<RewardItem[]>>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToMyRewards = (category: string, rewardName: string) => {
    const rewardIndex = rewards[category].findIndex(
      (reward) => reward.name === rewardName,
    );
    const selectedReward = {
      ...rewards[category][rewardIndex],
      originalCategory: category,
      originalName: rewardName, // Using name as a unique ID
      originalIndex: rewardIndex, // Storing original index
    };

    // Add to MyRewards list and sort alphabetically
    setMyRewards((prevRewards) =>
      [...prevRewards, selectedReward].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );
  };

  const handleRemoveFromMyRewards = (rewardName: string) => {
    const selectedRewardIndex = myRewards.findIndex(
      (reward) => reward.name === rewardName,
    );
    // const selectedReward = myRewards[selectedRewardIndex];

    const updatedMyRewards = [...myRewards];
    updatedMyRewards.splice(selectedRewardIndex, 1); // Remove the reward

    // Sort "My Rewards" alphabetically after removal
    setMyRewards(updatedMyRewards.sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <div className="flex-1 overflow-auto rounded-t-3xl bg-white">
      <MyReward
        rewards={myRewards}
        onRemoveFromMyRewards={handleRemoveFromMyRewards}
      />
      <OtherReward
        rewards={rewards}
        myRewards={myRewards}
        onAddToMyRewards={handleAddToMyRewards}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default Reward;
