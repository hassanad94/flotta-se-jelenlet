import { Hono } from 'hono'

const app = new Hono()

app.get('/:date', (c) => {

	c.req.param("date") 

	c.req
	return c.json(result)
})


export default app