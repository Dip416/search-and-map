function formatPriceRange(project: {
  buildings?: { building_expected_price: number }[];
  price?: number;
}) {
  let min: number | undefined;
  let max: number | undefined;

  if (project?.buildings && project?.buildings?.length > 0) {
    const prices = project.buildings.map((b) => b.building_expected_price);
    min = Math.min(...prices);
    max = Math.max(...prices);
  } else if (project?.price) {
    min = max = project?.price;
  } else {
    return null; // no price info
  }

  const format = (value: number) => {
    if (value >= 1_00_00_000) return `${(value / 1_00_00_000).toFixed(2)} Cr`;
    if (value >= 1_00_000) return `${(value / 1_00_000).toFixed(2)} L`;
    return value.toString();
  };

  return min === max
    ? `₹ ${format(min)}*`
    : `₹ ${format(min)} - ${format(max)}*`;
}

export default formatPriceRange;
