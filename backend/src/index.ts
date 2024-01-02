import { Hono } from 'hono'
import jelenlet from '../routes/jelenlet'

const app = new Hono()


app.get('/hello', (c) => {

	return c.json({ message: 'Hello World sss' })
})

app.route( "/api/jelenlet", jelenlet )
Bun.serve({ fetch: app.fetch, port: process.env.API_PORT || 3030 ,})
console.log(`Listening on localhost: ${process.env.API_PORT || 3030 }`);


export default app
