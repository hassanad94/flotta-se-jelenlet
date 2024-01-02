import { Hono } from "hono";
import { z } from "zod";
import { getJelenlet } from "../controllers/getJelenlet";

const app = new Hono();

app.get("/", async (c) => {
  const date = c.req.query("date");

  if (date === undefined) {
    const result = await getJelenlet();
    return c.json({ message: "notStrictEqual", result });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dateSchema = z.string().refine((value) => dateRegex.test(value), {
    message: "Nem jó formátum. Az elvárt YYYY-MM-DD.",
  });

  const parsedDate = dateSchema.safeParse(date);

  if (!parsedDate.success) {
    return c.json({ message: "nem jó dátum formátum adott meg" }, 400);
  }

  const validatedDate = new Date(parsedDate.data);

  const result = getJelenlet(validatedDate);

  return c.json({ message: "jelenlét", date: parsedDate.data });
});

export default app;
