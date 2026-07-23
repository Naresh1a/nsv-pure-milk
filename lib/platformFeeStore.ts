export interface PlatformFeeSettings {
  enabled: boolean;
  amount: number; // e.g. 5 for ₹5
  label: string;
}

const STORAGE_KEY = "nsv_platform_fee_settings";

const defaultSettings: PlatformFeeSettings = {
  enabled: true,
  amount: 5,
  label: "Platform & Handling Fee",
};

export function getPlatformFeeSettings(): PlatformFeeSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
}

export function setPlatformFeeSettings(enabled: boolean, amount: number): PlatformFeeSettings {
  const updated: PlatformFeeSettings = {
    enabled,
    amount,
    label: "Platform & Handling Fee",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
