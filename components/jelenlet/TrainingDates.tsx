import { FC } from "react";
import axios from "axios";

const getTrainingDates = async () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  let data: string[];

  try {
    const res = await axios.get(`${apiURL}/jelenlet/getTrainingsDates`);

    data = res.data;
  } catch (error) {
    return (data = []);
  }

  return data;
};

export const TrainingDates: FC = async () => {
  const trainingDates = await getTrainingDates();

  return <div>TrainingDates</div>;
};
