import { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import useTranslate from '../../hooks/useTranslate';
import ONBOARDING, {
  getInputName,
  getInputsValue,
  getInputType,
  getPlaceholdersText,
} from './constants';
import { Form, Header, Input } from '../../components/common';
import useClickOnce from '../../hooks/useClickOnce';
import useRequest from '../../hooks/useRequest';
import { getFormattedPhoneNumber } from '../../utils';
import styles from './onboarding.module.scss';

export default function Onboarding() {
  const t = useTranslate();
  const { startClick, resetClick } = useClickOnce();
  const request = useRequest('POST', 'auth');
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
  });
  const [smsCode, setSmsCode] = useState('');
  const [countryCode] = useState('+1');
  const isSecondStep = step === 2;
  const isThirdStep = step === 3;
  const validation = isSecondStep && !smsCode;

  const { isLoading, mutateAsync } = useMutation(
    'auth_send_phone_number',
    request
  );

  const getFormTitle = (value: number) => {
    switch (value) {
      case 1:
        return t(ONBOARDING.form.step1.title);
      case 2:
        return `${countryCode} ${getFormattedPhoneNumber(userData.phone)}`;
      case 3:
        return t(ONBOARDING.form.step3.title);
      default:
        return t('Unknown step title. Connect to support please');
    }
  };

  const handleFirstInputOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
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
  };

  const handleNext = async () => {
    // todo - send different requests
    const res = await mutateAsync({ phone: userData.phone });
    resetClick();
    // todo - set token on third step
    if (res) setStep((value) => value + 1);
  };

  const handleSecondInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData((pv) => {
      return {
        ...pv,
        lastName: event.target.value,
      };
    });
  };

  return (
    <Form
      handleNext={startClick(handleNext)}
      isLoading={isLoading}
      disabledButton={validation}
      buttonClassName={validation ? 'disabled-button' : ''}
    >
      <Header>{getFormTitle(step)}</Header>
      <>
        {isSecondStep && (
          <span className={styles['sub-title']}>
            {t(ONBOARDING.form.step2.subTitle)}
          </span>
        )}
        <Input
          type={getInputType(step).first}
          name={getInputName(step).first}
          value={getInputsValue(step, userData, smsCode).first}
          placeholder={getPlaceholdersText(step).first}
          countryCode={countryCode}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFirstInputOnChange(e, step)
          }
        />
        {isThirdStep && (
          <Input
            placeholder={getPlaceholdersText(step).second}
            value={getInputsValue(step, userData, smsCode).second}
            onChange={handleSecondInputChange}
            name={getInputName(step).second}
            type={getInputType(step).second}
          />
        )}
      </>
    </Form>
  );
}
