import React from 'react';
import { IconButton } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { Container, Image, Pin } from './PhotoItem.styled';
import { PhotoItemProps } from "./PhotoItem.d";

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, pinned, onPin, onUnpin }) => {
  const onPinClick = () => {
    try {
      if (pinned) {
        onUnpin(photo.photoId);
      } else {
        onPin(photo.photoId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Pin>
        <IconButton aria-label="pin" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={onPinClick}>
          {
            pinned ? <Favorite /> : <FavoriteBorder />
          }
        </IconButton>
      </Pin>
      <Image src={photo.smallUrl} alt={photo.photoId} />
    </Container>
  )
}

export default PhotoItem;