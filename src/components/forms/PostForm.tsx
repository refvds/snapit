import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import FileUploader from '../shared/FileUploader';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import { useCreatePost, useUpdatePost } from '@/lib/appwrite/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

type PostFormProps = {
  post?: Models.Document;
  action: 'create' | 'update';
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isCreateLoading } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdateLoading } = useUpdatePost();
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === 'update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageID: post?.imageID,
        imageURL: post?.imageURL,
      });

      if (!updatedPost) {
        toast({ title: 'Please try again' });
      }

      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({ title: 'Please, try again' });
    }

    navigate('/');
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-9 w-full max-w-5xl'>
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea className='shad-textarea custom-scrollbar' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageURL} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add location</FormLabel>
              <FormControl>
                <Input className='shad-input' type='text' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add tags (separeted by comma " , ")</FormLabel>
              <FormControl>
                <Input className='shad-input' type='text' placeholder='Art, Memes, Learn, Flower' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-end gap-4'>
          <Button className='shad-button_dark_4' type='button'>
            Cancel
          </Button>
          <Button
            className='shad-button_primary whitespace-nowrap'
            type='submit'
            disabled={isCreateLoading || isUpdateLoading}
          >
            {isCreateLoading || (isUpdateLoading && 'Loading...')}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
