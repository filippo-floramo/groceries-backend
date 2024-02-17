import { Hono } from 'hono'
import { list } from '../controllers';

const listRoute = new Hono();


listRoute.get('/', (c) => list.getLists(c));
listRoute.post('/', (c) => list.createList(c));


export default listRoute;