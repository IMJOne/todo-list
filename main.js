'use strict';

const list = document.querySelector('.list');
const form = document.querySelector('.form__new');
const input = document.querySelector('.input__text');

// 리스트 추가
function onAdd() {
  const text = input.value;
  const item = createItem(text);

  if (text.trim().length === 0) {
    alert('공백만 입력할 수 없습니다!');
    input.value = '';
    input.focus();
    return;
  }
  list.prepend(item);

  // 새로 추가된 아이템으로 자동 스크롤
  item.scrollIntoView({ block: 'center' });

  input.value = '';
  input.focus();
}

let id = 0; // 고유한 아이디로 사용
function createItem(text) {
  const item = document.createElement('li');
  item.setAttribute('class', 'item');
  item.setAttribute('data-id', id);
  item.innerHTML = `
    <input class="checkbox" type="checkbox">
    <span class="item__name">${text}</span>
    <button class="btn__delete" data-id="${id}">
      <i class="fa-solid fa-xmark fa-lg"></i>
    </button>
  `;

  id++;
  return item;
}

// 엔터키 입력 && 버튼 클릭
form.addEventListener('submit', e => {
  e.preventDefault();
  onAdd();
});
