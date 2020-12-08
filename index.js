const readlineSync = require("readline-sync");

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

// U  가장 윗줄을 왼쪽으로 한 칸 밀기 RRW -> RWR
const UpLeftRotate = () => {
    let chosen_array = [];

    let chosen = initialState[0].shift();
    chosen_array.push(chosen);

    initialState[0].push(chosen_array[0]);
    PrintArray(initialState);
    return initialState;
}

// U' 가장 윗줄을 오른쪽으로 한 칸 밀기 RRW -> WRR
const UpRightRotate = () => {
    let chosen_array = [];

    let chosen = initialState[0].pop();
    chosen_array.unshift(chosen);

    initialState[0].unshift(chosen_array[0]);
    PrintArray(initialState);
    return initialState;
}

// R  가장 오른쪽 줄을 위로 한 칸 밀기 WWB -> WBW
const RightUpRotate = () => {
    let right_array = [initialState[0][2], initialState[1][2], initialState[2][2]];
    let chosen_array = [];

    let chosen = right_array.shift();
    chosen_array.push(chosen);

    right_array.push(chosen_array[0]);
    initialState[0][2] = right_array[0];
    initialState[1][2] = right_array[1];
    initialState[2][2] = right_array[2];
    PrintArray(initialState);
    return initialState;
}

// R' 가장 오른쪽 줄을 아래로 한 칸 밀기 WWB -> BWW
const RightDownRotate = () => {
    let right_array = [initialState[0][2], initialState[1][2], initialState[2][2]];
    let chosen_array = [];

    let chosen = right_array.pop();
    chosen_array.unshift(chosen);

    right_array.unshift(chosen_array[0]);
    initialState[0][2] = right_array[0];
    initialState[1][2] = right_array[1];
    initialState[2][2] = right_array[2];
    PrintArray(initialState);
    return initialState;
}

// L  가장 왼쪽 줄을 아래로 한 칸 밀기 RGG -> GRG
const LeftDownRotate = () => {
    let right_array = [initialState[0][0], initialState[1][0], initialState[2][0]];
    let chosen_array = [];

    let chosen = right_array.pop();
    chosen_array.unshift(chosen);

    right_array.unshift(chosen_array[0]);
    initialState[0][0] = right_array[0];
    initialState[1][0] = right_array[1];
    initialState[2][0] = right_array[2];
    PrintArray(initialState);
    return initialState;
}

// L' 가장 왼쪽 줄을 위로 한 칸 밀기 RGG -> GGR
const LeftUpRotate = () => {
    let right_array = [initialState[0][0], initialState[1][0], initialState[2][0]];
    let chosen_array = [];

    let chosen = right_array.shift();
    chosen_array.push(chosen);

    right_array.push(chosen_array[0]);
    initialState[0][0] = right_array[0];
    initialState[1][0] = right_array[1];
    initialState[2][0] = right_array[2];
    PrintArray(initialState);
    return initialState;
}

// B  가장 아랫줄을 오른쪽으로 한 칸 밀기 GBB -> BGB
const BottomRightRotate = () => {
    let chosen_array = [];

    let chosen = initialState[2].pop();
    chosen_array.unshift(chosen);

    initialState[2].unshift(chosen_array[0]);
    PrintArray(initialState);
    return initialState;
}

// B' 가장 아랫줄을 왼쪽으로 한 칸 밀기 GBB -> BBG
const BottomLeftRotate = () => {
    let chosen_array = [];

    let chosen = initialState[2].shift();
    chosen_array.push(chosen);

    initialState[2].push(chosen_array[0]);
    PrintArray(initialState);
    return initialState;
}

// Q  Bye~를 출력하고 프로그램을 종료한다.
const QuitProcess = () => {
    console.log('Bye~');
    process.exit(0);
    return;
}

const TwoDArray = (args) => {
    const rotate_list = args.match(/[\D](')|[\D]/g);

    for (let i = 0; i < rotate_list.length; i++) {
        let rotate = rotate_list[i];

        if (rotate !== 'Q') { // 종료일 때는 명령어 출력 안함
            console.log(rotate);
        }

        if (rotate === 'U') {
            UpLeftRotate();
        } else if (rotate === 'U\'') {
            UpRightRotate();
        } else if (rotate === 'R') {
            RightUpRotate();
        } else if (rotate === 'R\'') {
            RightDownRotate();
        } else if (rotate === 'L') {
            LeftDownRotate();
        } else if (rotate === 'L\'') {
            LeftUpRotate();
        } else if (rotate === 'B') {
            BottomRightRotate();
        } else if (rotate === 'B\'') {
            BottomLeftRotate();
        } else if (rotate === 'Q') {
            QuitProcess();
        } else {
            console.log(`${rotate}는 없는 명령어입니다!`);
            break;
        }
    }
}

const main = () => {
    while (true) {
        const input = readlineSync.question('CUBE> ');
        try {
            TwoDArray(input);
        } catch (err) {
            console.log('문자열 형태만 입력 가능합니다.');
        }
    }
}

main();
