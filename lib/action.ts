"use server";

import { uploadSchema, editSchema } from "@/shcema/validateSchema";
import { prisma } from "@/lib/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getImageById } from "./data";
import { redirect } from "next/navigation";
export const uploadImage = async (prevState: any, formData: FormData) => {
  const validatedField = uploadSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedField.success) {
    return {
      error: validatedField.error.flatten().fieldErrors,
    };
  }

  const { title, image } = validatedField.data;
  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  try {
    await prisma.upload.create({
      data: {
        title,
        image: url,
      },
    });
  } catch (error) {
    return { message: "fail create data" };
  }
  revalidatePath("/");
  redirect("/");
};

export const deleteImage = async (id: string) => {
  const data = await getImageById(id);
  if (!data) return { message: "no data found" };
  await del(data.image);
  try {
    await prisma.upload.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "faile to delete data" };
  }
  revalidatePath("/");
};
export const updateImage = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const validatedField = editSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedField.success) {
    return {
      error: validatedField.error.flatten().fieldErrors,
    };
  }
  const data = await getImageById(id);
  if (!data) return { message: "no data found" };
  const { title, image } = validatedField.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imagePath = url;
  }

  try {
    await prisma.upload.update({
      data: {
        title,
        image: imagePath,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "fail update data" };
  }
  revalidatePath("/");
  redirect("/");
};
