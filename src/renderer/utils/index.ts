export default function getCustomClassNames(classNames, stylesObj) {
  return classNames.map((name) => stylesObj[name]);
}

export function getFormattedPhoneNumber(value: string) {
  const arr = [];
  for (let i = 0; i <= value.length - 1; i += 3) {
    if (i <= 3) {
      arr.push(value.slice(i, i + 3));
    } else {
      arr.push(value.slice(i, value.length));
      break;
    }
  }
  return arr.join('-');
}
