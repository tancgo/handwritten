// 离某一刻的倒计时
const deadline = new Date("2020-11-11 00:00");

function countDown() {
  const now = new Date();

  let s, m, h, d;
  const remaining = deadline - now;
  s = (remaining / 1000) % 60 | 0;
  m = (remaining / 1000 / 60) % 60 | 0;
  h = (remaining / 1000 / 60 / 60) % 24 | 0;
  d = (remaining / 1000 / 60 / 60 / 24) | 0;

  console.log(`离双11还有`, `${d}天`, `${h}时`, `${m}分`, `${s}秒`);

  setTimeout(countDown, 1000);
}
