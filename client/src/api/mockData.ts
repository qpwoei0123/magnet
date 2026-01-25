export const db = {
  "members": [
    {
      "memberId": 1,
      "email": "testuser@gmail.com",
      "nickname": "데모유저",
      "profile": "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    }
  ],
  "mentors": [
    {
      "mentorId": 1,
      "memberId": 1,
      "mentorName": "김멘토",
      "career": "시니어",
      "field": "백엔드",
      "task": "Java, Spring",
      "email": "mentor.kim@example.com",
      "phone": "010-1111-1111",
      "aboutMe": "안녕하세요! 백엔드 개발자 김멘토입니다. 10년 이상의 실무 경험을 바탕으로 여러분의 성장을 돕겠습니다.",
      "github": "https://github.com/mentor-kim"
    },
    {
      "mentorId": 2,
      "memberId": 2,
      "mentorName": "이멘토",
      "career": "주니어",
      "field": "프론트엔드",
      "task": "React, TypeScript",
      "email": "mentor.lee@example.com",
      "phone": "010-2222-2222",
      "aboutMe": "프론트엔드 개발에 열정을 가진 이멘토입니다. 함께 재미있는 프로젝트를 만들어봐요!",
      "github": "https://github.com/mentor-lee"
    },
    {
      "mentorId": 3,
      "memberId": 3,
      "mentorName": "박멘토",
      "career": "시니어",
      "field": "디자인",
      "task": "UI/UX",
      "email": "mentor.park@example.com",
      "phone": "010-3333-3333",
      "aboutMe": "사용자 중심의 디자인을 추구하는 박멘토입니다. 함께 아름답고 편리한 서비스를 만들어봐요.",
      "github": "https://github.com/mentor-park"
    }
  ],
  "mentorings": [
    {
      "mentoringId": 1,
      "mentorId": 1,
      "mentorName": "김멘토",
      "title": "Java/Spring 기반 백엔드 아키텍처 설계",
      "content": "MSA 기반의 확장성 있는 백엔드 시스템을 설계하는 방법을 알려드립니다.",
      "pay": "시간당 50,000원",
      "period": "3개월",
      "participants": 5,
      "category": "백엔드",
      "field": "백엔드",
      "task": "Java, Spring",
      "career": "시니어",
      "aboutMe": "안녕하세요! 백엔드 개발자 김멘토입니다. 10년 이상의 실무 경험을 바탕으로 여러분의 성장을 돕겠습니다."
    },
    {
      "mentoringId": 2,
      "mentorId": 1,
      "mentorName": "김멘토",
      "title": "실전! TDD 기반 API 서버 개발",
      "content": "테스트 주도 개발 방법론을 적용하여 안정적인 API 서버를 구축합니다.",
      "pay": "시간당 55,000원",
      "period": "2개월",
      "participants": 3,
      "category": "백엔드",
      "field": "백엔드",
      "task": "Java, Spring, TDD",
      "career": "시니어",
      "aboutMe": "안녕하세요! 백엔드 개발자 김멘토입니다. 10년 이상의 실무 경험을 바탕으로 여러분의 성장을 돕겠습니다."
    },
    {
      "mentoringId": 3,
      "mentorId": 2,
      "mentorName": "이멘토",
      "title": "React와 TypeScript를 활용한 모던 웹 개발",
      "content": "최신 프론트엔드 기술 스택을 사용하여 인터랙티브한 웹 애플리케이션을 만듭니다.",
      "pay": "시간당 45,000원",
      "period": "4개월",
      "participants": 8,
      "category": "프론트엔드",
      "field": "프론트엔드",
      "task": "React, TypeScript",
      "career": "주니어",
      "aboutMe": "프론트엔드 개발에 열정을 가진 이멘토입니다. 함께 재미있는 프로젝트를 만들어봐요!"
    },
    {
      "mentoringId": 4,
      "mentorId": 3,
      "mentorName": "박멘토",
      "title": "사용자 경험(UX) 중심의 UI 디자인",
      "content": "Figma를 활용하여 사용자 친화적인 UI를 디자인하고 프로토타이핑합니다.",
      "pay": "시간당 60,000원",
      "period": "3개월",
      "participants": 4,
      "category": "디자인",
      "field": "디자인",
      "task": "UI/UX, Figma",
      "career": "시니어",
      "aboutMe": "사용자 중심의 디자인을 추구하는 박멘토입니다. 함께 아름답고 편리한 서비스를 만들어봐요."
    },
    {
      "mentoringId": 5,
      "mentorId": 2,
      "mentorName": "이멘토",
      "title": "Next.js를 이용한 SSR 환경 구축하기",
      "content": "Next.js를 활용하여 SEO에 최적화된 서버 사이드 렌더링 애플리케이션을 구축합니다.",
      "pay": "시간당 50,000원",
      "period": "2개월",
      "participants": 5,
      "category": "프론트엔드",
      "field": "프론트엔드",
      "task": "Next.js, React",
      "career": "주니어",
      "aboutMe": "프론트엔드 개발에 열정을 가진 이멘토입니다. 함께 재미있는 프로젝트를 만들어봐요!"
    }
  ],
  "mentees": [
    {
      "mentoringId": 3,
      "menteeId": 1,
      "memberId": 1,
      "name": "박멘티",
      "email": "mentee.park@example.com",
      "phone": "010-4444-4444",
      "aboutMe": "주니어 백엔드 개발자 박멘티입니다. 시니어 개발자의 노하우를 배우고 싶습니다.",
      "github": "https://github.com/mentee-park"
    }
  ],
  "createdMentorings": [
      {
          "mentoringId": 1,
          "title": "Java/Spring 기반 백엔드 아키텍처 설계",
          "content": "MSA 기반의 확장성 있는 백엔드 시스템을 설계하는 방법을 알려드립니다.",
          "pay": "시간당 50,000원",
          "period": "3개월",
          "participants": 5,
          "category": "백엔드",
          "mentorId": 1,
          "menteeList": [
              {
                  "menteeId": 1,
                  "name": "박멘티",
                  "email": "mentee.park@example.com",
                  "phone": "010-4444-4444",
                  "aboutMe": "주니어 백엔드 개발자 박멘티입니다. 시니어 개발자의 노하우를 배우고 싶습니다.",
                  "github": "https://github.com/mentee-park"
              }
          ]
      }
  ],
   "appliedMentorings": [
        {
            "mentoringId": 3,
            "title": "React와 TypeScript를 활용한 모던 웹 개발",
            "content": "최신 프론트엔드 기술 스택을 사용하여 인터랙티브한 웹 애플리케이션을 만듭니다.",
            "pay": "시간당 45,000원",
            "period": "4개월",
            "participants": 8,
            "category": "프론트엔드",
            "mentorId": 2
        }
    ],
    "payments": []
};
