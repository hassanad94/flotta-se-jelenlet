import { db } from "@/utils/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name } = (await req.json()) as { email: string; name: string; image: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const [rows] = (await db.query("SELECT id FROM flotta.players WHERE email = ?", [
      email,
    ])) as RowDataPacket[][];

    if (rows.length > 0) {
      return NextResponse.json({ id: rows[0].id });
    }

    const response = await db.execute("INSERT INTO flotta.players (email, name) VALUES (?, ?)", [
      email,
      name,
    ]);

    const insertId = (response[0] as ResultSetHeader).insertId;

    return NextResponse.json({ id: insertId });
  } catch (error) {
    console.error("Post User", error);
  }

  return NextResponse.json({ ok: true });
}
