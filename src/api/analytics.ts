import { getOrCreateClientId, getOrCreateSessionId } from "../analytics/helper";

const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const MEASUREMENT_ID = `G-EW5XCHSRR8`;
const API_SECRET = `eoceTJUTTMi8CkspDxSHQw`;
const DEFAULT_ENGAGEMENT_TIME_IN_MSEC = 100;

export const clickButtonEvent = async (id: string, url?: string) => {
  await fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name: "button_clicked",
            params: {
              session_id: await getOrCreateSessionId(),
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
              id,
              href: url,
            },
          },
        ],
      }),
    },
  );
};

export const pageView = async (page_title: string, page_location: string) => {
  await fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name: "page_view",
            params: {
              session_id: await getOrCreateSessionId(),
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
              page_title,
              page_location,
            },
          },
        ],
      }),
    },
  );
};

export const installEvent = async () => {
  await fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name: "install",
            params: {
              session_id: await getOrCreateSessionId(),
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            },
          },
        ],
      }),
    },
  );
};

export const uninstallEvent = async () => {
  await fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name: "uninstall",
            params: {
              session_id: await getOrCreateSessionId(),
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            },
          },
        ],
      }),
    },
  );
};

export const sessionEvent = async () => {
  await fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name: "session_longer_than_10",
            params: {
              session_id: await getOrCreateSessionId(),
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            },
          },
        ],
      }),
    },
  );
};
