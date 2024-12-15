import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import images from "./images";
import ai from "./ai";
import users from "./users";
import projects from "./project";
import subscription from "./subscription";

import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  const authSecret = c.env?.AUTH_SECRET || process.env.AUTH_SECRET;
  if (!authSecret) {
    throw new Error("AUTH_SECRET is not defined");
  }
  return {
    secret: authSecret,
    ...(authConfig as any),
  };
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/ai", ai)
  .route("/images", images)
  .route("/users", users)
  .route("/projects", projects)
  .route("/subscribe", subscription);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
