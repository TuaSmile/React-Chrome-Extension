import classNames from "classnames";

import { trackAddRewardsClick, trackRemoveRewardsClick } from "../../../../api/ga-event";
import { DISCOUNT_PROVIDER } from "../../../../icons/discount";
import { Reward } from "../../utils/types";

const RewardCard = ({
  reward,
  isMyReward,
  onClickMove,
}: {
  reward: Reward;
  isMyReward?: boolean;
  onClickMove: () => void;
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded-2xl border border-[#E3E3E3] p-4 pb-[6px] pl-3 pt-[6px]",
        isMyReward ? "bg-white" : "bg-[#F5F5F5]",
      )}
    >
      <div className="flex gap-3">
        <img
          src={DISCOUNT_PROVIDER[reward.icon]}
          alt=""
          className="h-6 w-6 rounded-full"
        />
        <p className="text-sm">{reward.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <img
          src={
            isMyReward
              ? require("../../../../icons/icon-minus.png")
              : require("../../../../icons/icon-plus.png")
          }
          alt=""
          className="h-3 w-3 cursor-pointer object-contain"
          onClick={() => {
            !isMyReward ? trackAddRewardsClick() : trackRemoveRewardsClick();
            onClickMove();
          }}
        />
      </div>
    </div>
  );
};

export default RewardCard;
