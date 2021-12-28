// const displayBox = document.querySelector('.display');
// const scissorsBtn = document.querySelector('.scissors');
// const rockBtn = document.querySelector('.rock');
// const paperBtn = document.querySelector('.paper');
// const resultBox = document.querySelector('.result-box');

// scissorsBtn.addEventListener('click', submit);
// rockBtn.addEventListener('click', submit);
// paperBtn.addEventListener('click', submit);

// // updateDisplay 함수를 100ms마다 실행
// let displayInterval;
// displayInterval = setInterval(updateDisplay, 100);

// function submit() {
//   stopDisplay();
//   setDisable();
//   console.log(this);
//   this.style.color = 'black';
//   let myItem = this.textContent;
//   let baseItem = displayBox.textContent;
//   let resultText = '';
//   if (
//     (baseItem === '✌️' && myItem === '✊') ||
//     (baseItem === '🤚' && myItem === '✌️') ||
//     (baseItem === '✊' && myItem === '🤚')
//   )
//     resultText = '이겼다!!';
//   else if (
//     (baseItem === '✊' && myItem === '✌️') ||
//     (baseItem === '✌️' && myItem === '🤚') ||
//     (baseItem === '🤚' && myItem === '✊')
//   )
//     resultText = '졌어....';
//   else resultText = '비겼네~';

//   setResultBox(resultText);
// }

// function setDisable() {
//   scissorsBtn.setAttribute('disabled', true);
//   rockBtn.setAttribute('disabled', true);
//   paperBtn.setAttribute('disabled', true);
// }

// function restart() {
//   startDisplay();
//   clear(resultBox);
//   scissorsBtn.removeAttribute('disabled');
//   rockBtn.removeAttribute('disabled');
//   paperBtn.removeAttribute('disabled');
//   scissorsBtn.style.color = '';
//   rockBtn.style.color = '';
//   paperBtn.style.color = '';
// }

// function setResultBox(text) {
//   resultBox.innerHTML = `<p>${text}</p><button class="restart-btn">다시!</button>`;
//   const restartBtn = document.querySelector('.restart-btn');
//   restartBtn.addEventListener('click', restart);
// }

// function clear(element) {
//   element.textContent = '';
//   element.innerHTML = '';
// }

// // 차례대로 나오는 아이템들 보여주기
// let displayItem = ['✌️', '✊', '🤚'];
// let index = 0;
// function updateDisplay() {
//   if (index === displayItem.length - 1) index = 0;
//   else index++;
//   displayBox.textContent = displayItem[index];
// }

// function startDisplay() {
//   displayInterval = setInterval(updateDisplay, 100);
// }

// function stopDisplay() {
//   clearInterval(displayInterval);
// }
