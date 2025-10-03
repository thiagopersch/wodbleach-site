import { z } from 'zod';

export const loginSchema = z.object({
  accountname: z
    .string()
    .min(1, 'Account name is required')
    .max(15, 'Account name cannot exceed 15 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Account name can only contain letters and numbers'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(50, 'Password cannot exceed 50 characters'),
});

export const registerSchema = z.object({
  accountname: z
    .string()
    .min(1, 'Account name is required')
    .max(15, 'Account name cannot exceed 15 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Account name can only contain letters and numbers'),
  password: z.string().min(4, 'Password must be at least 4 characters').max(50, 'Password cannot exceed 50 characters'),
  email: z.email('Invalid email address').optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
