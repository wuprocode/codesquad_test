const initialState = [ // 상태 객체
    ['R', 'R', 'W'],
    ['G', 'C', 'W'],
    ['G', 'B', 'B'],
];

// 배열 출력
const PrintArray = (array) => {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].join(' '));
    }
};

// 2. 배열 출력 컴포넌트 만들어서 통과 시키기
// 3. 작성한 코드에서 중복이 있으면 제거

PrintArray(initialState); // 처음 시작 시 초기 상태 출력