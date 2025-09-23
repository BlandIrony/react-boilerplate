export function replaceLast(str: string, pattern: string | RegExp, replacement: string) {
  const match = typeof pattern === "string" ? pattern : (str.match(new RegExp(pattern.source, "g")) || []).slice(-1)[0];
  if (!match)
    return str;
  const last = str.lastIndexOf(match);
  return last !== -1 ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}` : str;
}

export function ordinalSuffix(i: number): string {
  const j = i % 10;
  const k = i % 100;
  return (j === 1 && k !== 11)
    ? `${i}st`
    : (j === 2 && k !== 12)
        ? `${i}nd`
        : (j === 3 && k !== 13)
            ? `${i}rd`
            : `${i}th`;
}

type formats = "Jan 1, 2000" | "Jan 1, 2000 12:00PM GMT" | "1st January, 2000";

export function Format(format: formats, date?: string) {
  if (!date)
    return;
  const dt = new Date(date);
  let result = date;
  switch (format) {
    case "Jan 1, 2000": {
      const dt_string = dt.toDateString();
      const dt_string_truncate_weekday = dt_string.substring(3);
      const formatted = replaceLast(dt_string_truncate_weekday, " ", ", ");
      result = formatted;
      break;
    }

    case "Jan 1, 2000 12:00PM GMT": {
      const dt_string = dt.toString();
      // const dt_string_truncate_weekday = dt_string.substring(3)
      // const formatted = replaceLast(dt_string_truncate_weekday, " ", ", ")
      // result = formatted
      result = dt_string;
      break;
    }

    case "1st January, 2000": {
      const dt_string = dt.toDateString();
      const formatted = dt_string.substring(3);
      const dt_break_down = formatted.split(" ");
      const dt_merge = `${ordinalSuffix(Number(dt_break_down[2]))} ${dt.toLocaleString("default", { month: "long" })}, ${
        dt_break_down[3]
      }`;
      result = dt_merge;
      break;
    }
  }
  return result;
}

export function TimeToReadArticle(article: number) {
  const wordsPerMinute = 200; // Average case.
  if (article <= 0)
    return "";
  const value = Math.ceil(article / wordsPerMinute);
  return `${value} Min read`;
}
