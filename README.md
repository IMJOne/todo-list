![todo](https://user-images.githubusercontent.com/110226567/213911637-228d081f-1f47-48f2-ada5-574f13264b1f.png)

# ☑️ TO-DO LIST

자바스크립트 기반 심플 투두 리스트 👉 [Demo](https://gardenny.github.io/to-do-list/)

<br />

## 📢 프로젝트 개요

토이 프로젝트의 기본 중의 기본인 투두 리스트 제작 경험은 필수적이라고 생각했습니다.<br />
바닐라 자바스크립트로 DOM 요소를 동적으로 조작하는 것에 더욱 익숙해지기 위해,<br />
동작 원리를 완벽하게 숙지하고 이해할 때까지 계속 공부해가며 진행하였습니다.

<br />

## 🗨️ 사용 기술

<p>
 <img src="https://img.shields.io/badge/HTML-e34f26?style=flat-square&logo=HTML5&logoColor=white" />
 <img src="https://img.shields.io/badge/CSS-1572b6?style=flat-square&logo=CSS3&logoColor=white" />
 <img src="https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=JavaScript&logoColor=white" />
</p>

<br />

## 📋 주요 기능

- 오늘의 날짜 출력
- 리스트 추가
- 리스트 삭제
- 리스트 완료
- 로컬 스토리지 연동

<br />

## 💻 소스 코드

전체 코드 보러 가기 👉 [Notion](https://imjone.notion.site/TO-DO-LIST-d5d802305fa6461b8c3b410fa96528e6?pvs=4)

### 📍 리스트 추가

`addTodo`는 작성된 투두를 인자로 받아서 리스트에 추가해주는 함수입니다.<br />
동적으로 `li` 요소를 생성하고, `innerHTML` 속성을 통해 전달 받은 `todo`의 텍스트를 렌더링합니다.

```javascript
function addTodo(todo) {
  const { text, id } = todo;
  const list = document.createElement('li');
  list.innerHTML = `
    <input class="list__checkbox" type="checkbox">
    <span class="list__name">${text}</span>
    <button class="btn__delete" data-id="${id}">
      <i class="fa-solid fa-xmark fa-lg"></i>
    </button>
  `;

  list.setAttribute('class', 'list');
  list.setAttribute('data-id', id);

  todoList.appendChild(list);
  list.scrollIntoView({ block: 'center' }); // 새로 추가된 리스트로 자동 스크롤
  input.value = '';
  input.focus();
}
```

### 📍 리스트 삭제

`deleteTodo`는 인자로 전달 받은 투두를 부모 노드인 `todoList`로부터 삭제시켜주는 함수입니다.<br />
리스트 우측에 있는 삭제 🗑️ 아이콘을 클릭하면 해당 함수가 호출되면서 클릭한 리스트가 삭제됩니다.

```javascript
const todoList = document.querySelector('.todo__list');

function deleteTodo(target) {
  const deleted = target.parentNode;
  todoList.removeChild(deleted);
}

todoList.addEventListener('click', e => {
  const target = e.target.nodeName === 'I' ? e.target.parentNode : e.target;
  if (target.className === 'btn__delete') deleteTodo(target);
  return;
}
```

### 📍 리스트 완료

`completeTodo`는 인자로 전달 받은 투두의 `checked` 속성을 토글링해주는 함수입니다.<br />
리스트 좌측에 있는 체크박스를 ✔️ 체크하면 해당 함수가 호출되면서 클릭한 리스트가 완료 처리됩니다.

```javascript
function completeTodo(target) {
  const list = target.parentNode;
  list.checked = !list.checked; // 체크 여부 토글링
  list.classList.toggle('checked');
}

todoList.addEventListener('click', e => {
  const target = e.target.nodeName === 'I' ? e.target.parentNode : e.target;
  if (target.className === 'btn__delete') deleteTodo(target);
  if (target.className === 'list__checkbox') completeTodo(target); // 추가
  return;
}
```

<br />

## 😊 배운 점 및 느낀 점

- 기본적인 투두 리스트 프로젝트를 진행하면서 자바스크립트의 핵심 기본기를 다질 수 있었습니다.
- 어떻게 하면 DOM 요소들을 더욱 세밀하게 조작할 수 있을지 고민하고, 연습해볼 수 있는 좋은 시간이었습니다.
- 특정 요소의 정보를 정확하게 알아내기 위해 부여하는 고유한 아이디의 역할이 얼마나 중요한지 깨달았습니다.
- 로컬 스토리지를 활용하여 브라우저에 데이터를 저장하고, 삭제하고, 업데이트하는 방법을 익힐 수 있었습니다.
