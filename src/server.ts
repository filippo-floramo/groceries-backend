import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from "hono/cors";
import { connectDB, disconnectDb } from './config/db';


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

app.get('/', (c) => {
  return c.text("jamm 'fa a spes ja");
})

const server = Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT || 3000,
})

console.log(`Listening on port ${server.url}`);

const shutdown = async () => {
  console.log("Shutting down...");
  disconnectDb().then(() => process.exit());
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);