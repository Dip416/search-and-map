function formatViews(count: number) {
  if (count >= 1_00_00_000) return `${(count / 1_00_00_000).toFixed(2)}Cr`; // Crore
  if (count >= 1_00_000) return `${(count / 1_00_000).toFixed(1)}L`; // Lakh
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`; // Million
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`; // Thousand
  return count.toString();
}

export default formatViews;
