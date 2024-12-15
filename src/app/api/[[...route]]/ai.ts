import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Client } from "@gradio/client";
import { verifyAuth } from "@hono/auth-js";
import { hf } from "@/lib/huggingFace";

const app = new Hono()
  .post(
    "/generate-image",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      })
    ),
    async (c) => {
      try {
        const { prompt } = c.req.valid("json");
        const response = await hf.textToImage({
          model: "ali-vilab/In-Context-LoRA",
          inputs: prompt,
        });

        if (!response) {
          return c.json({ error: "Image generation failed" }, 404);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        return c.json({
          data: `data:image/png;base64,${base64}`,
        });
      } catch (error) {
        return c.json({ error: "Internal Server Error" }, 500);
      }
    }
  )
  .post(
    "/remove-bg",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        image: z.string(),
      })
    ),
    async (c) => {
      const { image } = c.req.valid("json");
      const client = await Client.connect("briaai/BRIA-RMBG-2.0");

      let imageInput;
      let endpoint: "/text" | "/image";

      if (image.startsWith("http://") || image.startsWith("https://")) {
        imageInput = image;
        endpoint = "/text";
      } else {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        imageInput = Buffer.from(base64Data, "base64");
        endpoint = "/image";
      }

      const result = await client.predict(endpoint, {
        image: imageInput,
      });

      if (!result) {
        return c.json({ error: "Removing image background failed" }, 404);
      }
      return c.json({
        data: result.data,
      });
    }
  );

export default app;
