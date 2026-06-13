const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
const topbar = $('#topbar');
const toast = $('#toast');
const taskList = $('#taskList');
const progressText = $('#progressText');
const progressBar = $('#progressBar');
const starCount = $('#starCount');
const aiSummary = $('#aiSummary');
const kidAvatar = $('#kidAvatar');
const kidName = $('#kidName');
const kidDesc = $('#kidDesc');
const dailyTitle = $('#dailyTitle');
const dailySub = $('#dailySub');
const gradeMap = $('#gradeMap');
const gradeDetail = $('#gradeDetail');
const quizModal = $('#quizModal');
const quizTag = $('#quizTag');
const quizCount = $('#quizCount');
const quizProgress = $('#quizProgress');
const quizTitle = $('#quizTitle');
const quizQuestion = $('#quizQuestion');
const optionGrid = $('#optionGrid');
const quizFeedback = $('#quizFeedback');

const CHILDREN = {
  younger: {
    avatar: '🚀',
    name: '弟弟的今日学习',
    desc: '重点是兴趣、表达、数字感、英语听读和规则感，题目要短、慢、好玩。',
    title: '大班每日15题：语文5题、数学5题、英语5题',
    sub: '每题会尽量短，适合慢慢听、慢慢选，完成后提示休息。'
  },
  older: {
    avatar: '🧠',
    name: '哥哥的二升三衔接',
    desc: '重点是阅读理解、万以内计算、英语句型、科学探索和主动规划。',
    title: '二升三每日15题：语文5题、数学5题、英语5题',
    sub: '用15题保持手感，再用科普和运动实践打开兴趣。'
  }
};

const TASKS = [
  ['信心启动', '先听一句鼓励语，告诉孩子今天只要完成小目标就很棒。'],
  ['语文5题', '识字、词语、阅读或表达，保护孩子愿意说、愿意写的兴趣。'],
  ['数学5题', '从数感、口算、应用题开始，逐步进入逻辑思维。'],
  ['英语5题', '单词、句型、听音、慢速跟读，尤其加强开口自信。'],
  ['科普探索', 'AI、宇宙、火箭、珠峰、奥运会等主题，每天一个好奇问题。'],
  ['运动实践', '足球、跑步、跳绳或亲子观察，让学习和身体一起成长。'],
  ['今日回顾', '总结答对、答错、需要复习和下一进度，完成后提示休息。']
];

const GRADES = [
  { id:'k', emoji:'🌱', name:'幼儿园大班', key:'兴趣启蒙', chinese:'听故事、看图说话、常见字、完整表达。', math:'10以内数感、比较、分类、图形、生活数量。', english:'字母歌、颜色、动物、水果、慢速跟读。', skill:'规则感、专注5-10分钟、敢说敢答。' },
  { id:'g1', emoji:'✏️', name:'一年级', key:'习惯建立', chinese:'拼音、识字、朗读、简单句。', math:'20以内加减、位置、钟表、图形。', english:'字母大小写、常见单词、问候语。', skill:'书包整理、作业流程、按步骤完成。' },
  { id:'g2', emoji:'📚', name:'二年级', key:'稳定自信', chinese:'词语积累、阅读短文、看图写话。', math:'乘法口诀、表内除法、长度单位。', english:'自然拼读启蒙、家庭、学校、动物主题。', skill:'错题复盘、每天坚持、表达原因。' },
  { id:'g3', emoji:'🚀', name:'三年级', key:'跨阶段升级', chinese:'段落阅读、作文开头结尾、成语古诗。', math:'万以内计算、两步应用题、时间面积。', english:'核心句型、听读跟读、简单对话。', skill:'学习计划、任务拆解、主动提问。' },
  { id:'g4', emoji:'🔭', name:'四年级', key:'理解深化', chinese:'中心句、人物描写、说明文阅读。', math:'大数、运算律、角、统计。', english:'短文阅读、过去/现在表达启蒙。', skill:'资料查找、主题汇报、项目学习。' },
  { id:'g5', emoji:'🤖', name:'五年级', key:'综合应用', chinese:'文章结构、观点表达、读书笔记。', math:'小数、分数、方程启蒙、几何。', english:'语篇理解、写小短文、日常交流。', skill:'AI工具素养、批判思考、长期目标。' },
  { id:'g6', emoji:'🏆', name:'六年级', key:'小升初衔接', chinese:'阅读策略、作文素材、文言启蒙。', math:'比例、百分数、综合应用题。', english:'语法整合、听说读写综合训练。', skill:'自主复习、考试策略、时间管理。' }
];

