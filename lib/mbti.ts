// MBTI 十六种性格类型
export const mbtiTypes = {
  "INTJ": {
    name: "建筑师",
    description: "富有想象力和战略性的思想家，一切皆在计划之中。",
    traits: ["独立", "果断", "有远见", "分析性强"],
    strengths: ["战略思维", "独立工作", "长期规划", "目标导向"],
    weaknesses: ["过于完美主义", "不善于处理日常事务", "缺乏情感表达"],
    compatibleWith: ["ENFP", "ENTP", "INFJ", "INFP"]
  },
  "INTP": {
    name: "逻辑学家", 
    description: "具有创造性的思想家，对知识有着不可抑制的渴望。",
    traits: ["理性", "好奇", "创新", "客观"],
    strengths: ["理论分析", "创新能力", "客观公正", "知识追求"],
    weaknesses: ["缺乏实践性", "不善于社交", "容易分心"],
    compatibleWith: ["ENTJ", "ENTP", "INFJ", "INFP"]
  },
  "ENTJ": {
    name: "指挥官",
    description: "大胆，富有想象力且意志强烈的领导者，总能找到或创造解决方法。",
    traits: ["领导力", "自信", "高效", "战略"],
    strengths: ["领导能力", "决策能力", "组织管理", "目标达成"],
    weaknesses: ["过于强势", "缺乏耐心", "不善于处理细节"],
    compatibleWith: ["INFP", "INTP", "ENFJ", "ENTP"]
  },
  "ENTP": {
    name: "辩论家", 
    description: "聪明好奇的思想家，不能抗拒智力上的挑战。",
    traits: ["创新", "社交", "灵活", "热情"],
    strengths: ["创新能力", "适应性强", "沟通能力", "灵活思维"],
    weaknesses: ["缺乏持续性", "不善于执行", "容易放弃"],
    compatibleWith: ["INFJ", "INTJ", "ENFJ", "INFP"]
  },
  "INFJ": {
    name: "提倡者",
    description: "安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。",
    traits: ["直觉", "同情心", "理想主义", "洞察力"],
    strengths: ["洞察人心", "理想主义", "同情心", "长远规划"],
    weaknesses: ["过于理想化", "不善于处理冲突", "容易过度付出"],
    compatibleWith: ["ENFP", "ENTP", "INFP", "INTJ"]
  },
  "INFP": {
    name: "调停者", 
    description: "诗意，善良利他主义，总是热心为正义和善良的事业而努力。",
    traits: ["理想主义", "创意", "善良", "灵活"],
    strengths: ["创意能力", "价值驱动", "适应性强", "同理心"],
    weaknesses: ["过于理想化", "缺乏实用性", "不善于做决定"],
    compatibleWith: ["ENFJ", "ENTJ", "INFJ", "INTJ"]
  },
  "ENFJ": {
    name: "主人公",
    description: "富有魅力和鼓舞力的领导者，能够使听众全神贯注。",
    traits: ["领导力", "热情", "组织能力", "关爱"],
    strengths: ["领导能力", "团队合作", "激励他人", "组织协调"],
    weaknesses: ["过于关注他人", "不善于拒绝", "容易忽视自己"],
    compatibleWith: ["INFP", "ISFP", "ENFP", "ENTP"]
  },
  "ENFP": {
    name: "竞选者", 
    description: "热情，有创造力且社交能力强的自由精神，总能找到理由微笑。",
    traits: ["热情", "创意", "社交", "灵活"],
    strengths: ["社交能力", "创意能力", "热情感染", "适应性强"],
    weaknesses: ["缺乏持续性", "不善于处理细节", "容易分心"],
    compatibleWith: ["INFJ", "INTJ", "ENFJ", "ENFP"]
  },
  "ISTJ": {
    name: "物流师",
    description: "实用且注重事实的可靠人士，其可靠性毋庸置疑。",
    traits: ["可靠", "实用", "负责", "组织性"],
    strengths: ["可靠性", "组织能力", "执行能力", "忠诚度"],
    weaknesses: ["过于保守", "不善于创新", "难以适应变化"],
    compatibleWith: ["ESFP", "ESTP", "ISFJ", "ISTP"]
  },
  "ISFJ": {
    name: "守护者",
    description: "非常专注，温暖的守护者，时刻准备着保护所爱的人。",
    traits: ["关爱", "责任", "细心", "稳定"],
    strengths: ["关怀他人", "责任心强", "细致入微", "稳定可靠"],
    weaknesses: ["过于自我牺牲", "不善于拒绝", "害怕冲突"],
    compatibleWith: ["ESFP", "ESTP", "ISFP", "ISTP"]
  },
  "ESTJ": {
    name: "总经理",
    description: "出色的管理者，在管理事物或人员方面无人能出其右。",
    traits: ["领导力", "组织", "决策", "效率"],
    strengths: ["管理能力", "决策能力", "执行力", "责任心"],
    weaknesses: ["过于刚性", "不善于处理情感", "缺乏灵活性"],
    compatibleWith: ["ISFP", "ISTP", "ESFJ", "ESTP"]
  },
  "ESFJ": {
    name: "执政官",
    description: "非常关心他人，社交能力强，总是很热心地帮助他人。",
    traits: ["关爱", "社交", "组织", "责任"],
    strengths: ["人际交往", "团队合作", "关心他人", "组织协调"],
    weaknesses: ["过于关注他人评价", "不善于处理批评", "缺乏创新"],
    compatibleWith: ["ISFP", "ISTP", "INFP", "ENFP"]
  },
  "ISTP": {
    name: "鉴赏家",
    description: "大胆且实用的实验家，擅长使用各种工具。",
    traits: ["实用", "灵活", "冷静", "独立"],
    strengths: ["实践能力", "问题解决", "独立工作", "冷静分析"],
    weaknesses: ["不善于长期规划", "缺乏社交技巧", "不善于表达情感"],
    compatibleWith: ["ESFJ", "ESTJ", "ISFJ", "ISTJ"]
  },
  "ISFP": {
    name: "探险家",
    description: "灵活有魅力的艺术家，时刻准备着探索新的可能性。",
    traits: ["艺术性", "灵活", "善良", "独立"],
    strengths: ["艺术天赋", "灵活性", "同理心", "创新能力"],
    weaknesses: ["不善于规划", "避免冲突", "缺乏自信"],
    compatibleWith: ["ESFJ", "ESTJ", "ISFJ", "ISTJ"]
  },
  "ESTP": {
    name: "企业家",
    description: "聪明，精力充沛且善于感知的人，真正享受生活在边缘。",
    traits: ["活力", "实用", "社交", "适应"],
    strengths: ["适应能力", "社交能力", "行动力", "问题解决"],
    weaknesses: ["缺乏长期规划", "不善于理论研究", "容易冲动"],
    compatibleWith: ["ISFJ", "ISTJ", "ESFP", "ESTJ"]
  },
  "ESFP": {
    name: "娱乐家",
    description: "自发的，精力充沛且热情的人，生活对他们来说决不无聊。",
    traits: ["热情", "自发", "社交", "灵活"],
    strengths: ["社交能力", "热情感染", "适应性强", "乐观积极"],
    weaknesses: ["缺乏规划", "不善于处理冲突", "容易分心"],
    compatibleWith: ["ISFJ", "ISTJ", "ESFP", "ESTP"]
  }
}

