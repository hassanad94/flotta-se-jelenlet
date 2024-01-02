
//@dec       Fetch attendances for the given date
//@route     GET /api/jelenlet
//@access    Public

import { Context, Env, HonoRequest } from "hono"



const  getJelenlet = async (date : Date | undefined) => {

	const currentDate = date || new Date()



	res.json(jelenlet)

}
