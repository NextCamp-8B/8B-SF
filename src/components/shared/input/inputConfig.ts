// 입력 필드 구성 및 유효성 검사를 포함하는 파일

export type Status = 'default' | 'warning' | 'success' | 'disabled';

type StatusDetailType = {
  labelColor: string;
  inputTextColor: string;
  borderColor: string;
  validatedColor: string;
};
type StatusType<T extends string> = Record<T, StatusDetailType>;

type FieldDetailType = {
  labelText: string;
  placeholder: string;
  validatedText: string;
  doValidation: (value: string, checkValue?: string) => boolean;
};

type FieldType<T extends string> = Record<T, FieldDetailType>;

/**
 * 스타일 결정을 위한 입력 필드의 상태
 */
const statusMap: StatusType<Status> = {
  default: {
    labelColor: 'primary-900',
    inputTextColor: 'grayscale-900',
    borderColor: 'grayscale-300',
    validatedColor: 'grayscale-700',
  },

  warning: {
    labelColor: 'warning-100',
    inputTextColor: 'warning-100',
    borderColor: 'warning-100',
    validatedColor: 'warning-100',
  },

  success: {
    labelColor: 'primary-900',
    inputTextColor: 'grayscale-900',
    borderColor: 'grayscale-300',
    validatedColor: 'success-100',
  },

  disabled: {
    labelColor: 'grayscale-300',
    inputTextColor: 'grayscale-300',
    borderColor: 'grayscale-300',
    validatedColor: 'grayscale-300',
  },
};

const conceptMap: FieldType<
  | 'signupId'
  | 'loginId'
  | 'nickname'
  | 'password'
  | 'passwordCheck'
  | 'signupPhone'
  | 'loginPhone'
  | 'birth'
  | 'name'
  | 'email'
> = {
  signupId: {
    labelText: 'SignUp.id',
    placeholder: 'SignUp.placeholder_id',
    validatedText: 'SignUp.validatedText_id',
    doValidation(value) {
      const isDidnTExceedLower = value.length < 6;
      const isExceedUpper = value.length > 12;
      return !(isDidnTExceedLower || isExceedUpper);
    },
  },
  loginId: {
    labelText: 'SignUp.id',
    placeholder: 'SignUp.placeholder_id',
    validatedText: 'SignUp.validatedText_required',
    doValidation(value) {
      const isEmptyExceptSpaces = value.trim() === '';
      return !isEmptyExceptSpaces;
    },
  },
  nickname: {
    labelText: 'SignUp.nickname',
    placeholder: 'SignUp.placeholder_nickname',
    validatedText: 'SignUp.validatedText_required',
    doValidation(value) {
      const isEmptyExceptSpaces = value.trim() === '';
      return !isEmptyExceptSpaces;
    },
  },
  password: {
    labelText: 'SignUp.pw',
    placeholder: 'SignUp.placeholder_pw',
    validatedText:
      'SignUp.condition_pw',
    doValidation(value) {
      const isDidnTExceedLower = value.length < 8;
      const isExceedUpper = value.length > 20;
      if (isDidnTExceedLower || isExceedUpper) {
        return false;
      }

      const hasDigit = /[0-9]/.test(value);
      const hasSpecialChar =
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      const hasLetter = /[a-zA-Z]/.test(value);
      const validpassed = [
        hasDigit,
        hasSpecialChar,
        hasLetter,
      ].filter(Boolean).length;
      return validpassed >= 2;
    },
  },
  passwordCheck: {
    labelText: 'SignUp.confirm_pw',
    placeholder: 'SignUp.placeholder_confirm_pw',
    validatedText:
      'SignUp.validatedText_passwordCheck',
    doValidation(value, checkValue) {
      return value === checkValue;
    },
  },
  birth: {
    labelText: 'SignUp.birth',
    placeholder: 'SignUp.placeholder_birth',
    validatedText: 'SignUp.validatedText_numbersOnly',
    doValidation(value) {
      return /^\d{6}$/.test(value);
    },
  },
  signupPhone: {
    labelText: 'SignUp.phone_number',
    placeholder:  'SignUp.placeholder_phone',
    validatedText: 'SignUp.validatedText_numbersOnly',
    doValidation(value) {
      return /^\d+$/.test(value);
    },
  },
  loginPhone: {
    labelText:'SignUp.phone_number',
    placeholder: 'SignUp.placeholder_phone',
    validatedText: 'SignUp.validatedText_required',
    doValidation(value) {
      return value.trim() !== '';
    },
  },
  name: {
    labelText: 'SignUp.name',
    placeholder: 'SignUp.placeholder_name',
    validatedText: 'SignUp.validatedText_required',
    doValidation(value) {
      return value.trim() !== '';
    },
  },
  email: {
    labelText: 'SignUp.email',
    placeholder: 'SignUp.placeholder_email',
    validatedText: 'SignUp.validatedText_required',
    doValidation(value) {
      return /\S+@\S+\.\S+/.test(value);
    },
  },
};
export { statusMap, conceptMap };