// MBTI 题目数据（简化版，实际应该有更多题目）
export const mbtiQuestions = [
  {
    id: 1,
    question: "在社交场合中，你通常：",
    options: [
      { text: "主动与陌生人交谈", dimension: "E" },
      { text: "等待他人主动", dimension: "I" }
    ]
  },
  {
    id: 2,
    question: "你更倾向于关注：",
    options: [
      { text: "具体的事实和细节", dimension: "S" },
      { text: "可能性和概念", dimension: "N" }
    ]
  },
  {
    id: 3,
    question: "做决定时，你更依赖：",
    options: [
      { text: "逻辑分析", dimension: "T" },
      { text: "个人价值观", dimension: "F" }
    ]
  },
  {
    id: 4,
    question: "你更喜欢：",
    options: [
      { text: "按计划行事", dimension: "J" },
      { text: "保持灵活", dimension: "P" }
    ]
  },
  {
    id: 5,
    question: "在工作中，你更喜欢：",
    options: [
      { text: "与团队合作", dimension: "E" },
      { text: "独立工作", dimension: "I" }
    ]
  },
  {
    id: 6,
    question: "学习新知识时，你更喜欢：",
    options: [
      { text: "具体例子和实践", dimension: "S" },
      { text: "理论概念", dimension: "N" }
    ]
  },
  {
    id: 7,
    question: "处理问题时，你更重视：",
    options: [
      { text: "客观公正", dimension: "T" },
      { text: "考虑他人感受", dimension: "F" }
    ]
  },
  {
    id: 8,
    question: "你的工作风格是：",
    options: [
      { text: "有组织有计划", dimension: "J" },
      { text: "随性应变", dimension: "P" }
    ]
  }
]