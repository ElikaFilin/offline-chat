export default function getCustomClassNames(classNames, stylesObj) {
  return classNames.map((name) => stylesObj[name]);
}
