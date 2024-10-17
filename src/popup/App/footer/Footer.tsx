import classNames from "classnames";

const Footer = ({
  tab,
  setTab,
}: {
  tab: "offer" | "reward";
  setTab: React.Dispatch<React.SetStateAction<"offer" | "reward">>;
}) => {
  return (
    <div className="flex overflow-hidden rounded-b-md border-t">
      <div
        className="z-[1] flex flex-1 cursor-pointer flex-col items-center justify-center bg-[#F5F5F5]"
        onClick={() => setTab("offer")}
      >
        <img
          src={
            tab === "offer"
              ? require("../../../icons/icon-offer-fill.png")
              : require("../../../icons/icon-offer.png")
          }
          alt=""
          className="w-9 object-contain"
        />
        <p
          className={classNames(
            "text-xs",
            tab !== "offer" && "text-[#020202AD]",
          )}
        >
          Offers
        </p>
      </div>
      <div
        className="z-[1] flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 bg-[#F5F5F5]"
        onClick={() => setTab("reward")}
      >
        <img
          src={
            tab === "reward"
              ? require("../../../icons/icon-reward-fill.png")
              : require("../../../icons/icon-reward.png")
          }
          alt=""
          className="w-7 object-contain"
        />
        <p
          className={classNames(
            "text-xs",
            tab !== "reward" && "text-[#020202AD]",
          )}
        >
          Reward Schemes
        </p>
      </div>
    </div>
  );
};

export default Footer;
