export type ProjectImageItem = {
  _id: string;
  image: string;
  image_name: string;
  image_position: number;
};
export type ProjectImages = {
  _id: string;
  project_id: string;
  __v: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string | null;
  images: ProjectImageItem[];
};
export type Building = {
  building_type: number;
  building_interior_area: number;
  building_outer_area: number;
  building_expected_price: number;
};
export type Property = {
  _id: string;
  name: string;
  iframe: string;
  state_id: string;
  location: string;
  lat: string;
  long: string;
  project_type: number;
  possession_date: string;
  category_id: string;
  is_featured: boolean;
  created_at: string;
  slug: string;
  is_sample_house_ready: number;
  buildings: Building[];
  project_images: ProjectImages;
  type_project: boolean;
  category: string;
  price: number;
  total_area: number;
  is_saved: boolean;
  group_name: string[];
  view_count: number;
  amenities_length: number;
};

export type Filters = {
  page: number;
  searchQuery?: string;
  group_id?: string;
  maxPrice?: number;
  minPrice?: number;
  status?: number;
  three_d?: number;
  is_sample_house_ready?: number;
  furnished_status?: number;
  minBedRoom?: number;
  maxBedRoom?: number;
  minTotalArea?: number;
  maxTotalArea?: number;
  areas?: string[];
  category_ids?: string[];
  drawnArea?: { lat: number; long: number }[];
};