const BANKS = {
  younger: [
    { tag:'语文', q:'“太阳”一般在白天还是晚上出现？', a:'白天', o:['白天','晚上','冰箱里','书包里'] },
    { tag:'语文', q:'看见小朋友摔倒了，应该怎么做？', a:'去帮助他', o:['去帮助他','大声笑','跑开','抢玩具'] },
    { tag:'语文', q:'“苹果”是几个字？', a:'2个字', o:['2个字','1个字','3个字','4个字'] },
    { tag:'语文', q:'小猫怎么叫？', a:'喵喵', o:['喵喵','汪汪','咩咩','嘎嘎'] },
    { tag:'语文', q:'听故事时，眼睛看着谁更有礼貌？', a:'讲故事的人', o:['讲故事的人','地板','窗外','玩具箱'] },
    { tag:'数学', q:'3个苹果再加2个苹果，一共有几个？', a:'5个', o:['5个','4个','6个','2个'] },
    { tag:'数学', q:'哪个数字最大？', a:'9', o:['9','3','6','1'] },
    { tag:'数学', q:'圆形像什么？', a:'皮球', o:['皮球','尺子','书本','筷子'] },
    { tag:'数学', q:'一只手有几根手指？', a:'5根', o:['5根','4根','6根','10根'] },
    { tag:'数学', q:'从1数到5，5后面是几？', a:'6', o:['6','4','3','8'] },
    { tag:'英语', q:'apple 是什么意思？', a:'苹果', o:['苹果','小狗','书','太阳'], say:'apple' },
    { tag:'英语', q:'cat 是什么意思？', a:'猫', o:['猫','鱼','鸟','球'], say:'cat' },
    { tag:'英语', q:'red 是什么颜色？', a:'红色', o:['红色','蓝色','绿色','黑色'], say:'red' },
    { tag:'英语', q:'Hello! 可以用来做什么？', a:'打招呼', o:['打招呼','睡觉','吃饭','跑步'], say:'Hello' },
    { tag:'英语', q:'Good morning 是什么意思？', a:'早上好', o:['早上好','晚安','谢谢','再见'], say:'Good morning' }
  ],
  older: [
    { tag:'语文', q:'“专心致志”更接近下面哪个意思？', a:'非常专心', o:['非常专心','非常害怕','跑得很快','声音很大'] },
    { tag:'语文', q:'写作文时，开头最好先交代什么？', a:'时间地点人物', o:['时间地点人物','只写价格','只写颜色','只写数字'] },
    { tag:'语文', q:'“春风又绿江南岸”的“绿”写出了什么？', a:'春天的生机', o:['春天的生机','冬天很冷','晚上很黑','声音很大'] },
    { tag:'语文', q:'阅读短文时，找中心意思通常要看什么？', a:'关键句', o:['关键句','标点数量','纸张颜色','字的大小'] },
    { tag:'语文', q:'“因为……所以……”表示什么关系？', a:'因果关系', o:['因果关系','并列关系','颜色关系','大小关系'] },
    { tag:'数学', q:'246 + 358 = ?', a:'604', o:['604','594','614','704'] },
    { tag:'数学', q:'800 - 275 = ?', a:'525', o:['525','535','425','575'] },
    { tag:'数学', q:'7 × 8 = ?', a:'56', o:['56','54','64','48'] },
    { tag:'数学', q:'一支笔3元，买8支要多少元？', a:'24元', o:['24元','11元','18元','32元'] },
    { tag:'数学', q:'一个长方形有几条边？', a:'4条', o:['4条','3条','5条','6条'] },
    { tag:'英语', q:'How are you? 应该怎么回答？', a:"I'm fine, thank you.", o:["I'm fine, thank you.",'It is a cat.','Good night.','I like rice.'], say:'How are you? I am fine, thank you.' },
    { tag:'英语', q:'book 是什么意思？', a:'书', o:['书','狗','水','铅笔'], say:'book' },
    { tag:'英语', q:'I like football. 是什么意思？', a:'我喜欢足球', o:['我喜欢足球','我有一本书','这是苹果','早上好'], say:'I like football.' },
    { tag:'英语', q:'What is your name? 是在问什么？', a:'你叫什么名字', o:['你叫什么名字','你几岁','这是什么','几点了'], say:'What is your name?' },
    { tag:'英语', q:'AI can help us learn. 中 learn 的意思是？', a:'学习', o:['学习','睡觉','奔跑','唱歌'], say:'AI can help us learn.' }
  ]
};

