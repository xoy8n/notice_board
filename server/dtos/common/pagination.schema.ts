import { z } from 'zod';

export function createPaginationQuerySchema(options?: {
  defaultPage?: number;
  defaultSize?: number;
  maxSize?: number;
}) {
  const defaultPage = options?.defaultPage ?? 1;
  const defaultSize = options?.defaultSize ?? 20;
  const maxSize = options?.maxSize ?? 100;

  return z.object({
    page: z
      .string()
      .optional()
      .transform((v) => Number(v ?? defaultPage))
      .refine((v) => Number.isInteger(v) && v > 0, {
        message: 'page는 1 이상의 정수여야 합니다.',
      }),

    size: z
      .string()
      .optional()
      .transform((v) => Number(v ?? defaultSize))
      .refine((v) => Number.isInteger(v) && v > 0 && v <= maxSize, {
        message: `size는 1~${maxSize} 사이의 정수여야 합니다.`,
      }),
  });
}

export const PostsPaginationSchema = createPaginationQuerySchema({
    defaultSize: 20,
    maxSize: 100,
  });
  
export type PostsPaginationSchemaType = z.infer<typeof PostsPaginationSchema>;
