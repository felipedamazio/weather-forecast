/** @format */

export function convertDateString(date: string) {
    let corretDate = {
      year: date.split("-").shift(),
      month: date.split("-")[1],
      day: date.split("-").pop(),
    };
  
    let acresDay = Number(corretDate.day) + 1;
    let formatedDate = `${corretDate.year}-${corretDate.month}-${acresDay.toString()}`;
    const fullDateFormated = new Date(formatedDate);
  
    const finalDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
    }).format(fullDateFormated);
  
    return finalDate;
  }
  