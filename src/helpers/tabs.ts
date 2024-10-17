import { tabs } from "webextension-polyfill";

export const getCurrentTab = async () => {
  const list = await tabs.query({ active: true, currentWindow: true });

  return list[0];
};
