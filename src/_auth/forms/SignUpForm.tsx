import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignupValidation } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { useCreateUserAccount, useSignInAccount } from '@/lib/appwrite/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

const SignUpForm = () => {
  const { toast } = useToast();
  const { mutateAsync: createUserAccount, isPending } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values);
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: 'Sign up failed. Please try again.' });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: 'Sign in failed. Please try again.' });
    }
    console.log(newUser);

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast({ title: 'Sign up failed1. Please try again.' });
    }
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>To use Snapit enter your details</p>
        <form className='flex flex-col gap-5 w-full mt-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className='shad-input' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className='shad-input' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className='shad-input' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className='shad-input' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='shad-button_primary' type='submit'>
            {isPending ? (
              <p className='flex-center gap-2'>
                <Loader />
                Loading...
              </p>
            ) : (
              'Sign up'
            )}
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Already have an account ?
            <Link className='text-primary-500 text-small-semibold ml-2' to='/sign-in'>
              Log in{' '}
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
