import { Context, Env, HonoRequest } from "hono";

export const getJelenlet = (date?: Date) => {
  const currentDate = date || new Date();

  return { true: true };
};
