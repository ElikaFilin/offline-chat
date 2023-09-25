const ONBOARDING = {
  form: {
    step1: {
      title: 'What’s your Phone Number?',
      placeholders: {
        first: 'Phone Number',
        second: '',
      },
    },
    step2: {
      placeholders: {
        first: 'Code',
        second: '',
      },
      subTitle: 'We have sent you an SMS with the code',
    },
    step3: {
      title: 'What’s your Full Name?',
      placeholders: {
        first: 'Name',
        second: 'Last Name',
      },
    },
  },
};

export const getPlaceholdersText = (value: number) => {
  switch (value) {
    case 1: {
      return {
        first: ONBOARDING.form.step1.placeholders.first,
        second: ONBOARDING.form.step1.placeholders.second,
      };
    }
    case 2: {
      return {
        first: ONBOARDING.form.step2.placeholders.first,
        second: ONBOARDING.form.step2.placeholders.second,
      };
    }
    case 3: {
      return {
        first: ONBOARDING.form.step3.placeholders.first,
        second: ONBOARDING.form.step3.placeholders.second,
      };
    }
    default: {
      return {
        first: 'Unknown step placeholder',
        second: 'Unknown step placeholder',
      };
    }
  }
};

export const getInputType = (value: number) => {
  switch (value) {
    case 1: {
      return { first: 'tel', second: '' };
    }
    case 2: {
      return { first: 'text', second: '' };
    }
    case 3: {
      return { first: 'text', second: '' };
    }
    default: {
      return { first: '', second: '' };
    }
  }
};

export const getInputName = (value: number) => {
  switch (value) {
    case 1: {
      return { first: 'phone', second: '' };
    }
    case 2: {
      return { first: 'code', second: '' };
    }
    case 3: {
      return { first: 'firstName', second: 'lastName' };
    }
    default: {
      return { first: '', second: '' };
    }
  }
};

export const getInputsValue = (value: number, userData, smsCode) => {
  switch (value) {
    case 1:
      return { first: userData.phone, second: '' };
    case 2:
      return { first: smsCode, second: '' };
    case 3:
      return {
        first: userData.firstName,
        second: userData.lastName,
      };
    default:
      return { first: '', second: '' };
  }
};

export default ONBOARDING;
