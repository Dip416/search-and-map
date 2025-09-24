const CITY_ID: string = "66b516f373417e1f934fdf22";

const PROPERTY_STATUS_OPTIONS = [
  { label: "Under Construction", value: "0" },
  { label: "Ready to Move", value: "1" },
];
const SORT_OPTIONS = [
  {
    label: "Price (Low to High)",
    value: { sortField: "price", sortOrder: "asc" },
  },
  {
    label: "Price (High to Low)",
    value: { sortField: "price", sortOrder: "desc" },
  },
  {
    label: "Area (Low to High)",
    value: { sortField: "total_area", sortOrder: "asc" },
  },
  {
    label: "Area (High to Low)",
    value: { sortField: "total_area", sortOrder: "desc" },
  },
  {
    label: "Newest",
    value: { sortField: "created_at", sortOrder: "desc" },
  },
  {
    label: "Oldest",
    value: { sortField: "created_at", sortOrder: "asc" },
  },
];

const FURNISHED_STATUS_OPTIONS = [
  { label: "Fully Furnished", value: "2" },
  { label: "Semi Furnished", value: "1" },
  { label: "Unfurnished", value: "0" },
];
const AREAS_SQFT_OPTIONS = Array.from({ length: 12 }, (_, index) => ({
  label: (index + 1) * 500,
  value: (index + 1) * 500,
}));

export {
  CITY_ID,
  PROPERTY_STATUS_OPTIONS,
  SORT_OPTIONS,
  FURNISHED_STATUS_OPTIONS,
  AREAS_SQFT_OPTIONS,
};
