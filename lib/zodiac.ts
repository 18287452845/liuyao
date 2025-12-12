// 十二星座基本信息
export const zodiacSigns = {
  "白羊座": {
    name: "白羊座",
    english: "Aries",
    symbol: "♈",
    element: "火",
    dateRange: "3月21日 - 4月19日",
    planet: "火星",
    traits: ["勇敢", "冲动", "领导力", "热情"],
    description: "白羊座的人充满活力，勇敢无畏，具有天生的领导才能。",
    strengths: ["勇气", "决心", "热情", "诚实"],
    weaknesses: ["冲动", "自大", "缺乏耐心", "自私"]
  },
  "金牛座": {
    name: "金牛座", 
    english: "Taurus",
    symbol: "♉",
    element: "土",
    dateRange: "4月20日 - 5月20日",
    planet: "金星",
    traits: ["稳定", "固执", "实用", "忠诚"],
    description: "金牛座的人性格稳定务实，忠诚可靠，喜欢美好的事物。",
    strengths: ["可靠", "实用", "忠诚", "有耐心"],
    weaknesses: ["固执", "懒惰", "占有欲强", "嫉妒心强"]
  },
  "双子座": {
    name: "双子座",
    english: "Gemini", 
    symbol: "♊",
    element: "风",
    dateRange: "5月21日 - 6月20日",
    planet: "水星",
    traits: ["机智", "善变", "沟通", "好奇"],
    description: "双子座的人聪明机智，善于沟通，好奇心强，适应能力强。",
    strengths: ["智慧", "适应力", "沟通能力", "多才多艺"],
    weaknesses: ["善变", "缺乏持久力", "不负责任", "优柔寡断"]
  },
  "巨蟹座": {
    name: "巨蟹座",
    english: "Cancer",
    symbol: "♋", 
    element: "水",
    dateRange: "6月21日 - 7月22日",
    planet: "月亮",
    traits: ["关爱", "情绪化", "保护", "家庭"],
    description: "巨蟹座的人感情丰富，关爱他人，特别重视家庭和亲情。",
    strengths: ["同情心", "关怀他人", "忠诚", "记忆能力"],
    weaknesses: ["情绪化", "过度敏感", "消极", "占有欲强"]
  },
  "狮子座": {
    name: "狮子座",
    english: "Leo",
    symbol: "♌",
    element: "火", 
    dateRange: "7月23日 - 8月22日",
    planet: "太阳",
    traits: ["自信", "慷慨", "戏剧性", "高贵"],
    description: "狮子座的人自信大方，具有天生的表演才能和领导气质。",
    strengths: ["自信", "慷慨", "忠诚", "有创造力"],
    weaknesses: ["自大", "固执", "懒惰", "喜欢被奉承"]
  },
  "处女座": {
    name: "处女座",
    english: "Virgo",
    symbol: "♍",
    element: "土",
    dateRange: "8月23日 - 9月22日", 
    planet: "水星",
    traits: ["完美主义", "实用", "分析", "谦逊"],
    description: "处女座的人追求完美，注重细节，实用主义，喜欢帮助他人。",
    strengths: ["分析能力", "实用", "忠诚", "谦逊"],
    weaknesses: ["完美主义", "挑剔", "担心过度", "保守"]
  },
  "天秤座": {
    name: "天秤座",
    english: "Libra",
    symbol: "♎",
    element: "风",
    dateRange: "9月23日 - 10月22日",
    planet: "金星", 
    traits: ["平衡", "和谐", "社交", "犹豫"],
    description: "天秤座的人追求平衡与和谐，善于社交，具有很强的审美能力。",
    strengths: ["社交能力", "公正", "合作", "审美能力"],
    weaknesses: ["犹豫不决", "避免冲突", "不负责任", "自我怀疑"]
  },
  "天蝎座": {
    name: "天蝎座",
    english: "Scorpio",
    symbol: "♏",
    element: "水",
    dateRange: "10月23日 - 11月21日",
    planet: "冥王星",
    traits: ["神秘", "强烈", "专注", "报复"],
    description: "天蝎座的人情感强烈而深沉，专注力强，具有神秘的魅力。",
    strengths: ["意志力", "专注", "洞察力", "忠诚"],
    weaknesses: ["嫉妒", "报复心", "固执", "情绪化"]
  },
  "射手座": {
    name: "射手座",
    english: "Sagittarius", 
    symbol: "♐",
    element: "火",
    dateRange: "11月22日 - 12月21日",
    planet: "木星",
    traits: ["自由", "冒险", "乐观", "哲学"],
    description: "射手座的人热爱自由，乐观开朗，喜欢冒险和探索未知。",
    strengths: ["乐观", "诚实", "智慧", "独立"],
    weaknesses: ["不负责任", "缺乏耐心", "鲁莽", "不敏感"]
  },
  "摩羯座": {
    name: "摩羯座",
    english: "Capricorn",
    symbol: "♑",
    element: "土",
    dateRange: "12月22日 - 1月19日",
    planet: "土星",
    traits: ["野心", "实用", "保守", "负责"],
    description: "摩羯座的人有强烈的野心和责任感，实用主义，行事谨慎。",
    strengths: ["责任心", "自控力", "实用", "忠诚"],
    weaknesses: ["固执", "悲观", "贪婪", "冷酷"]
  },
  "水瓶座": {
    name: "水瓶座",
    english: "Aquarius",
    symbol: "♒",
    element: "风",
    dateRange: "1月20日 - 2月18日",
    planet: "天王星", 
    traits: ["独立", "创新", "人道", "固执"],
    description: "水瓶座的人独立创新，人道主义，具有前瞻性思维和独特见解。",
    strengths: ["创新", "独立", "人道", "理想主义"],
    weaknesses: ["固执", "不切实际", "情感疏远", "叛逆"]
  },
  "双鱼座": {
    name: "双鱼座",
    english: "Pisces",
    symbol: "♓",
    element: "水",
    dateRange: "2月19日 - 3月20日",
    planet: "海王星",
    traits: ["同情", "艺术", "直觉", "逃避"],
    description: "双鱼座的人富有同情心，直觉敏锐，具有强烈的艺术天赋。",
    strengths: ["同情心", "艺术天赋", "直觉", "适应性"],
    weaknesses: ["恐惧", "过于信任", "悲伤", "自我毁灭"]
  }
}

// 星座匹配度（简化版）
export const zodiacCompatibility = {
  "白羊座": {
    "白羊座": 85,
    "金牛座": 65,
    "双子座": 75,
    "巨蟹座": 45,
    "狮子座": 90,
    "处女座": 55,
    "天秤座": 70,
    "天蝎座": 70,
    "射手座": 95,
    "摩羯座": 50,
    "水瓶座": 80,
    "双鱼座": 60
  },
  "金牛座": {
    "白羊座": 65,
    "金牛座": 80,
    "双子座": 50,
    "巨蟹座": 85,
    "狮子座": 70,
    "处女座": 90,
    "天秤座": 95,
    "天蝎座": 85,
    "射手座": 45,
    "摩羯座": 95,
    "水瓶座": 55,
    "双鱼座": 75
  },
  // ... 为所有星座添加兼容性数据
  "双子座": {
    "白羊座": 75,
    "金牛座": 50,
    "双子座": 75,
    "巨蟹座": 55,
    "狮子座": 80,
    "处女座": 60,
    "天秤座": 85,
    "天蝎座": 65,
    "射手座": 90,
    "摩羯座": 45,
    "水瓶座": 95,
    "双鱼座": 70
  }
  // ... 继续为所有星座定义兼容性
}