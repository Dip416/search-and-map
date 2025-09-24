export function cleanFilters(filters: Record<string, any>) {
  const cleaned: Record<string, any> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (typeof value === "string" && value.trim() === "") return;
    if (Array.isArray(value) && value.length === 0) return;
    if (typeof value === "number" && value === 0) return;

    cleaned[key] = value;
  });

  // 🟢 Special case for price
  if (cleaned.minPrice === 1000000 && cleaned.maxPrice === 50000000) {
    delete cleaned.minPrice;
    delete cleaned.maxPrice;
  }

  return cleaned;
}
