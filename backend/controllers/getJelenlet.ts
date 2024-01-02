import { Context, Env, HonoRequest } from "hono";
import { connection } from "../database";

export const getJelenlet = async (date?: Date) => {
  const currentDate = date || new Date();

  const [rows] = await connection.query("SELECT * FROM flotta.test");

  return { rows };
};
