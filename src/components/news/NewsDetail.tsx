import StockListItem from '@/components/shared/StockListItem';
import React from 'react';

import Image from 'next/image';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Translate from '@/assets/icons/translate.svg';
import SmallLogoLight from '@/assets/logos/small_logo_light.svg';

const tmpNews = {
  thumbnail:
    'https://cdn.pixabay.com/photo/2024/06/06/13/25/black-tailed-skimmer-8812720_1280.jpg',
  title: `"산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨훨훨훨훨훨훨훨훨훨훨`,
  content: `윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스
                매장 가능성이 있다"고 발표하면서 석유주가 이틀째
                급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%)
                오른 2만3300원에 거래를 마쳤다. 한국석유는 전날에도
                상한가로 장을 마친 바 있다.이 외에도 한국ANKOR유전도
                상한가를 찍었고, 흥구석유(024060)는 18.40% 올랐다.윤석열
                대통령은 전날 용산 대통령실에서 열린 국정 브리핑에서
                "포항 영일만 앞바다에 막대한 양의 석유와 가스가 매장돼
                있을 가능성이 높다는 물리탐사 결과가 나왔다"고
                밝혔다.매장량은 최대 140억 배럴 가능성이 예상되며
                천연가스는 29년, 석유는 4년 이상 사용할 양이라고
                설명했다.`,
  publishedTime: '6시간전',
  company: '문화일보',
  date: '2024-06-24T19:52:16.000Z',
  id: '1',
};
export default function NewsDetail() {
  return (
    <>
      <div>
        <h1 className="h4 font-bold pb-4">{tmpNews.title}</h1>
        <div className="flex justify-between">
          <div className="b5 font-medium text-grayscale-600 flex gap-[6px]">
            <span>{tmpNews.company}</span>
            <span>∙</span>
            <span>{tmpNews.date}</span>
            <span>∙</span>
            <span>{'조회수 12,038회'}</span>
          </div>
          <ButtonBase
            iconSvg={Translate}
            iconClassName="w-5"
            className="flex b5 font-medium text-grayscale-0 bg-primary-900 rounded-lg w-[176px] h-[36px] items-center justify-center gap-1"
          >
            <span>번역하기</span>
          </ButtonBase>
        </div>
      </div>
      <div>
        <div className="flex gap-3 items-center pb-6">
          <div className="w-6 h-6 bg-primary-900 rounded flex items-center justify-center">
            <SmallLogoLight className="w-4" />
          </div>
          <span className="b4 font-bold">아잇나우 AI요약</span>
        </div>
        <div className="b4">
          바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성
          바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오
          연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
          첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
          첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
          첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
          첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
          첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
          첨단,인공 유전자로 인간 피부 재생 가능성
        </div>
      </div>
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={tmpNews.thumbnail}
          width="800"
          height="370"
          alt="thumbnail"
        />
      </div>
      <div className="b4">
        {`트웰브랩스는 지난해 10월 한국 스타트업으로는 처음으로 엔비디아의 투자를 받아 주목받았던 회사다. 당시 총 투자유치액은 1000만달러였다. 이번 투자엔 지난해 투자에 참여했던 투자사들이 연이어 참여했다. 뉴엔터프라이즈어소시에이트(NEA)와 엔비디아의 자회사인 엔벤쳐스가 리드 투자자로 나섰고, 인덱스벤쳐스, 래디컬벤쳐스, 원더코벤처스 등 글로벌 투자사들이 참여했다. 국내에서는 한국투자파트너스가 참여했다. 이로써 트웰브랩스의 누적 투자 금액은 7700만 달러(약 1060억원) 수준이다.\n 엔벤쳐스 대표인 모하메드 시딕 엔비디아 부사장은 “트웰브랩스의 뛰어난 영상이해 기술과 엔비디아의 가속 컴퓨팅을 바탕으로 다양한 연구 협업을 할 예정”이라고 말했다. 한국투자파트너스의 김민준 팀장은 “LLM 시장은 오픈AI를 비롯한 빅테크 중심으로 소위 ‘그들만의 리그’가 형성돼 있지만, 멀티모달 영상이해AI 시장에서만큼은 트웰브랩스가 글로벌 선도 기업이 될 수 있다고 판단했다"고 투자 배경을 설명했다.\n트웰브랩스는 엔비디아와 협력해 기존 언어모델에 특화된 텐서RT-LLM의 성능 개선 작업을 진행 중이다. 멀티모달 영상이해 분야를 선점하는 게 목표다. 지난 3월 출시한 초거대 AI 영상 언어 생성 모델 ‘페가수스'와 멀티모달 영상이해 모델 ‘마렝고’는 구글, 오픈AI 등 상용 및 오픈소스 영상 언어 모델과 비교해 최대 43% 가량이 성능이 높다는 결과를 내기도 했다.`}
      </div>
    </>
  );
}
