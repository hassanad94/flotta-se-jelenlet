import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import axios from "axios";

import { firstDayOfWeek } from "@/utils/date";

type Jelenlet = {
  name: string;
  count: number;
};

const getJelenlet = async (date?: Date) => {
  const apiURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/";

  const startofWeek = date || firstDayOfWeek();

  try {
    console.log(`${apiURL}/jelenlet?date=${startofWeek}`);
    const response = await axios.get<Jelenlet[]>(
      `${apiURL}/jelenlet?date=${startofWeek}`
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function Explorer() {
  const data = (await getJelenlet()) || [];

  console.log("get jelenlet", data);

  return (
    <div className="w-full p-6 flex flex-col items-start">
      <select className="border self-end border-gray-300 rounded-full text-gray-600 h-10 px-5 text-center bg-white hover:border-gray-400 focus:outline-none appearance-none">
        <option value="2024-01-22">Jan 22 - Jan 26</option>
      </select>

      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-lg font-medium">Jelenlét</h1> */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Játékos</TableHead>
            <TableHead>Részvétel</TableHead>
            <TableHead>Állapot</TableHead>
            <TableHead className="text-right">Hétvégén Elérhető</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map((jelenlet) => {
              return (
                <TableRow key={jelenlet.name}>
                  <TableCell>{jelenlet.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1rounded-md">
                      <TagIcon className="w-4 h-4 inline-block mr-1" />3 /{" "}
                      {jelenlet.count}
                    </span>
                  </TableCell>
                  <TableCell>Egészséges</TableCell>
                  <TableCell className="text-right">Ismeretlen</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function TagIcon(props: any) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}
