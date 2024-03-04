import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from "hono/cors";
import { connectDB, disconnectDb } from './config/db';
import { ListRoute } from './api/list';

const app = new Hono().basePath('/api');

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


const lol = Bun.serve({
  port: 3000,
  fetch: app.fetch,
  hostname: Bun.env.ENVIRONMENT === "development" ? "192.168.1.6" : "0.0.0.0",
})

console.table({
  port: lol.port,
  hostname: lol.hostname
});

const shutdown = async () => {
  console.log("Shutting down...");
  disconnectDb().then(() => process.exit());
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);