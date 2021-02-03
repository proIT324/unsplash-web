import { Photo } from "../../types";

export interface PhotoItemProps {
  photo: Photo;
  pinned: boolean;
  onPin: (photoId: string) => void;
  onUnpin: (photoId: string) => void;
}