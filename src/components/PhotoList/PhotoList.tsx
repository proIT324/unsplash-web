import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from "react-infinite-scroller";
import axios from 'axios';
import _ from 'lodash';
// import { Photo } from "../../types"
import { PhotoListItem, PhotoListProps, PinnedPhotosResponse, SearchPhotosResponse } from "./PhotoList.d"
import { PhotoItem } from '../PhotoItem';

const PhotoList: React.FC<PhotoListProps> = ({ query }) => {
  const [photos, setPhotos] = useState<Array<PhotoListItem>>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchPinnedPhotos = async () => {
      try {
        if (!_.isEmpty(query)) {
          const res = await axios.get<PinnedPhotosResponse>(`${process.env.REACT_APP_BASE_URL}/pin`);
          setPhotos(res.data.photos.map(photo => ({ ...photo, pinned: true })));
          setHasMore(true);
        } else {
          setPhotos([]);
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPinnedPhotos();
  }, [query]);

  const loadMore = async (page: number) => {
    try {
      const res = await axios.get<SearchPhotosResponse>(`${process.env.REACT_APP_BASE_URL}/search?query=${query}&page=${page}&perPage=10`);
      setPhotos(_.uniqBy([...photos, ...res.data.photos.map(photo => ({ ...photo, pinned: false }))], 'photoId'));
      setHasMore(page < res.data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  const onPin = async (photoId: string) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/pin`, { photoId: photoId });
      setPhotos(photos.map(photo => photo.photoId === photoId ? ({ ...photo, pinned: true }) : photo));
    } catch (error) {
      console.log(error);
    }
  }

  const onUnpin = async (photoId: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/pin`, { data: { photoId: photoId } });
      setPhotos(photos.map(photo => photo.photoId === photoId ? ({ ...photo, pinned: false }) : photo));
    } catch (error) {
      console.log(error);
    }
  }

  return useMemo(() => (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<h4 key={0}>loading...</h4>}
    >
      {
        photos.map(({ pinned, ...photo }) => (
          <PhotoItem key={photo.photoId} photo={photo} pinned={pinned} onPin={onPin} onUnpin={onUnpin} />
        ))
      }
    </InfiniteScroll>
  ), [photos, hasMore])
}

export default PhotoList;