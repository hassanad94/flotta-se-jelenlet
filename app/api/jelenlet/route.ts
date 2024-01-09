import { NextResponse } from "next/server";
import { db } from "@/utils/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function GET(req: Request) {
  const [rows] = await db.query("SELECT * FROM flotta.test");

  return NextResponse.json({ ...rows });
}

type PostParams = {
  email?: string;
};

export async function POST(req: Request) {
  const { email } = (await req.json()) as PostParams;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  let insertId: number;

  try {
    const [rows] = (await db.query("SELECT id FROM flotta.players WHERE email = ?", [
      email,
    ])) as RowDataPacket[][];

    if (rows.length === 0) {
      return NextResponse.json({ error: "A felhasználó nem található" }, { status: 400 });
    }

    const id = rows[0].id;

    const response = await db.execute("INSERT INTO flotta.attendences (player_id) VALUES (?)", [
      id,
    ]);

    insertId = (response[0] as ResultSetHeader).insertId;
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Hiba történt" }, { status: 500 });
  }

  return NextResponse.json({ id: insertId });
}
