export const CATEGORIES = {
  '💼 업무': { activities: ['회의', '이메일', '문서작성', '기획'], color: '#3B82F6', productive: true },
  '📚 학습': { activities: ['독서', '강의수강', '연구', '공부'], color: '#10B981', productive: true },
  '💪 운동': { activities: ['헬스', '러닝', '요가', '산책'], color: '#EF4444', productive: true },
  '🍽️ 식사': { activities: ['아침식사', '점심식사', '저녁식사', '간식'], color: '#F59E0B', productive: false },
  '🎮 오락': { activities: ['게임', '영화감상', 'SNS', '유튜브'], color: '#8B5CF6', productive: false },
  '😴 휴식': { activities: ['수면', '낮잠', '명상', '휴식'], color: '#6B7280', productive: false },
  '🏠 가사': { activities: ['청소', '요리', '빨래', '정리'], color: '#EC4899', productive: true },
  '👥 사교': { activities: ['친구만남', '가족시간', '데이트', '모임'], color: '#14B8A6', productive: false }
};

export const MOODS = [
  { emoji: '😭', label: '매우 나쁨', value: 1 },
  { emoji: '😞', label: '나쁨', value: 2 },
  { emoji: '😐', label: '보통', value: 3 },
  { emoji: '😊', label: '좋음', value: 4 },
  { emoji: '😍', label: '매우 좋음', value: 5 }
]; 