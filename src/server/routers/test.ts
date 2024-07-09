import { z } from 'zod';
import { prisma } from '@server/prisma';
import { createTRPCRouter, publicProcedure } from "../trpc";

export const testRouter = createTRPCRouter({
  addTestData: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const newData = await prisma.test.create({
        data: {
          name: input.name,
        },
      });
      return newData;
    }),
  getTestData: publicProcedure.query(async () => {
    const data = await prisma.test.findMany();
    return data;
  }),
});
