import { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import useTranslate from '../../hooks/useTranslate';
import ONBOARDING, {
  getInputName,
  getInputType,
  getPlaceholdersText,
} from './constants';
import { Form, Header, Input } from '../../components/common';
import useClickOnce from '../../hooks/useClickOnce';
import useRequest from '../../hooks/useRequest';

export default function Onboarding() {
  const t = useTranslate();
  const { startClick, resetClick } = useClickOnce();
  const request = useRequest('POST', 'auth');
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    phone: '',
    names: { firstName: '', lastName: '' },
  });
  const [code, setCode] = useState('');
  const isSecondStep = step === 2;
  const isThirdStep = step === 3;

  const { isLoading, data, mutateAsync } = useMutation(
    'auth_send_phone_number',
    request
  );

  const getFormTitle = (value: number) => {
    switch (value) {
      case 1:
        return t(ONBOARDING.form.step1.title);
      case 2:
        return userData.phone;
      case 3:
        return t(ONBOARDING.form.step3.title);
      default:
        return t('Unknown step title. Connect to support please');
    }
  };

  const getInputsValue = (value: number) => {
    switch (value) {
      case 1:
        return { first: userData.phone, second: null };
      case 2:
        return { first: code, second: null };
      case 3:
        return {
          first: userData.names.firstName,
          second: userData.names.lastName,
        };
      default:
        return { first: '', second: '' };
    }
  };

  const handleFirstInputOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
    switch (value) {
      case 1:
        return () =>
          setUserData((pv) => {
            return {
              ...pv,
              phone: event.target.value,
            };
          });
      case 2:
        return () => setCode(event.target.value);
      case 3:
        return () =>
          setUserData((pv) => {
            return {
              ...pv,
              names: { ...pv.names, firstName: event.target.value },
            };
          });
      default:
        return () => {};
    }
  };

  const handleNext = async () => {
    await mutateAsync({ phone: userData });
    resetClick();
    if (data) setStep((value) => value + 1);
  };

  return (
    <Form handleNext={startClick(handleNext)} isLoading={isLoading}>
      <Header>{getFormTitle(step)}</Header>
      <>
        {isSecondStep && (
          <span>{t('We have sent you an SMS with the code')}</span>
        )}
        <Input
          type={getInputType(step).first}
          name={getInputName(step).first}
          value={getInputsValue(step).first}
          placeholder={getPlaceholdersText(step).first}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFirstInputOnChange(e, step)
          }
        />
        {isThirdStep && (
          <Input placeholder={} value={} onChange={} name={} type={} />
        )}
      </>
    </Form>
  );
}
