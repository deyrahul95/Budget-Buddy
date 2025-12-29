import { ITimeStamps, TimeStampFilter } from "@/types";

export const calculateTimeStamp = ({
  filter,
}: TimeStampFilter): ITimeStamps => {
  const now = new Date();

  let monthsToSubtract = 0;

  switch (filter) {
    case "1m":
      monthsToSubtract = 0;
      break;
    case "3m":
      monthsToSubtract = 2;
      break;
    case "6m":
      monthsToSubtract = 5;
      break;
    case "1y":
      monthsToSubtract = 11;
      break;
  }

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() - monthsToSubtract,
    1
  );
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

  return {
    startTimeStamp: Math.floor(startOfMonth.getTime() / 1000),
    endTimeStamp: Math.floor(endOfMonth.getTime() / 1000),
  };
};


export function getDateBounds() {
  const today = new Date();
  today.setHours(0,0,0);

  const oneMonthAgo = new Date(today);
  oneMonthAgo.setDate(today.getDate() - 30);

  return {
    minDate: oneMonthAgo,
    maxDate: today,
  };
}