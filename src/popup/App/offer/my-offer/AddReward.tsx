const AddReward = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-[#8A8A8A] bg-white pb-2 pl-3 pr-3 pt-2"
      onClick={onClick}
    >
      <img
        src={require("../../../../icons/icon-warning.png")}
        alt=""
        className="w-6 object-contain"
      />
      <div>
        <div className="text-center font-bold leading-4 text-[#525252]">
          Add reward schemes to
        </div>
        <div className="text-center font-bold leading-4 text-[#525252]">
          discover offers you can access
        </div>
      </div>
      <img
        src={require("../../../../icons/icon-arrow-right.png")}
        alt=""
        className="w-6 object-contain"
      />
    </div>
  );
};

export default AddReward;
