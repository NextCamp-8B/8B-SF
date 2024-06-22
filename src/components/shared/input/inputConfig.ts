// 입력 필드 구성 및 유효성 검사를 포함하는 파일

export type Status =
  | 'default'
  | 'active'
  | 'warning'
  | 'success'
  | 'disabled';

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

  active: {
    labelColor: 'secondary-500',
    inputTextColor: 'grayscale-900',
    borderColor: 'secondary-500',
    validatedColor: 'secondary-500',
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
  | 'password'
  | 'passwordCheck'
  | 'signupPhone'
  | 'loginPhone'
  | 'birth'
  | 'name'
  | 'email'
> = {
  signupId: {
    labelText: '아이디',
    placeholder: '아이디를 입력해주세요.',
    validatedText: '* 6~12자의 영문, 숫자 등을 이용한 조합',
    doValidation(value) {
      const isDidnTExceedLower = value.length < 6;
      const isExceedUpper = value.length > 12;
      return !(isDidnTExceedLower || isExceedUpper);
    },
  },
  loginId: {
    labelText: '아이디',
    placeholder: '아이디를 입력해주세요.',
    validatedText: '* 필수 입력입니다.',
    doValidation(value) {
      const isEmptyExceptSpaces = value.trim() === '';
      return !isEmptyExceptSpaces;
    },
  },
  password: {
    labelText: '비밀번호 입력',
    placeholder: '비밀번호를 입력해주세요.',
    validatedText:
      '* 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합',
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
    labelText: '비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해주세요.',
    validatedText:
      '* 동일한 비밀번호가 아닙니다. 다시 확인 후 입력해주세요.',
    doValidation(value, checkValue) {
      return value === checkValue;
    },
  },
  birth: {
    labelText: '생년월일',
    placeholder: '생년월일 6자리를 입력해주세요.(예시: 991231)',
    validatedText: '* 숫자만 입력해주세요.',
    doValidation(value) {
      return /^\d{6}$/.test(value);
    },
  },
  signupPhone: {
    labelText: '휴대폰번호',
    placeholder: '-를 제외한 휴대폰번호를 입력해주세요.',
    validatedText: '* 숫자만 입력해주세요.',
    doValidation(value) {
      return /^\d+$/.test(value);
    },
  },
  loginPhone: {
    labelText: '휴대폰번호',
    placeholder: '-를 제외한 휴대폰번호를 입력해주세요.',
    validatedText: '* 필수 입력입니다.',
    doValidation(value) {
      return value.trim() !== '';
    },
  },
  name: {
    labelText: '이름',
    placeholder: '이름을 입력해주세요.',
    validatedText: '* 필수 입력입니다.',
    doValidation(value) {
      return value.trim() !== '';
    },
  },
  email: {
    labelText: '이메일주소',
    placeholder: '가입 시 입력한 이메일주소를 입력해주세요.',
    validatedText: '* 필수 입력입니다.',
    doValidation(value) {
      return /\S+@\S+\.\S+/.test(value);
    },
  },
};
export { statusMap, conceptMap };
