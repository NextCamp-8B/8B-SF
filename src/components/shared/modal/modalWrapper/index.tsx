import ModalDimmedLayer from './ModalDimmedLayer';
import ModalMain from './ModalMain';
import ModalTitle from './ModalTitle';

/**
 * Modal 컴포넌트는 portal을 사용하여 구현될 예정이며, 추후 변경될 예정입니다.
 * 동료 개발자가 만든 컴포넌트와 함께 조합하여 사용할 것입니다.
 * 디자인 시스템에서의 Popup과 Figma의 LI-01-WEB 등에 포함된 컴포넌트를 혼용할 수 있도록 설계 예정이나 변경될 수 있습니다.
 * 개발 진행과 회의를 통해 최종 결정되고 변경 사항이 반영될 예정입니다.
 *
 * @property Title - 무엇에 관한 Modal 인지 표시
 * @property Contents - Modal 표시될 안내 문구를 작성
 * @property PopupBox - Modal 핵심 컨테이너
 *
 * @example
      <Modal>
        <Modal.ModalBox>
          <Modal.Title>가입이 완료되었습니다.</Modal.Title>
          <Modal.Contents>
            회원가입이 완료되었습니다. 로그인 후 이용해주세요!
          </Modal.Contents>
          <InputArea>
            <InputArea.Label>비밀번호 입력</InputArea.Label>
            <InputArea.Input />
            <InputArea.ValidatedText>
              * 8-20자 이내 숫자, ...
            </InputArea.ValidatedText>
          </InputArea>
          <button className="bg-primary-700 border border-gray-300 hover:bg-primary-500">
            로그인하기
          </button>
        </Modal.ModalBox>
      </Modal>
 */
export const ModalWrapper = Object.assign(ModalDimmedLayer, {
  Title: ModalTitle,
  DimmedLayer: ModalDimmedLayer,
  ModalBox: ModalMain,
});
export default ModalWrapper;
