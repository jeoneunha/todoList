let inpValEle = document.querySelector('#inpVal');
let ulList = document.querySelector('#ulList');
//let btnAdd = document.querySelector('#btnAdd');
let btnAddTop = document.querySelector('#btnAddTop');
let btnClear = document.querySelector('#btnClear');

//하단추가 버튼 클릭
inpVal.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addItem();
  }
});

// 이벤트 할당 > clear completed
btnClear.addEventListener('click', () => {

  let selectedEls = document.querySelectorAll('input[type=checkbox]:checked');


  // 선택된 목록에서 value 찾기
  for (let i = selectedEls.length - 1; i >= 0; i--) {
    let delIdx = [...document.querySelectorAll('#ulList li')].indexOf(selectedEls[i].parentNode);

    removeStorage(null, delIdx);
  }

  drawItem();
});

init();

function init() {
  //localstorage 에 todoList 초기화
  if (!getStorage()) {
    localStorage.setItem('todoList', JSON.stringify([]));
  }

  drawItem();
}

function drawItem() {
  ulList.innerHTML = '';

  let arrTodo = getStorage();

  arrTodo.forEach((item, idx) => {
    let liItem = document.createElement('li');
    liItem.textContent = item;

    let btnDel = document.createElement('button');
    btnDel.textContent = 'x';
    btnDel.addEventListener('click', delItem);

    let btnChk = document.createElement('input');
    btnChk.setAttribute('type', 'checkbox');
    //btnChk.setAttribute('class', 'check-icon');
    btnChk.addEventListener('click', function (e) {
      if (e.target.checked) {
        //완료처리
        liItem.style.textDecoration = 'line-through';
      } else {
        liItem.style.textDecoration = 'none';
      }
    });

    //li에 체크 박스 추가
    liItem.appendChild(btnChk);

    //li에 삭제 버튼 추가
    liItem.appendChild(btnDel);

    //ul 하단에 li 추가
    ulList.appendChild(liItem);
  });

  //초기화
  inpValEle.value = '';
  inpValEle.focus();
}

function addItem() {
  //유효성 체크
  if (!inpValEle.value) {
    alert('목록에 추가할 항목값을 입력해주세요.');
    inpValEle.focus();
    return;
  }

  //local storage 에 저장
  setStorage();

  drawItem();
}

function delItem(e) {
  removeStorage(e);

  drawItem();

  //e.target.parentNode.remove();
}

function getStorage() {
  let arrTodo = JSON.parse(localStorage.getItem('todoList'));

  return arrTodo;
}

function setStorage() {
  let arrTodo = JSON.parse(localStorage.getItem('todoList'));
  arrTodo.push(inpValEle.value);

  localStorage.setItem('todoList', JSON.stringify(arrTodo));
}

function removeStorage(e, delIdx) {
  let arrTodo = JSON.parse(localStorage.getItem('todoList'));
  //let delVal = e.target.parentNode.textContent;
  //let delIdx = arrTodo.indexOf(delVal.substring(0, delVal.length - 1));

  if (delIdx == undefined) {
    //let liList = [...e.target.parentNode.parentNode.children];
    delIdx = [...document.querySelectorAll('#ulList li')].indexOf(e.target.parentNode);
  }

  arrTodo.splice(delIdx, 1);
  localStorage.setItem('todoList', JSON.stringify(arrTodo));
}
