import PopupContents from './PopupContents';
import PopupDimmedLayer from './PopupDimmedLayer';
import PopupMain from './PopupMain';
import PopupTitle from './PopupTitle';

/**
 * Popup 컴포넌트는 portal을 사용하여 구현될 예정이며, 추후 변경될 예정입니다.
 * 동료 개발자가 만든 컴포넌트와 함께 조합하여 사용할 것입니다.
 * 디자인 시스템에서의 Popup과 Figma의 LI-01-WEB 등에 포함된 컴포넌트를 혼용할 수 있도록 설계 예정이나 변경될 수 있습니다.
 * 개발 진행과 회의를 통해 최종 결정되고 변경 사항이 반영될 예정입니다.
 *
 * @property {Component} Title - 무엇에 관한 Popup 인지 표시
 * @property {Component} Contents - Popup에 표시될 안내 문구를 작성
 * @property {Component} PopupBox - Popup의 핵심 컨테이너
 *
 * @example
      <Popup>
        <Popup.PopupBox>
          <Popup.Title>가입이 완료되었습니다.</Popup.Title>
          <Popup.Contents>
            회원가입이 완료되었습니다. 로그인 후 이용해주세요!
          </Popup.Contents>
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
        </Popup.PopupBox>
      </Popup>
 */
export const Popup = Object.assign(PopupDimmedLayer, {
  Title: PopupTitle,
  Contents: PopupContents,
  DimmedLayer: PopupDimmedLayer,
  PopupBox: PopupMain,
});
export default Popup;
