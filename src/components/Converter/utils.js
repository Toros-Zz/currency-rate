export const getNornalNum = (str) => {
  const newStr = str.replaceAll(/[,]/gi, ".");
  const regEx = /[^\d+.]/g;
  const numArr = newStr.replaceAll(regEx, "").split("");
  const length = numArr.length;

  if (length === 1 && numArr[0] === ".") {
    return "0.";
  }

  const index = numArr.indexOf(".");
  const lastIndex = numArr.lastIndexOf(".");

  if (index === lastIndex && index === 0) {
    return +numArr.join("");
  }

  if (index === lastIndex) {
    return numArr.join("");
  }

  const begin = numArr.slice(0, index + 1).join("");
  const end = numArr
    .slice(index + 1)
    .join("")
    .replaceAll(/\D/g, "");

  return +(begin + end);
};
