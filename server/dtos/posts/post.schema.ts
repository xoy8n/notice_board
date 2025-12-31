import { z } from 'zod';

export const CreatePostSchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, '제목은 필수 입력 항목입니다.'),
  
    content: z
      .string()
      .trim()
      .min(1, '내용은 필수 입력 항목입니다.'),
  });

  export type CreatePostInput = z.infer<typeof CreatePostSchema>;

  export const UpdatePostSchema = z
  .object({
    title: z.string().trim().min(1, '제목은 필수 입력 항목입니다.').optional(),
    content: z.string().trim().min(1, '내용은 필수 입력 항목입니다.').optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.content !== undefined,
    {
      message: '수정할 값이 하나 이상 필요합니다.',
    }
  ).transform(
    (data) => {
      const result: {
        title?: string;
        content?: string;
      } = {};

      if (data.title !== undefined) {
        result.title = data.title;
      }

      if (data.content !== undefined) {
        result.content = data.content;
      }

      return result;
    }
  );

  export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;