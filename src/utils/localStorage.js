const PREFIX = "luxora:";

export function getItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable — fail silently */
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* noop */
  }
}
