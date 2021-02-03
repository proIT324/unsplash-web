import { Photo } from '../../types'

export interface PhotoListProps {
  query: string;
}

export interface PinnedPhotosResponse {
  photos: Array<Photo>;
}

export interface SearchPhotosResponse {
  total: number;
  totalPages: number;
  photos: Array<Photo>;
}

export interface PhotoListItem extends Photo {
  pinned: boolean;
}