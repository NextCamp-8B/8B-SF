import StockListItem from '@/components/shared/StockListItem';
import React from 'react';

import Image from 'next/image';
import ButtonBase from '@/components/shared/buttons/ButtonBase';
import Translate from '@/assets/icons/translate.svg';
import SmallLogoLight from '@/assets/logos/small_logo_light.svg';
import { TMP_NEWS } from '@/constants';

export default function NewsDetail() {
  return (
    <>
      <div>
        <h1 className="h4 font-bold pb-4">{TMP_NEWS.title}</h1>
        <div className="flex justify-between">
          <div className="b5 font-medium text-grayscale-600 flex gap-[6px]">
            <span>{TMP_NEWS.company}</span>
            <span>∙</span>
            <span>{TMP_NEWS.date}</span>
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
          src={TMP_NEWS.thumbnail}
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