let currentChild = localStorage.getItem('learning-child') || 'younger';
let state = JSON.parse(localStorage.getItem('learning-state') || '{"stars":0,"done":0}');
let quiz = { index:0, right:0, wrong:0, questions:[], selected:false };
let restTimer = null;

function saveState(){
  localStorage.setItem('learning-state', JSON.stringify(state));
  localStorage.setItem('learning-child', currentChild);
}

function showToast(message){
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function speak(text, lang = 'zh-CN', rate = 0.88){
  if(!('speechSynthesis' in window)){
    showToast('当前浏览器不支持语音播报');
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

function renderChild(){
  const c = CHILDREN[currentChild];
  $$('.kid-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.child === currentChild));
  kidAvatar.textContent = c.avatar;
  kidName.textContent = c.name;
  kidDesc.textContent = c.desc;
  dailyTitle.textContent = c.title;
  dailySub.textContent = c.sub;
  renderTasks();
}

function renderTasks(){
  const done = Math.min(state.done || 0, TASKS.length);
  progressText.textContent = `${done} / ${TASKS.length}`;
  progressBar.style.width = `${done / TASKS.length * 100}%`;
  starCount.textContent = state.stars || 0;
  taskList.innerHTML = TASKS.map((task, index) => `
    <div class="task ${index < done ? 'done' : ''}">
      <div class="num">${index + 1}</div>
      <div><b>${task[0]}</b><span>${task[1]}</span></div>
    </div>
  `).join('');
}

function renderGrades(){
  gradeMap.innerHTML = GRADES.map((g, index) => `
    <button class="grade-card ${index === 0 ? 'active' : ''}" data-grade="${g.id}" type="button">
      <div class="emoji">${g.emoji}</div>
      <b>${g.name}</b>
      <span>${g.key}</span>
    </button>
  `).join('');
  renderGradeDetail(GRADES[0]);
}

function renderGradeDetail(g){
  $$('.grade-card').forEach(card => card.classList.toggle('active', card.dataset.grade === g.id));
  gradeDetail.innerHTML = `
    <span class="chip">${g.name} · ${g.key}</span>
    <h3>${g.emoji} ${g.name}阶段规划</h3>
    <p>这一阶段的目标不是追求难题，而是让孩子愿意开始、愿意表达、愿意坚持，并知道下一步怎么学。</p>
    <div class="detail-grid">
      <div><b>语文</b><span>${g.chinese}</span></div>
      <div><b>数学</b><span>${g.math}</span></div>
      <div><b>英语</b><span>${g.english}</span></div>
      <div><b>综合能力</b><span>${g.skill}</span></div>
    </div>
    <div class="task-actions" style="margin-top:18px">
      <button class="btn btn-primary" type="button" onclick="speakGrade('${g.id}')">🔊 播报这个阶段</button>
      <button class="btn btn-soft" type="button" onclick="showToast('已切换到${g.name}规划，可以继续补充详细题库。')">加入学习计划</button>
    </div>
  `;
}

window.speakGrade = function(id){
  const g = GRADES.find(item => item.id === id);
  if(!g) return;
  speak(`${g.name}，重点是${g.key}。语文：${g.chinese} 数学：${g.math} 英语：${g.english} 综合能力：${g.skill}`, 'zh-CN', id === 'k' ? 0.72 : 0.86);
};

function startQuiz(){
  quiz = { index:0, right:0, wrong:0, questions:[...BANKS[currentChild]], selected:false };
  quizModal.classList.add('open');
  quizModal.setAttribute('aria-hidden','false');
  renderQuestion();
  speak(currentChild === 'younger' ? '今天的十五题开始啦，慢慢听，慢慢选。' : '今日十五题开始，请认真读题，完成后做总结。', 'zh-CN', currentChild === 'younger' ? 0.76 : 0.88);
}

function renderQuestion(){
  const q = quiz.questions[quiz.index];
  quiz.selected = false;
  quizFeedback.textContent = '';
  quizTag.textContent = q.tag;
  quizCount.textContent = `${quiz.index + 1} / ${quiz.questions.length}`;
  quizProgress.style.width = `${quiz.index / quiz.questions.length * 100}%`;
  quizTitle.textContent = `${q.tag} · 第${quiz.index + 1}题`;
  quizQuestion.textContent = q.q;
  optionGrid.innerHTML = q.o.map(option => `<button class="option" type="button">${option}</button>`).join('');
  $$('.option').forEach(btn => btn.addEventListener('click', () => chooseOption(btn, q)));
}

function chooseOption(btn, q){
  if(quiz.selected) return;
  quiz.selected = true;
  const ok = btn.textContent === q.a;
  btn.classList.add(ok ? 'correct' : 'wrong');
  $$('.option').forEach(item => {
    item.disabled = true;
    if(item.textContent === q.a) item.classList.add('correct');
  });
  if(ok){
    quiz.right += 1;
    quizFeedback.textContent = '答对啦！你又完成了一小步。';
    state.stars += 1;
    speak(q.tag === '英语' && q.say ? `Great! ${q.say}` : '答对啦，你很棒！', q.tag === '英语' ? 'en-US' : 'zh-CN', q.tag === '英语' ? 0.78 : 0.86);
  }else{
    quiz.wrong += 1;
    quizFeedback.textContent = `这是复习提醒，正确答案是：${q.a}`;
    speak(q.tag === '英语' && q.say ? `Let's review. ${q.say}` : `这是复习提醒，正确答案是${q.a}`, q.tag === '英语' ? 'en-US' : 'zh-CN', q.tag === '英语' ? 0.68 : 0.82);
  }
  saveState();
  renderTasks();
}

function nextQuestion(){
  if(!quiz.selected){
    showToast('请先选择一个答案');
    return;
  }
  if(quiz.index < quiz.questions.length - 1){
    quiz.index += 1;
    renderQuestion();
  }else{
    finishQuiz();
  }
}

function finishQuiz(){
  quizProgress.style.width = '100%';
  state.done = TASKS.length;
  state.stars += 5;
  saveState();
  renderTasks();
  aiSummary.innerHTML = `
    <span class="chip purple">AI总结</span>
    <h3>今日学习完成 🎉</h3>
    <p>本次共15题，答对 <b>${quiz.right}</b> 题，复习提醒 <b>${quiz.wrong}</b> 题。整体表现很棒，今天已经完成学习进度，可以休息10分钟。</p>
    <ul>
      <li>语文：继续保持朗读和表达。</li>
      <li>数学：错题可以明天先复习同类题。</li>
      <li>英语：建议把今天的英文再慢速跟读2遍。</li>
      <li>下一进度：明天继续15题，并加一个AI、宇宙或运动主题小科普。</li>
    </ul>
  `;
  speak(`今天的学习进度已经完成。十五题中答对${quiz.right}题，需要复习${quiz.wrong}题。你已经很努力了，现在可以休息十分钟。`, 'zh-CN', currentChild === 'younger' ? 0.78 : 0.88);
  showToast('今日15题完成，已生成AI总结。');
  setTimeout(() => closeQuiz(), 900);
}

function closeQuiz(){
  quizModal.classList.remove('open');
  quizModal.setAttribute('aria-hidden','true');
}

function finishDayDemo(){
  state.done = TASKS.length;
  state.stars += 3;
  saveState();
  renderTasks();
  aiSummary.innerHTML = `
    <span class="chip purple">AI总结</span>
    <h3>今日计划已完成 🎉</h3>
    <p>孩子完成了今日学习任务：语文、数学、英语、科普和运动实践都已打卡。建议接下来休息，再做亲子阅读或户外活动。</p>
    <ul><li>下一进度：明天继续每日15题。</li><li>复习重点：英语跟读和数学口算。</li></ul>
  `;
  speak('今天的学习进度已经完成，可以休息啦。明天继续加油。', 'zh-CN', 0.86);
}

navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navMenu?.addEventListener('click', event => {
  if(event.target.tagName === 'A'){
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded','false');
  }
});
window.addEventListener('scroll', () => {
  topbar.style.boxShadow = window.scrollY > 8 ? '0 14px 34px rgba(48,55,120,.08)' : 'none';
});
$$('.kid-tab').forEach(tab => tab.addEventListener('click', () => {
  currentChild = tab.dataset.child;
  state.done = 0;
  saveState();
  renderChild();
  speak(`${CHILDREN[currentChild].name}已切换。`, 'zh-CN', currentChild === 'younger' ? 0.76 : 0.88);
}));
gradeMap?.addEventListener('click', event => {
  const card = event.target.closest('.grade-card');
  if(!card) return;
  const g = GRADES.find(item => item.id === card.dataset.grade);
  renderGradeDetail(g);
});
$$('.subject-card button').forEach(btn => btn.addEventListener('click', () => {
  const subject = btn.dataset.subject;
  showToast(`${subject}模块已查看：后续可扩展成专项15题与错题本。`);
  speak(`${subject}模块，包括学习目标、练习题和复习提醒。`, 'zh-CN', 0.86);
}));
$('#startQuizBtn')?.addEventListener('click', startQuiz);
$('#startQuizHero')?.addEventListener('click', startQuiz);
$('#finishDayBtn')?.addEventListener('click', finishDayDemo);
$('#closeQuiz')?.addEventListener('click', closeQuiz);
$('#nextQuestionBtn')?.addEventListener('click', nextQuestion);
$('#readQuestionBtn')?.addEventListener('click', () => {
  const q = quiz.questions[quiz.index];
  if(!q) return;
  speak(q.tag === '英语' && q.say ? `${q.q}. ${q.say}` : q.q, q.tag === '英语' ? 'en-US' : 'zh-CN', q.tag === '英语' ? 0.72 : (currentChild === 'younger' ? 0.72 : 0.86));
});
$('#speakPlanBtn')?.addEventListener('click', () => speak('今日学习计划是：语文五题，数学五题，英语五题，再完成一个科普探索和一个运动实践。完成后系统会总结，并提醒休息。', 'zh-CN', currentChild === 'younger' ? 0.76 : 0.88));
$('#testVoiceBtn')?.addEventListener('click', () => speak('你好，欢迎来到双宝成长学习系统。今天我们慢慢学，认真听，大胆说。', 'zh-CN', 0.78));
$('#testEnglishBtn')?.addEventListener('click', () => speak('Hello. Good morning. I like learning English.', 'en-US', 0.68));
$('#restBtn')?.addEventListener('click', () => {
  clearTimeout(restTimer);
  showToast('已设置10分钟休息提醒，网页保持打开才会提醒。');
  speak('休息提醒已设置。十分钟后我会提醒你回来。', 'zh-CN', 0.86);
  restTimer = setTimeout(() => speak('休息时间到了，可以喝水，活动一下，再继续学习。', 'zh-CN', 0.86), 10 * 60 * 1000);
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{ threshold: 0.12 });
$$('.reveal').forEach(item => io.observe(item));

renderChild();
renderGrades();
