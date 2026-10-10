/*
 * ============================================================
 *  拼音数据（用于右侧 A-Z 索引，以及中英文混排的排序）
 * ============================================================
 *
 *  这是内部实现文件，一般不需要改动。
 *
 *  格式：'字': '拼音'，小写、不标声调，ü 写成 v。
 *
 *  什么时候要改：加了新歌或新歌手之后，如果它名字的第一个字不在下表里，
 *  该条目会掉到最后的「#」分组。这时在对应字母的注释下面补一条即可。
 *
 *  注意多音字要按歌单里的实际读音填，例如「咖」在《咖喱咖喱》里读 gā，
 *  所以写成 '咖': 'ga'（字典默认是 ka）。
 */

window.PINYI = {
  // A
  '阿': 'a', '爱': 'ai', '艾': 'ai', '安': 'an', '暗': 'an',
  // B
  '白': 'bai', '半': 'ban', '宝': 'bao', '被': 'bei', '别': 'bie', '不': 'bu',
  // C
  '彩': 'cai', '蔡': 'cai', '岑': 'cen', '陈': 'chen', '成': 'cheng', '程': 'cheng',
  '词': 'ci', '从': 'cong', '错': 'cuo',
  // D
  '大': 'da', '达': 'da', '戴': 'dai', '单': 'dan', '胆': 'dan', '当': 'dang',
  '倒': 'dao', '稻': 'dao', '第': 'di', '东': 'dong', '冬': 'dong', '动': 'dong',
  '都': 'dou', '独': 'du',
  // F
  '发': 'fa', '范': 'fan', '房': 'fang', '方': 'fang', '菲': 'fei', '飞': 'fei',
  '分': 'fen', '枫': 'feng', '傅': 'fu',
  // G
  '咖': 'ga', '该': 'gai', '告': 'gao', '高': 'gao', '搁': 'ge', '给': 'gei',
  '孤': 'gu', '光': 'guang', '轨': 'gui', '鬼': 'gui', '国': 'guo', '过': 'guo',
  '郭': 'guo',
  // H
  '好': 'hao', '何': 'he', '洪': 'hong', '红': 'hong', '虹': 'hong', '厚': 'hou',
  '后': 'hou', '忽': 'hu', '胡': 'hu', '虎': 'hu', '花': 'hua', '黄': 'huang',
  '火': 'huo',
  // J
  '即': 'ji', '寂': 'ji', '佳': 'jia', '假': 'jia', '嘉': 'jia', '江': 'jiang',
  '讲': 'jiang', '焦': 'jiao', '今': 'jin', '金': 'jin', '静': 'jing', '九': 'jiu',
  '就': 'jiu', '酒': 'jiu', '倔': 'jue',
  // K
  '可': 'ke', '空': 'kong',
  // L
  '老': 'lao', '李': 'li', '离': 'li', '梁': 'liang', '林': 'lin', '刘': 'liu',
  '卢': 'lu', '路': 'lu', '落': 'luo', '旅': 'lv',
  // M
  '猫': 'mao', '没': 'mei', '美': 'mei', '迷': 'mi', '明': 'ming', '莫': 'mo',
  // N
  '那': 'na', '南': 'nan', '你': 'ni', '宁': 'ning', '柠': 'ning', '牛': 'niu',
  // P
  '品': 'pin',
  // Q
  '七': 'qi', '奇': 'qi', '气': 'qi', '齐': 'qi', '秦': 'qin', '庆': 'qing',
  '情': 'qing', '晴': 'qing', '青': 'qing', '曲': 'qu',
  // R
  '人': 'ren', '任': 'ren', '日': 'ri', '容': 'rong', '如': 'ru',
  // S
  '杀': 'sha', '沙': 'sha', '世': 'shi', '十': 'shi', '失': 'shi', '拾': 'shi',
  '时': 'shi', '是': 'shi', '水': 'shui', '说': 'shuo', '司': 'si', '私': 'si',
  '宋': 'song', '素': 'su', '苏': 'su', '算': 'suan', '岁': 'sui', '孙': 'sun',
  // T
  '她': 'ta', '陶': 'tao', '特': 'te', '体': 'ti', '天': 'tian', '甜': 'tian',
  '田': 'tian', '童': 'tong', '突': 'tu', '退': 'tui', '妥': 'tuo',
  // W
  '外': 'wai', '万': 'wan', '丸': 'wan', '晚': 'wan', '汪': 'wang', '王': 'wang',
  '卫': 'wei', '微': 'wei', '温': 'wen', '我': 'wo', '五': 'wu', '伍': 'wu',
  '勿': 'wu',
  // X
  '夏': 'xia', '先': 'xian', '弦': 'xian', '像': 'xiang', '想': 'xiang', '嚣': 'xiao', '小': 'xiao',
  '笑': 'xiao', '萧': 'xiao', '信': 'xin', '心': 'xin', '徐': 'xu', '许': 'xu',
  '薛': 'xue', '寻': 'xun',
  // Y
  '丫': 'ya', '严': 'yan', '演': 'yan', '烟': 'yan', '颜': 'yan', '杨': 'yang',
  '洋': 'yang', '遥': 'yao', '叶': 'ye', '野': 'ye', '一': 'yi', '亦': 'yi',
  '依': 'yi', '易': 'yi', '疑': 'yi', '银': 'yin', '阴': 'yin', '有': 'you',
  '与': 'yu', '于': 'yu', '喻': 'yu', '遇': 'yu', '郁': 'yu', '袁': 'yuan',
  '约': 'yue', '云': 'yun',
  // Z
  '怎': 'zen', '曾': 'zeng', '展': 'zhan', '张': 'zhang', '这': 'zhe', '真': 'zhen',
  '郑': 'zheng', '至': 'zhi', '周': 'zhou', '朱': 'zhu', '祝': 'zhu', '追': 'zhui',
  '走': 'zou', '最': 'zui',
};

// 取一首歌（或歌手）首字的拼音，未收录返回空字符串
window.getPinyin = function (name) {
  var s = String(name || '').trim();
  return s ? (window.PINYI[s.charAt(0)] || '') : '';
};

// 取拼音首字母：拉丁字母返回大写、数字返回 #、未收录返回 #
window.getInitial = function (name) {
  var s = String(name || '').trim();
  if (!s) return '#';
  var ch = s.charAt(0);
  if (/[A-Za-z]/.test(ch)) return ch.toUpperCase();
  if (/[0-9]/.test(ch)) return '#';
  var py = window.PINYI[ch];
  return py ? py.charAt(0).toUpperCase() : '#';
};

// 排序键：中文按拼音、英文按字母表，两者放进同一个序列里直接比较，
// 这样英文歌会插到拼音顺序里正确的位置，而不是被压到每组最前面。
window.getSortKey = function (name) {
  var s = String(name || '').trim();
  if (!s) return '\uffff';
  var ch = s.charAt(0);
  if (/[A-Za-z]/.test(ch)) return s.toLowerCase();
  var py = window.PINYI[ch];
  if (py) return py;
  return '\uffff' + s;
};
