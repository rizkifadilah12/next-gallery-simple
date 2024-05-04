import { z } from "zod";

export const uploadSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Only Image Are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must len than 4mb",
    }),
});
export const editSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Only Image Are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must len than 4mb",
    })
    .optional(),
});
