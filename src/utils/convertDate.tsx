/** @format */

export function convertDate(date: string) {
  let corretDate = {
    year: date.split("-").shift(),
    month: date.split("-")[1],
    day: date.split("-").pop(),
  };

  let acresDay = Number(corretDate.day);
  const fullDateFormated = `${corretDate.year}-${
    corretDate.month
  }-${acresDay.toString()}`;

  return fullDateFormated;
}
