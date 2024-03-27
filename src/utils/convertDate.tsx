/** @format */

export function convertDate(date: string) {
  const fullDateFormated = new Date(date);

  const finalDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(fullDateFormated);

  return finalDate;
}
