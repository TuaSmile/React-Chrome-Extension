const EmptyOffer = () => {
  return (
    <div className="flex items-center justify-between rounded-2xl border-2 border-[#8A8A8A] bg-white pb-2 pl-3 pr-3 pt-2">
      <img
        src={require("../../../../icons/icon-warning.png")}
        alt=""
        className="w-6 object-contain"
      />
      <div className="text-center font-bold leading-4 text-[#525252]">
        Add your reward schemes below
      </div>
      <div />
    </div>
  );
};

export default EmptyOffer;
