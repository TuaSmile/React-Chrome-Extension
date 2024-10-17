import { Reward, Rewards } from "../../utils/types";
import RewardCard from "../reward-card";

const OtherReward = ({
  rewards,
  myRewards,
  searchTerm,
  onAddToMyRewards,
  setSearchTerm,
}: {
  rewards: Rewards;
  myRewards: Reward[];
  searchTerm: string;
  onAddToMyRewards: (category: string, rewardBrowser: string) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRewards = Object.entries(rewards).reduce(
    (acc, [category, rewardsList]) => {
      const myRewardsSet = new Set(myRewards.map((reward) => reward.name));
      const filteredList = rewardsList.filter(
        (reward) =>
          !myRewardsSet.has(reward.name) &&
          (reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.toLowerCase().includes(searchTerm.toLowerCase())),
      );
      if (filteredList.length > 0) {
        acc[category] = filteredList;
      }
      return acc;
    },
    {} as Rewards,
  );

  return (
    <div className="mt-[-40px] flex flex-col gap-2 rounded-t-3xl border-t border-[#E3E3E3] bg-[#FFFFFF] pb-8 pl-6 pr-6 pt-3">
      <div className="text-center font-bold">Other Reward Schemes</div>

      <div className="flex gap-2 rounded-2xl border border-[#E3E3E3] p-4 pb-2 pt-2">
        <img
          src={require("../../../../icons/icon-search.png")}
          alt=""
          className="w-3 object-contain"
          onClick={() => {}}
        />
        <input
          placeholder="Search for reward scheme...."
          className="w-full text-sm focus:outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {Object.entries(filteredRewards).map(([category, rewards], index) => (
        <div key={`other-reward-${index}`} className="mb-2 flex flex-col gap-2">
          <p className="text-sm">{category}</p>
          {rewards.map((reward, rewardIndex) => (
            <RewardCard
              key={`other-reward-${index}-${rewardIndex}`}
              reward={reward}
              onClickMove={() => onAddToMyRewards(category, reward.name)}
            />
          ))}
        </div>
      ))}

      <p
        className="mt-2 cursor-pointer text-center text-sm text-[#999999] underline"
        onClick={() =>
          window.open("https://form.typeform.com/to/QLJ7OWYc", "_blank")
        }
      >
        My Reward Scheme is not listed
      </p>
    </div>
  );
};

export default OtherReward;
