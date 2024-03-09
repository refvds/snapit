import { z } from 'zod';

export const SignupValidation = z.object({
  name: z.string().min(2, { message: 'Too short' }).max(16, { message: 'Too long' }),
  username: z.string().min(2, { message: 'Too short' }).max(25, { message: 'Too long' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});
