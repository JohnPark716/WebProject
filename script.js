// 필요한 HTML 요소들을 가져옵니다.
const balance = document.getElementById('balance');
const list = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');

// 거래 내역을 저장할 배열입니다.
// 실제 애플리케이션에서는 이 데이터를 브라우저 저장소(localStorage)나 서버에 저장해야 합니다.
let transactions =;

// 거래 내역을 화면에 추가하는 함수
function addTransactionDOM(transaction) {
    // 수입이면 '+', 지출이면 '-'를 붙여줍니다.
    const sign = transaction.type === 'income'? '+' : '-';

    // 새로운 리스트 아이템(li)을 생성합니다.
    const item = document.createElement('li');

    // 수입/지출에 따라 클래스를 추가합니다. (CSS 스타일링용)
    item.classList.add(transaction.type);

    // li 요소의 내부 HTML을 설정합니다.
    item.innerHTML = `
        ${transaction.description} <span>${sign}${Math.abs(transaction.amount).toLocaleString()}원</span>
    `;

    // 완성된 아이템을 거래 내역 리스트에 추가합니다.
    list.appendChild(item);
}

// 잔액, 수입, 지출을 업데이트하고 화면에 표시하는 함수
function updateValues() {
    // 모든 거래 금액을 가져와서 배열로 만듭니다.
    const amounts = transactions.map(transaction => 
        transaction.type === 'income'? transaction.amount : -transaction.amount
    );

    // reduce를 사용해 모든 금액을 더하여 총 잔액을 계산합니다.
    const total = amounts.reduce((acc, item) => (acc += item), 0);

    // 화면에 잔액을 표시합니다. toLocaleString()은 숫자에 콤마를 추가해줍니다.
    balance.innerText = `${total.toLocaleString()}원`;
}

// 새로운 거래를 추가하는 함수 (폼 제출 시 호출)
function addTransaction(e) {
    // 폼의 기본 동작(페이지 새로고침)을 막습니다.
    e.preventDefault();

    // 입력값이 비어있는지 확인합니다.
    if (description.value.trim() === '' |

| amount.value.trim() === '') {
        alert('내용과 금액을 모두 입력해주세요.');
    } else {
        // 새로운 거래 객체를 생성합니다.
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value, // 문자열을 숫자로 변환
            type: type.value
        };

        // 거래 내역 배열에 새로운 거래를 추가합니다.
        transactions.push(transaction);

        // DOM에 새로운 거래를 추가합니다.
        addTransactionDOM(transaction);

        // 잔액 정보를 업데이트합니다.
        updateValues();

        // 폼 입력 필드를 초기화합니다.
        description.value = '';
        amount.value = '';
    }
}

// 고유 ID를 생성하는 함수
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// 초기화 함수
function init() {
    // 리스트를 비우고
    list.innerHTML = '';
    // 모든 거래 내역을 다시 화면에 그립니다.
    transactions.forEach(addTransactionDOM);
    // 잔액을 업데이트합니다.
    updateValues();
}

// 페이지가 처음 로드될 때 초기화 함수를 실행합니다.
init();

// 폼의 'submit' 이벤트가 발생하면 addTransaction 함수를 실행하도록 설정합니다.
form.addEventListener('submit', addTransaction);