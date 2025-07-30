// 메뉴바 scene1에서만 숨기기
function showScene(num) {
  document.querySelectorAll('.scene').forEach((el, i) => {
    el.classList.toggle('active', i === num);
  });
  document.getElementById('navbar').style.display = (num === 0) ? 'none' : 'flex';
}

// SCENE 1 -> 2
document.getElementById('enterButton').onclick = () => showScene(1);

// SCENE 2 -> 3
document.getElementById('signInButton').onclick = () => showScene(2);

// SCENE 3 -> 4 (이름 입력, 로딩, 버튼)
document.getElementById('submitName').onclick = () => {
  const name = document.getElementById('username').value.trim();
  if (name) {
    localStorage.setItem('idshell_user', name);
    showScene(3);
    document.getElementById('scanLoading').style.display = '';
    document.getElementById('scanResult').classList.add('hidden');
    // 로딩 끝나고 버튼이 보이게
    setTimeout(() => {
      document.getElementById('scanLoading').style.display = 'none';
      document.getElementById('scanResult').classList.remove('hidden');
    }, 1400);
  }
};
// SCENE 4 -> 5
document.getElementById('chatbotStart').onclick = () => {
  showScene(4);
  document.getElementById('chatbox').innerHTML = ''; // 초기화
  chatIdx = 0;
};

// SCENE 5 채팅: Next 버튼으로만 진행
const chatSequence = [
  {who:'bot', text:`Hello, I'm Shellbot. How can I assist you today?`},
  {who:'user', text:`I want to protect my data. What do I do?`},
  {who:'bot', text:`Let me show you what happened to others like you...`}
];
let chatIdx = 0;
document.getElementById('nextChat').onclick = () => {
  const chatbox = document.getElementById('chatbox');
  if (chatIdx < chatSequence.length) {
    const b = document.createElement('div');
    b.className = 'bubble ' + chatSequence[chatIdx].who;
    b.textContent = chatSequence[chatIdx].text;
    chatbox.appendChild(b);
    chatIdx++;
  } else {
    showScene(5);
  }
};

// SCENE 5 -> 6
document.getElementById('seeReview').onclick = () => showScene(6);
// SCENE 6 -> 7
document.getElementById('getPlan').onclick = () => showScene(7);

// SCENE 8: 챗봇 Next 버튼
const planChatSeq = [
  {who:'bot', text:'Based on your exposure, you need maximum protection.'},
  {who:'bot', text:'We recommend the Platinum Plan for complete coverage.'}
];
let planChatIdx = 0;
document.getElementById('nextPlanChat').onclick = () => {
  const chatbox = document.getElementById('plan-chatbox');
  if (planChatIdx < planChatSeq.length) {
    const b = document.createElement('div');
    b.className = 'bubble ' + planChatSeq[planChatIdx].who;
    b.textContent = planChatSeq[planChatIdx].text;
    chatbox.appendChild(b);
    planChatIdx++;
  } else {
    showScene(8);
  }
};

// SCENE 9: Subscribe -> 10 (결제 로딩)
document.getElementById('subscribeBtn').onclick = () => {
  showScene(9);
  document.getElementById('payment-loading').style.display = '';
  document.getElementById('payment-done').classList.add('hidden');
  setTimeout(()=>{
    document.getElementById('payment-loading').style.display = 'none';
    document.getElementById('payment-done').classList.remove('hidden');
  }, 1600);
};
// SCENE 10: 나가기 -> 404
document.getElementById('leaveShell').onclick = () => showScene(10);

// SCENE 11: 404 (메뉴바 항상 보이게)
showScene(0);
