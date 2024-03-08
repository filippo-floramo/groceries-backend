import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from "hono/cors";
import { connectDB, disconnectDb } from './config/db';
import { ListRoute } from './api/list';


export const app = new Hono().basePath('/api');

connectDB();

app.use(logger(), prettyJSON());

// Cors
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

app.get('/', async (c) => {
  return c.json("affammoc");
});

app.route('/lists', ListRoute);

export const networkIp = Object.values(require("os").networkInterfaces())
  .flat()
  .filter((n: any) => n.family === "IPv4" && !n.internal)
  .map((a: any) => a.address);

const server = Bun.serve({
  port: 3000,
  fetch: app.fetch,
  hostname: Bun.env.ENVIRONMENT === "development" ? networkIp[0] : "0.0.0.0",
})



console.table({
  port: server.port,
  hostname: server.hostname
});

const shutdown = async () => {
  console.log("Shutting down...");
  disconnectDb().then(() => process.exit());
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);