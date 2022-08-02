function DateToString(date: Date){
  let year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  let month_ = month < 10 ? "0" + month.toString() : month.toString();
  let day = date.getDate();
  let day_ = day < 10 ? "0" + day.toString() : day.toString();
  let weekday = date.getDay();
  let weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return (year + "-" + month_ + "-" + day_ + "(" + weekdays[weekday] + ")");
}

function InputStringToDate(date: string){
  let year = parseInt(date.substring(0, 4));
  let month = parseInt(date.substring(4, 6)) - 1;
  let day = parseInt(date.substring(6, 8));
  return new Date(year, month, day);
}

function StringToDate(date: string){
  let year = parseInt(date.substring(0, 4));
  let month = parseInt(date.substring(5, 7)) - 1;
  let day = parseInt(date.substring(8, 10));
  return new Date(year, month, day);
}

export { DateToString, InputStringToDate, StringToDate };