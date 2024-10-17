import { Reward } from "../../utils/types";
import RewardCard from "../reward-card";

import EmptyMyReward from "./EmptyMyReward";

const MyReward = ({
  rewards,
  onRemoveFromMyRewards,
}: {
  rewards: Reward[];
  onRemoveFromMyRewards: (rewardBrowser: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-t-3xl border-t border-[#E3E3E3] bg-[#FFF8CE] pb-16 pl-6 pr-6 pt-3">
      <div className="mb-2 text-center font-bold">My Reward Schemes</div>
      {rewards.map((reward, index) => (
        <RewardCard
          key={`my-reward-${index}`}
          reward={reward}
          onClickMove={() => onRemoveFromMyRewards(reward.name)}
          isMyReward
        />
      ))}

      {!rewards.length && <EmptyMyReward />}
    </div>
  );
};

export default MyReward;
