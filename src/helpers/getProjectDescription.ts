function getProjectDescription(project: any) {
  // BHK range
  let bhk = "";
  if (project.buildings?.length) {
    const types = project.buildings.map((b: any) => b.building_type);
    const min = Math.min(...types);
    const max = Math.max(...types);
    bhk = min === max ? `${min} BHK` : `${min}-${max} BHK`;
  }

  // Category
  const category = project.category || "";

  // Amenities
  const amenities = project.amenities_length
    ? `With ${project.amenities_length} Amenities`
    : "";

  // Combine
  return [bhk, category, amenities].filter(Boolean).join(" ");
}

export default getProjectDescription;
