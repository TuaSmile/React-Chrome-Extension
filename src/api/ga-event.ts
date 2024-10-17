import { getOrCreateClientId, getOrCreateSessionId } from "../analytics/helper";

const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const MEASUREMENT_ID = `G-EW5XCHSRR8`;
const API_SECRET = `eoceTJUTTMi8CkspDxSHQw`;
const DEFAULT_ENGAGEMENT_TIME_IN_MSEC = 100;

const sendGAEvent = async (eventName: string, params: Record<string, string | number>) => {
  await fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name: eventName,
            params: {
              session_id: await getOrCreateSessionId(),
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
              ...params,
            },
          },
        ],
      }),
    }
  );
};

export const trackTimeInProduct = async (seconds: number) => {
  await sendGAEvent('time_in_product', { time_in_seconds: seconds });
};

export const trackClickThrough = async () => {
  await sendGAEvent('click_through', {});
};

export const trackShareClick = async () => {
  await sendGAEvent('share_click', {});
};

export const trackFeedbackClick = async () => {
  await sendGAEvent('feedback_click', {});
};

export const trackInstaClick = async () => {
  await sendGAEvent('insta_click', {});
};

export const trackNewsletterClick = async () => {
  await sendGAEvent('newsletter_click', {});
};

export const trackIconClick = async () => {
  await sendGAEvent('icon_click', {});
};

export const trackFilterClick = async () => {
  await sendGAEvent('filter_click', {});
};

export const trackNoRewardsClick = async () => {
  await sendGAEvent('no_rewards_click', {});
};

export const trackAddRewardsClick = async () => {
  await sendGAEvent('add_rewards_click', {});
};

export const trackRemoveRewardsClick = async () => {
  await sendGAEvent('remove_rewards_click', {});
};

export const trackIconPreview = async (seconds: number) => {
  await sendGAEvent('icon_preview', { time_in_seconds: seconds });
};

export const trackPageView = async (offersInMyOffers: boolean, offersInOtherOffers: boolean) => {
  let label = '';
  if (offersInMyOffers && offersInOtherOffers) {
    label = 'My Offers and Other Offers';
  } else if (!offersInMyOffers && !offersInOtherOffers) {
    label = 'No My Offers and No Other Offers';
  } else if (!offersInMyOffers && offersInOtherOffers) {
    label = 'No My Offers but Other Offers';
  } else if (offersInMyOffers && !offersInOtherOffers) {
    label = 'My Offers but No Other Offers';
  }
  await sendGAEvent('page_view', { page_view_type: label });
};
