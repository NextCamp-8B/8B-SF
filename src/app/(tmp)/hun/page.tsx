import Card from '@/components/shared/Card';
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
};

const tmpNews2 = {
  thumbnail:
    'https://cdn.pixabay.com/photo/2024/06/06/13/25/black-tailed-skimmer-8812720_1280.jpg',
  title: `"신재생에너지 대박" 韓, 태양광 발전소 증가... 관련 주 상승`,
  content: `최근 한국 정부가 대규모 태양광 발전소 건설 계획을 발표하면서
                신재생에너지 관련 주가가 급등하고 있다.4일 신재생에너지주
                중 하나인 한국태양광(003280)은 전일대비 4500원(25.30%)
                오른 2만2500원에 거래를 마쳤다. 한국태양광은 전날에도
                상한가로 장을 마친 바 있다.이 외에도 한국풍력발전도
                상한가를 기록했고, 그린에너지(024010)는 15.40% 올랐다.
                정부는 이번 발표를 통해 "신재생에너지 발전 비중을
                대폭 확대해 나갈 계획"이라며 "태양광과 풍력 발전을
                통해 지속 가능한 에너지 공급을 목표로 하고 있다"고
                밝혔다. 계획된 발전소는 총 50곳이며, 이를 통해 연간
                200억 kWh의 전력을 생산할 것으로 예상된다.`,
  publishedTime: '4시간전',
  company: '한국경제',
  date: '2024-06-25T04:30:00.000Z',
};

const tmpStock = {
  name: '애플',
  subname: 'AAPL',
  value: '00.00',
  tmp1: -0.82,
  tmp2: 1.75,
};

export default function Hun() {
  return (
    <>
      <Card type="News1" newsOne={tmpNews} />
      <br />
      <Card type="Stock" stock={tmpStock} />
      <br />
      <Card type="News2" newsOne={tmpNews} />
      <br />
      <Card type="News3" newsOne={tmpNews} newsTwo={tmpNews2} />
    </>
  );
}
