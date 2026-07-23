import { TELANGANA_DATA } from "./telanganaData";

const FEASIBILITY_KEY = "nsv_district_feasibility";

export interface DistrictFeasibility {
  districtName: string;
  enabled: boolean;
}

/**
 * Get all district feasibility statuses.
 * All districts are ENABLED by default.
 */
export function getDistrictFeasibilityList(): DistrictFeasibility[] {
  if (typeof window === "undefined") {
    return TELANGANA_DATA.map((d) => ({ districtName: d.name, enabled: true }));
  }

  try {
    const stored = localStorage.getItem(FEASIBILITY_KEY);
    if (stored) {
      const parsed: DistrictFeasibility[] = JSON.parse(stored);
      // Merge with TELANGANA_DATA in case new districts were added
      return TELANGANA_DATA.map((d) => {
        const found = parsed.find((p) => p.districtName.toLowerCase() === d.name.toLowerCase());
        return {
          districtName: d.name,
          enabled: found ? found.enabled : true, // Default enabled!
        };
      });
    }
  } catch {
    // ignore
  }

  // Default: ALL DISTRICTS ENABLED!
  return TELANGANA_DATA.map((d) => ({ districtName: d.name, enabled: true }));
}

/**
 * Toggle or set district feasibility status
 */
export function setDistrictFeasibility(districtName: string, enabled: boolean): DistrictFeasibility[] {
  const current = getDistrictFeasibilityList();
  const updated = current.map((item) =>
    item.districtName.toLowerCase() === districtName.toLowerCase()
      ? { ...item, enabled }
      : item
  );

  if (typeof window !== "undefined") {
    localStorage.setItem(FEASIBILITY_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nsv_feasibility_change"));
  }

  return updated;
}

/**
 * Check if a specific district is currently enabled
 */
export function isDistrictFeasible(districtName: string): boolean {
  if (!districtName) return true;
  const list = getDistrictFeasibilityList();
  const found = list.find((item) => item.districtName.toLowerCase() === districtName.toLowerCase());
  return found ? found.enabled : true;
}
