import { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
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
import { authenticate, getFormattedPhoneNumber } from '../../utils';
import styles from './onboarding.module.scss';
import handleOnChange from './handlers';

export default function Onboarding() {
  const t = useTranslate();
  const navigate = useNavigate();
  const { startClick, resetClick } = useClickOnce();
  // should be 'auth/phone' url instead of 'auth' url. Stay 'auth' because of limitation of mockapi server
  const phoneRequest = useRequest('POST', 'auth');
  // should be 'auth/submit-code' url instead of 'auth' url. Stay 'auth' because of limitation of mockapi server
  const submitCodeRequest = useRequest('POST', 'auth');
  // should be 'auth/user-names' url instead of 'auth' url. Stay 'auth' because of limitation of mockapi server
  const userNamesRequest = useRequest('POST', 'auth');
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
  });
  const [smsCode, setSmsCode] = useState('');
  const [countryCode] = useState('+1');
  const isFirstStep = step === 1;
  const isSecondStep = step === 2;
  const isThirdStep = step === 3;
  const validation = isSecondStep && !smsCode;

  const phoneMutation = useMutation('auth_send_phone_number', phoneRequest);
  const submitCodeMutation = useMutation('auth_submit_code', submitCodeRequest);
  const userNamesMutation = useMutation('auth_user_names', userNamesRequest);

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

  const handleNext = async () => {
    resetClick();
    let response;
    if (isFirstStep)
      response = await phoneMutation.mutateAsync({ phone: userData.phone });
    else if (isSecondStep)
      response = await submitCodeMutation.mutateAsync({ code: smsCode });
    else if (isThirdStep) {
      response = await userNamesMutation.mutateAsync({
        firstNAme: userData.firstName,
        lastName: userData.lastName,
      });
      if (authenticate(response, userData)) navigate('/chat');
    }
    if (response) setStep((prevState) => prevState + 1);
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
      isLoading={
        phoneMutation.isLoading ||
        submitCodeMutation.isLoading ||
        userNamesMutation.isLoading
      }
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
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleOnChange(step, setUserData, setSmsCode, event)
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
