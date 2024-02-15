import { Hono } from 'hono'
import { logger } from 'hono/logger'


const app = new Hono();

app.use(logger())

app.get('/', (c) => {
  return c.json({data: 'Ciao Marìe, sei proprio bella!'});
})

export default {
  fetch: app.fetch,
  port: process.env.PORT || 3030,
} 
