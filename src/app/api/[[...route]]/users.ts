import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import bycrypt from "bcryptjs";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(4).max(20),
    })
  ),
  async (c) => {
    const { name, email, password } = c.req.valid("json");
    const hasedPassowrd = await bycrypt.hash(password, 12);
    const query = await db.select().from(users).where(eq(users.email, email));

    if (query[0]) {
      return c.json({ error: "Email already exist" }, 400);
    }

    await db.insert(users).values({ email, name, password: hasedPassowrd });

    return c.json(null, 200);
  }
);

export default app;
