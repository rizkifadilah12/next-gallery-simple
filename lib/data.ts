import { prisma } from "@/lib/prisma";

export const getImage = async () => {
  try {
    const res = await prisma.upload.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res;
  } catch (error) {
    throw new Error("fail to fetch data");
  }
};
export const getImageById = async (id: string) => {
  try {
    const res = await prisma.upload.findUnique({
      where: { id },
    });
    return res;
  } catch (error) {
    throw new Error("fail to fetch data");
  }
};
