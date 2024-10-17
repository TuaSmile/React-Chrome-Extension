import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";

import {
  trackFeedbackClick,
  trackInstaClick,
  trackNewsletterClick,
  trackShareClick,
} from "../../../api/ga-event";

const Header = ({ onClose }: { onClose: () => void }) => {
  const [isShowToast, setIsShowToast] = useState(false);
  const showToast = () => {
    trackShareClick();
    setIsShowToast(true);
  };

  useEffect(() => {
    if (isShowToast) {
      setTimeout(() => setIsShowToast(false), 2000);
    }
  }, [isShowToast]);

  return (
    <div className="z-10 flex items-center justify-between pl-4 pr-4">
      <div className="flex gap-1">
        <img
          src={require("../../../icons/icon-message.png")}
          alt=""
          className="w-6 cursor-pointer object-contain"
          onClick={() => {
            trackFeedbackClick();
            window.open("https://form.typeform.com/to/zRW3O4J9", "_blank");
          }}
          data-tooltip-id="message-tooltip"
          data-tooltip-content="Share feedback"
          data-tooltip-place="bottom-start"
        />
        <Tooltip id="message-tooltip" />
        <img
          src={require("../../../icons/icon-instagram.png")}
          alt=""
          className="w-6 cursor-pointer object-contain"
          onClick={() => {
            trackInstaClick();
            window.open("https://www.instagram.com/clever_customer/", "_blank");
          }}
          data-tooltip-id="instagram-tooltip"
          data-tooltip-content="Follow us on Instagram"
          data-tooltip-place="bottom-start"
        />
        <Tooltip id="instagram-tooltip" />
        <img
          src={require("../../../icons/icon-newsletter.png")}
          alt=""
          className="mt-[-2px] w-5 cursor-pointer object-contain"
          onClick={() => {
            trackNewsletterClick();
            window.open(
              "https://manage.kmail-lists.com/subscriptions/subscribe?a=UviX2x&g=ShJMM6",
              "_blank",
            );
          }}
          data-tooltip-id="newsletter-tooltip"
          data-tooltip-content="Sign up to our weekly newsletter"
          data-tooltip-place="bottom-start"
        />
        <Tooltip id="newsletter-tooltip" />
      </div>
      <div className="pr-6">
        <img
          src={require("../../../icons/clever-logo.png")}
          className="cursor-pointer"
          alt=""
          width={110}
        />
      </div>
      <div className="flex gap-2">
        <CopyToClipboard
          text="https://chromewebstore.google.com/detail/clever-all-your-rewards-i/ajcmnphmafjbhmdbmmbikppkbipjimjf"
          onCopy={showToast}
          data-tooltip-id="share-tooltip"
          data-tooltip-content="Share the extension"
          data-tooltip-place="bottom-end"
        >
          <img
            src={require("../../../icons/icon-share.png")}
            alt=""
            className="w-6 cursor-pointer object-contain"
          />
        </CopyToClipboard>
        <Tooltip id="share-tooltip" />
        <img
          src={require("../../../icons/icon-close.png")}
          alt=""
          className="w-4 cursor-pointer object-contain"
          onClick={onClose}
        />
      </div>

      {isShowToast && (
        <div className="absolute left-0 right-0 top-0 z-[9999] flex h-[620px] items-center justify-center bg-[#FFFFFF8F]">
          <div className="rounded-full bg-[#AFE1AFDD] px-6 py-4 text-[#020202]">
            <div>Link to download the Clever extension has</div>
            <div>been copied 🔗 Go ahead and share it!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
