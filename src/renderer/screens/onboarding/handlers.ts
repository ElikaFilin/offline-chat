export default function handleOnChange(value, setUserData, setSmsCode, event) {
  switch (value) {
    case 1:
      setUserData((pv) => {
        return {
          ...pv,
          phone: event.target.value,
        };
      });
      break;
    case 2:
      setSmsCode(event.target.value);
      break;
    case 3:
      setUserData((pv) => {
        return {
          ...pv,
          firstName: event.target.value,
        };
      });
      break;
    default:
  }
}
