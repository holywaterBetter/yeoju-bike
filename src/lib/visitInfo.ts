export const visitStreetAddress = "강변유원지길 105 폰박물관 옆 따르릉 여주 사랑방";
export const visitFullAddress = `경기도 여주시 ${visitStreetAddress}`;

export const parkingDirections = [
  {
    heading: "유료",
    lines: ["금은모래캠핑장 2주차장", "(경기도 여주시 강변유원지길 107)"],
  },
  {
    heading: "무료",
    lines: ["공원 주차장", "(경기도 여주시 강변유원지길 164)"],
  },
] as const;

export const transitDirections = [
  {
    heading: "기차",
    lines: ["경강선 여주역 전철", "(여주역에서 사무국까지 4.5km거리)"],
  },
  {
    heading: "택시",
    lines: ["도착지 : 금은모래 캠핑장 폰박물관"],
  },
  {
    heading: "시내버스",
    lines: ["청솔가든 정류장 하차 (913번, 913-2번 등)", "(하차 후 약 15분 도보 이동)"],
  },
] as const;
