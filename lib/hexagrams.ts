// 增删卜易六十四卦数据
export const hexagrams = {
  1: {
    name: "乾为天",
    symbol: "☰",
    binary: "111111",
    description: "元亨利贞",
    interpretation: "大吉大利，事业有成。"
  },
  2: {
    name: "坤为地",
    symbol: "☷", 
    binary: "000000",
    description: "元亨，利牝马之贞",
    interpretation: "柔顺致福，厚德载物。"
  },
  3: {
    name: "水雷屯",
    symbol: "☵☳",
    binary: "010001",
    description: "元亨利贞，勿用有攸往",
    interpretation: "初生困难，坚持正道。"
  },
  4: {
    name: "山水蒙",
    symbol: "☶☵",
    binary: "100010",
    description: "亨，匪我求童蒙，童蒙求我",
    interpretation: "启蒙教育，虚心求教。"
  },
  5: {
    name: "水天需",
    symbol: "☵☰",
    binary: "010111",
    description: "有孚，光亨，贞吉",
    interpretation: "等待时机，坚守诚信。"
  },
  6: {
    name: "天水讼",
    symbol: "☰☵",
    binary: "111010",
    description: "有孚，窒惕，中吉",
    interpretation: "争讼纠纷，需谨慎处理。"
  },
  7: {
    name: "地水师",
    symbol: "☷☵",
    binary: "000010",
    description: "贞，丈人吉，无咎",
    interpretation: "统帅之道，正义必胜。"
  },
  8: {
    name: "水地比",
    symbol: "☵☷",
    binary: "010000",
    description: "吉，原筮元永贞",
    interpretation: "团结协作，和谐共处。"
  },
  9: {
    name: "风天小畜",
    symbol: "☴☰",
    binary: "110111",
    description: "亨，密云不雨",
    interpretation: "小有积蓄，等待时机。"
  },
  10: {
    name: "天泽履",
    symbol: "☰☱",
    binary: "111011",
    description: "履虎尾，不咥人，亨",
    interpretation: "谨慎行事，化险为夷。"
  },
  11: {
    name: "地天泰",
    symbol: "☷☰",
    binary: "000111",
    description: "小往大来，吉亨",
    interpretation: "天地交泰，万事亨通。"
  },
  12: {
    name: "天地否",
    symbol: "☰☷",
    binary: "111000",
    description: "否之匪人，不利君子贞",
    interpretation: "天地不交，闭塞不通。"
  },
  13: {
    name: "天火同人",
    symbol: "☰☲",
    binary: "111101",
    description: "同人于野，亨，利涉大川",
    interpretation: "团结同心，合作共赢。"
  },
  14: {
    name: "火天大有",
    symbol: "☲☰",
    binary: "101111",
    description: "元亨",
    interpretation: "大有所获，事业兴隆。"
  },
  15: {
    name: "地山谦",
    symbol: "☷☶",
    binary: "000100",
    description: "亨，君子有终",
    interpretation: "谦逊待人，必有厚福。"
  },
  16: {
    name: "雷地豫",
    symbol: "☳☷",
    binary: "001000",
    description: "利建侯，行师",
    interpretation: "愉悦和乐，众心归一。"
  },
  17: {
    name: "泽雷随",
    symbol: "☱☳",
    binary: "011001",
    description: "元亨利贞，无咎",
    interpretation: "随从他人，顺应时势。"
  },
  18: {
    name: "山风蛊",
    symbol: "☶☴",
    binary: "100110",
    description: "元亨，利涉大川",
    interpretation: "除旧布新，改革图强。"
  },
  19: {
    name: "地泽临",
    symbol: "☷☱",
    binary: "000011",
    description: "元亨利贞，至于八月有凶",
    interpretation: "君临天下，恩威并施。"
  },
  20: {
    name: "风地观",
    symbol: "☴☷",
    binary: "110000",
    description: "盥而不荐，有孚颙若",
    interpretation: "观察学习，诚敬待人。"
  },
  21: {
    name: "火雷噬嗑",
    symbol: "☲☳",
    binary: "101001",
    description: "亨，利用狱",
    interpretation: "执法严明，除恶务尽。"
  },
  22: {
    name: "山火贲",
    symbol: "☶☲",
    binary: "100101",
    description: "亨，小利有攸往",
    interpretation: "文饰美观，内在充实。"
  },
  23: {
    name: "山地剥",
    symbol: "☶☷",
    binary: "100000",
    description: "不利有攸往",
    interpretation: "剥落衰败，谨慎行事。"
  },
  24: {
    name: "地雷复",
    symbol: "☷☳",
    binary: "000001",
    description: "亨，出入无疾，朋来无咎",
    interpretation: "一阳来复，万象更新。"
  },
  25: {
    name: "天雷无妄",
    symbol: "☰☳",
    binary: "111001",
    description: "元亨利贞，其匪正有眚",
    interpretation: "诚实无妄，自然规律。"
  },
  26: {
    name: "山天大畜",
    symbol: "☶☰",
    binary: "100111",
    description: "利贞，不家食吉",
    interpretation: "大量积蓄，厚德载物。"
  },
  27: {
    name: "山雷颐",
    symbol: "☶☳",
    binary: "100001",
    description: "贞吉，观颐，自求口实",
    interpretation: "颐养天年，自食其力。"
  },
  28: {
    name: "泽风大过",
    symbol: "☱☴",
    binary: "011110",
    description: "栋挠，利有攸往，亨",
    interpretation: "负荷过重，需要调整。"
  },
  29: {
    name: "坎为水",
    symbol: "☵",
    binary: "010010",
    description: "习坎，有孚，维心亨",
    interpretation: "重险之地，诚心待人。"
  },
  30: {
    name: "离为火",
    symbol: "☲",
    binary: "101101",
    description: "利贞，亨，畜牝牛吉",
    interpretation: "光明正大，柔顺如牛。"
  },
  31: {
    name: "泽山咸",
    symbol: "☱☶",
    binary: "011100",
    description: "亨，利贞，取女吉",
    interpretation: "感应交感，心灵相通。"
  },
  32: {
    name: "雷风恒",
    symbol: "☳☴",
    binary: "001110",
    description: "亨，无咎，利贞",
    interpretation: "恒久不变，坚持不懈。"
  },
  33: {
    name: "天山遁",
    symbol: "☰☶",
    binary: "111100",
    description: "亨，小利贞",
    interpretation: "退避三舍，保存实力。"
  },
  34: {
    name: "雷天大壮",
    symbol: "☳☰",
    binary: "001111",
    description: "利贞",
    interpretation: "势力壮大，但需守正。"
  },
  35: {
    name: "火地晋",
    symbol: "☲☷",
    binary: "101000",
    description: "康侯用锡马蕃庶",
    interpretation: "晋升发展，光明在前。"
  },
  36: {
    name: "地火明夷",
    symbol: "☷☲",
    binary: "000101",
    description: "利艰贞",
    interpretation: "光明受损，需隐忍待时。"
  },
  37: {
    name: "风火家人",
    symbol: "☴☲",
    binary: "110101",
    description: "利女贞",
    interpretation: "家庭和睦，内正外顺。"
  },
  38: {
    name: "火泽睽",
    symbol: "☲☱",
    binary: "101011",
    description: "小事吉",
    interpretation: "意见分歧，和而不同。"
  },
  39: {
    name: "水山蹇",
    symbol: "☵☶",
    binary: "010100",
    description: "利西南，不利东北",
    interpretation: "行走艰难，寻求援助。"
  },
  40: {
    name: "雷水解",
    symbol: "☳☵",
    binary: "001010",
    description: "利西南，往得众也",
    interpretation: "解除困难，得到帮助。"
  },
  41: {
    name: "山泽损",
    symbol: "☶☱",
    binary: "100011",
    description: "有孚，元吉，无咎",
    interpretation: "损己益人，诚实守信。"
  },
  42: {
    name: "雷风益",
    symbol: "☳☴",
    binary: "001110",
    description: "利有攸往，利涉大川",
    interpretation: "增益益人，互助互利。"
  },
  43: {
    name: "泽天夬",
    symbol: "☱☰",
    binary: "011111",
    description: "扬于王庭，孚号有厉",
    interpretation: "决断果敢，铲除邪恶。"
  },
  44: {
    name: "天风姤",
    symbol: "☰☴",
    binary: "111110",
    description: "女壮，勿用取女",
    interpretation: "阴阳相遇，女子强势。"
  },
  45: {
    name: "泽地萃",
    symbol: "☱☷",
    binary: "011000",
    description: "亨，王假有庙",
    interpretation: "聚集团结，祭祀祈福。"
  },
  46: {
    name: "地风升",
    symbol: "☷☴",
    binary: "000110",
    description: "元亨，用见大人",
    interpretation: "上升发展，贵人相助。"
  },
  47: {
    name: "泽水困",
    symbol: "☱☵",
    binary: "011010",
    description: "亨，贞大人吉",
    interpretation: "困难重重，坚守正道。"
  },
  48: {
    name: "水风井",
    symbol: "☵☴",
    binary: "010110",
    description: "改邑不改井，无丧无得",
    interpretation: "井德有用，恒久不变。"
  },
  49: {
    name: "泽火革",
    symbol: "☱☲",
    binary: "011101",
    description: "巳日乃孚，元亨利贞",
    interpretation: "革命变革，推陈出新。"
  },
  50: {
    name: "火风鼎",
    symbol: "☲☴",
    binary: "101110",
    description: "元吉，亨",
    interpretation: "鼎新立业，繁荣昌盛。"
  },
  51: {
    name: "震为雷",
    symbol: "☳",
    binary: "001001",
    description: "亨，震来虩虩",
    interpretation: "雷声震撼，惊醒世人。"
  },
  52: {
    name: "艮为山",
    symbol: "☶",
    binary: "100100",
    description: "艮其背，不获其身",
    interpretation: "止于当止，宁静致远。"
  },
  53: {
    name: "风山渐",
    symbol: "☴☶",
    binary: "110100",
    description: "女归吉，利贞",
    interpretation: "循序渐进，女子归嫁。"
  },
  54: {
    name: "雷泽归妹",
    symbol: "☳☱",
    binary: "001011",
    description: "征凶，无攸利",
    interpretation: "女子出嫁，但有阻碍。"
  },
  55: {
    name: "雷火丰",
    symbol: "☳☲",
    binary: "001101",
    description: "亨，王假之",
    interpretation: "丰盛繁荣，王者风范。"
  },
  56: {
    name: "火山旅",
    symbol: "☲☶",
    binary: "101100",
    description: "亨，小贞，吝",
    interpretation: "旅途在外，小有困难。"
  },
  57: {
    name: "巽为风",
    symbol: "☴",
    binary: "110110",
    description: "小亨，利有攸往",
    interpretation: "风行天下，谦逊柔和。"
  },
  58: {
    name: "兑为泽",
    symbol: "☱",
    binary: "011011",
    description: "亨，利贞",
    interpretation: "喜悦愉悦，文明交流。"
  },
  59: {
    name: "风水涣",
    symbol: "☴☵",
    binary: "110010",
    description: "亨，王假有庙",
    interpretation: "涣散重新，聚集力量。"
  },
  60: {
    name: "水泽节",
    symbol: "☵☱",
    binary: "010011",
    description: "亨，苦节不可贞",
    interpretation: "节制有度，不可过分。"
  },
  61: {
    name: "风泽中孚",
    symbol: "☴☱",
    binary: "110011",
    description: "豚鱼吉，利涉大川",
    interpretation: "内心诚信，感动天地。"
  },
  62: {
    name: "雷山小过",
    symbol: "☳☶",
    binary: "001100",
    description: "亨，利贞",
    interpretation: "小有过错，及时改正。"
  },
  63: {
    name: "水火既济",
    symbol: "☵☲",
    binary: "010101",
    description: "亨，小利贞",
    interpretation: "水火相济，大功告成。"
  },
  64: {
    name: "火水未济",
    symbol: "☲☵",
    binary: "101010",
    description: "亨，小狐汔济",
    interpretation: "事业未成，仍需努力。"
  }
}

// 卜筮正宗占卜方法数据
export const buShiZhengZong = {
  method: "卜筮正宗",
  description: "传统筮草占卜法",
  steps: [
    "准备五十根筮草（或牙签）",
    "拿出一根放一边，象征太极",
    "将四十九根分为两组",
    "从右手组中抽出一根，夹在左手小指和无名指间",
    "将两组筮草分别除以4，得出余数",
    "根据余数确定爻的阴阳"
  ]
}