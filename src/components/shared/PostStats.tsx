import { useGetCurrentUser, useLikePost, useRemoveSavedPost, useSavePost } from '@/lib/appwrite/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: removeSavedPost, isPending: isRemovingSavedPost } = useRemoveSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPost = currentUser?.save.find((saved: Models.Document) => saved.post.$id === post.$id);

  useEffect(() => {
    setSaved(!!savedPost);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPost) {
      setSaved(false);
      removeSavedPost(savedPost.$id);
    } else {
      setSaved(true);
      savePost({ postId: post.$id, userId });
    }
  };

  return (
    <div className='flex justify-between items-center z-20'>
      <div className='flex gap-2 mr-5'>
        <img
          className='cursor-pointer'
          src={checkIsLiked(likes, userId) ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'}
          alt='like'
          width={20}
          height={20}
          onClick={handleLikePost}
        />
        <p className='small-medium lg:base-medium'>{likes.length}</p>
      </div>
      <div className='flex gap-2'>
        {isSavingPost || isRemovingSavedPost ? (
          <Loader />
        ) : (
          <img
            className='cursor-pointer'
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            alt='save'
            width={20}
            height={20}
            onClick={handleSavePost}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
