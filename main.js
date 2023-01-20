'use strict';

const today = document.querySelector('.header__today');
const todoList = document.querySelector('.todo__list');
const todoForm = document.querySelector('.todo__form');
const input = document.querySelector('.form__input');
let todos = []; // 로컬 스토리지에 저장할 리스트 배열
let id = 0; // 각 리스트의 고유한 아이디로 사용

// 날짜 출력
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const date = new Date().getDate();
today.innerText = `${year}년 ${month < 10 ? `0${month}` : month}월 ${date < 10 ? `0${date}` : date}일 😊☕`;

// 리스트 추가
function addTodo(todo) {
  const { text, id, checked } = todo;
  const list = document.createElement('li');
  list.innerHTML = `
    <input class="list__checkbox" type="checkbox">
    <span class="list__name">${text}</span>
    <button class="btn__delete" data-id="${id}">
      <i class="fa-solid fa-xmark fa-lg"></i>
    </button>
  `;

  // 완료된 리스트가 있다면
  if (checked) {
    list.setAttribute('class', 'list checked');
    list.firstElementChild.checked = true; // 체크박스 checked
  } else {
    list.setAttribute('class', 'list');
  }
  list.setAttribute('data-id', id);

  todoList.appendChild(list);
  list.scrollIntoView({ block: 'center' }); // 새로 추가된 리스트로 자동 스크롤
  input.value = '';
  input.focus();
}

function createTodo() {
  const text = input.value;
  const todo = { text: text, id: id, checked: false };
  if (text.trim().length === 0) {
    alert('공백만 입력할 수 없습니다!');
    input.value = '';
    input.focus();
    return;
  }
  id++;
  addTodo(todo);
  saveTodo(todo);
}

// 리스트 삭제
function deleteTodo(target) {
  const deleted = target.parentNode;
  todos = todos.filter(todo => todo.id !== Number(deleted.dataset.id));
  todoList.removeChild(deleted);
  updateTodo();
}

// 리스트 완료
function completeTodo(target) {
  const list = target.parentNode;
  const completed = todos.find(todo => todo.id === Number(list.dataset.id));
  completed.checked = !completed.checked; // 체크 여부 토글링
  list.classList.toggle('checked');
  updateTodo();
}

// 로컬 스토리지 갱신
function saveTodo(todo) {
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodo() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 기존 리스트 불러오기
function getTodo() {
  const todos = localStorage.getItem('todos');
  if (todos) {
    const parsed = JSON.parse(todos);
    parsed.forEach(todo => {
      addTodo(todo);
      saveTodo(todo);
    });
  }
  return;
}

// 이벤트 핸들링
window.addEventListener('load', getTodo);
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  createTodo();
});
todoList.addEventListener('click', e => {
  const target = e.target.nodeName === 'I' ? e.target.parentNode : e.target;
  if (target.className === 'btn__delete') deleteTodo(target);
  if (target.className === 'list__checkbox') completeTodo(target);
  return;
});
