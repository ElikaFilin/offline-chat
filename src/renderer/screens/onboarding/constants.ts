const ONBOARDING = {
  form: {
    step1: {
      title: 'What’s your Phone Number?',
      placeholders: {
        first: 'Phone Number',
        second: null,
      },
    },
    step2: {
      placeholders: {
        first: 'Code',
        second: null,
      },
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
        first: 'Unknown step placeholder. Connect to support please',
        second: 'Unknown step placeholder. Connect to support please',
      };
    }
  }
};

export const getInputType = (value: number) => {
  switch (value) {
    case 1: {
      return { first: 'tel', second: null };
    }
    case 2: {
      return { first: 'text', second: null };
    }
    case 3: {
      return { first: 'text', second: null };
    }
    default: {
      return { first: '', second: '' };
    }
  }
};

export const getInputName = (value: number) => {
  switch (value) {
    case 1: {
      return { first: 'phone', second: null };
    }
    case 2: {
      return { first: 'code', second: null };
    }
    case 3: {
      return { first: 'firstName', second: 'lastName' };
    }
    default: {
      return { first: '', second: '' };
    }
  }
};

export default ONBOARDING;
