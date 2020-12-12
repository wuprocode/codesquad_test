const readlineSync = require('readline-sync');
const cube = Array(6).fill().map(() => Array(3).fill().map(() => Array(3)));
const twoDArray = Array(3).fill().map(() => Array(3));
let startTime;
let endTime;
let count = 0; // 조작갯수
let isError = false;

// 큐브 초기화
const InitCube = () => {
    const colors = ['B', 'W', 'O', 'G', 'Y', 'R'];

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                cube[i][j][k] = colors[i];
            }
        }
    }
    PrintCube();
};

// 큐브 기호
const cube_index = {
    U: 0,
    L: 1,
    F: 2,
    R: 3,
    B: 4,
    D: 5,
};

// 큐브 무작위 섞기
const mixCube = (time) => { // R B L
    const rotateOptions = ['U\'', 'L\'', 'F\'', 'R\'', 'B\'', 'D\'', 'U', 'L', 'F', 'R', 'B', 'D'];

    for (let i = 0; i < parseInt(time); i++) {
        let idx = Math.floor(Math.random() * 12);
        console.log('mixCube', idx);

        let rotate = rotateOptions[idx];
        rotating(rotate);
    }
    // PrintCube();
};

// 큐브 돌리기
const rotating = (rotate) => {
    isError = false;
    switch (rotate) {
        case 'U\'':
            counterClockwise(cube_index.U);
            downRotate(0);
            break;
        case 'L\'':
            counterClockwise(cube_index.L);
            rightRotate(0);
            break;
        case 'F\'':
            counterClockwise(cube_index.F);
            backRotate(2);
            break;
        case 'R\'':
            counterClockwise(cube_index.R);
            leftRotate(2);
            break;
        case 'B\'':
            counterClockwise(cube_index.B);
            frontRotate(0);
            break;
        case 'D\'':
            counterClockwise(cube_index.D);
            upRotate(2);
            break;
        case 'U':
            clockwise(cube_index.U);
            upRotate(0);
            break;
        case 'L':
            clockwise(cube_index.L);
            leftRotate(0);
            break;
        case 'F':
            clockwise(cube_index.F);
            frontRotate(2);
            break;
        case 'R':
            clockwise(cube_index.R);
            rightRotate(2);
            break;
        case 'B':
            clockwise(cube_index.B);
            backRotate(0);
            break;
        case 'D':
            clockwise(cube_index.D)
            downRotate(2);
            break;
        case 'Q':
            QuitProcess();
            break;
        default:
            console.log(`${rotate}는 없는 명령어입니다!`);
            isError = true;
            break;
    }
}

// 조작 횟수 올리기
const AddCount = () => {
    count++;
    // console.log('count: ', count);
};

// 한 면 출력하기
const PrintTwoDArray = (c) => {
    let body = '';
    for (let i = 0; i < 3; i++) {
        body += '                ';
        for (let j = 0; j < 3; j++) {
            body += cube[c][i][j];
            body += ' ';
        }
        body += '\n';
    }
    console.log(body);
    console.log(' ');
}

// 출력 - 큐브의 6면을 펼친 상태로 출력하기
const PrintCube = () => {
    PrintTwoDArray(0);

    let body = '';

    for (let i = 0; i < 3; i++) {
        for (let j = 1; j < 5; j++) {
            body += '  ';
            for (let k = 0; k < 3; k++) {
                body += cube[j][i][k];
                body += ' ';
            }
            body += ' ';
        }
        body += '\n';
    }
    console.log(body);
    console.log(' ');

    PrintTwoDArray(5);
};

// 모든 면의 색깔이 일치하는지 비교하는 함수
const IsComplete = () => {
    const colors = ['B', 'W', 'O', 'G', 'Y', 'R'];
    let isComplete = false;

    outer: for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (cube[i][j][k] !== colors[i]) {
                    isComplete = false;
                    break outer;
                } else {
                    isComplete = true;
                }
            }
        }
    }
    // console.log('isComplete', isComplete);
    if (isComplete) {
        console.log('축하합니다. 큐브를 맞추셨습니다아~*^^*');
        let elapsedTime = countEndTime();
        console.log(`경과시간: ${elapsedTime}`);
        console.log(`조작갯수: ${count}`);
        console.log('이용해주셔서 감사합니다. 뚜뚜뚜.');
        process.exit(0);
        return;
    }
};

// 시계 방향 회전
const clockwise = (index) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            twoDArray[i][j] = cube[index][i][j];
        }
    }
    // 윗 열
    for (let i = 0; i < 3; i++) {
        cube[index][0][i] = twoDArray[2 - i][0];
    }
    // 가운데 열
    cube[index][1][0] = twoDArray[2][1];
    cube[index][1][2] = twoDArray[0][1];
    // 아랫 열
    for (let i = 0; i < 3; i++) {
        cube[index][2][i] = twoDArray[2 - i][2];
    }
};

// 반시계 방향 회전
const counterClockwise = (index) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            twoDArray[i][j] = cube[index][i][j];
        }
    }
    // 윗 열
    for (let i = 0; i < 3; i++) {
        cube[index][0][i] = twoDArray[i][2];
    }
    // 가운데 열
    cube[index][1][0] = twoDArray[0][1];
    cube[index][1][2] = twoDArray[2][1];
    // 아랫 열
    for (let i = 0; i < 3; i++) {
        cube[index][2][i] = twoDArray[i][0];
    }
};

// U 윗면을 기준으로 회전
const upRotate = (num) => {
    temp = new Array(3);

    for (let i = 0; i < 3; i++) {
        temp[i] = cube[cube_index.B][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.B][num][i] = cube[cube_index.L][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.L][num][i] = cube[cube_index.F][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.F][num][i] = cube[cube_index.R][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.R][num][i] = temp[i];
    }
};

// L 왼쪽면을 기준으로 회전
const leftRotate = (num) => {
    temp = new Array(3);
    const col = (num === 0 ? 2 : 0);

    for (let i = 0; i < 3; i++) {
        temp[i] = cube[cube_index.U][i][num];
    }
    // B, D 또는 U, B 끼리 이동 시에는 2 - i
    // B -> U(시계 방향)으로 이동 시에는 2 -> 0 열, U -> B(반시계방향)으로 이동 시에는 0 -> 2 열
    for (let i = 0; i < 3; i++) {
        cube[cube_index.U][i][num] = cube[cube_index.B][2 - i][col];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.B][i][col] = cube[cube_index.D][2 - i][num];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.D][i][num] = cube[cube_index.F][i][num];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.F][i][num] = temp[i];
    }
};

// F 앞면을 기준으로 회전
const frontRotate = (num) => {
    temp = new Array(3);
    const col = (num === 0 ? 2 : 0);

    for (let i = 0; i < 3; i++) {
        temp[i] = cube[cube_index.U][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.U][num][i] = cube[cube_index.L][2 - i][num];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.L][i][num] = cube[cube_index.D][col][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.D][col][i] = cube[cube_index.R][2 - i][col];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.R][i][col] = temp[i];
    }
};

// R 오른쪽면을 기준으로 회전
const rightRotate = (num) => {
    temp = new Array(3);
    const col = (num === 0 ? 2 : 0);

    for (let i = 0; i < 3; i++) {
        temp[i] = cube[cube_index.U][i][num];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.U][i][num] = cube[cube_index.F][i][num];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.F][i][num] = cube[cube_index.D][i][num];
    }
    // B, D 또는 U, B 끼리 이동 시에는 2 - i
    for (let i = 0; i < 3; i++) {
        cube[cube_index.D][i][num] = cube[cube_index.B][2 - i][col];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.B][i][col] = temp[2 - i];
    }
};

// B 뒷면을 기준으로 회전
const backRotate = (num) => {
    temp = new Array(3);
    const col = (num === 0 ? 2 : 0);

    for (let i = 0; i < 3; i++) {
        temp[i] = cube[cube_index.U][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.U][num][i] = cube[cube_index.R][i][col];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.R][i][col] = cube[cube_index.D][col][2 - i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.D][col][i] = cube[cube_index.L][i][num];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.L][i][num] = temp[2 - i];
    }
};

// D 아랫면을 기준으로 회전
const downRotate = (num) => {
    temp = new Array(3);

    for (let i = 0; i < 3; i++) {
        temp[i] = cube[cube_index.B][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.B][num][i] = cube[cube_index.R][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.R][num][i] = cube[cube_index.F][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.F][num][i] = cube[cube_index.L][num][i];
    }
    for (let i = 0; i < 3; i++) {
        cube[cube_index.L][num][i] = temp[i];
    }
};

const countEndTime = () => {
    endTime = new Date(); // 종료 시각 측정
    const diffTime = endTime.getTime() - startTime.getTime();
    const elapsedSec = parseInt(diffTime / 1000).toString();
    const elapsedMin = parseInt(diffTime / 1000 / 60).toString();
    return (elapsedMin[1] ? elapsedMin : '0' + elapsedMin) + ':' + (elapsedSec[1] ? elapsedSec : '0' + elapsedSec);
}

// Q 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다.
const QuitProcess = () => {
    let elapsedTime = countEndTime();
    console.log(`경과시간: ${elapsedTime}`);
    console.log(`조작갯수: ${count}`);
    console.log('이용해주셔서 감사합니다. 뚜뚜뚜.');
    process.exit(0);
    return;
}

const RubiksCube = (args) => {
    const rotate_list = args.match(/[\D](')|[\d][\D]|[\D]/g);

    for (let c = 0; c < rotate_list.length; c++) {
        let target = rotate_list[c];
        let rotate;

        if (/^\d/.test(target)) { // 2R처럼 명령어줄에 숫자가 포함되어 있는 경우
            rotate = target[target.length - 1];
        } else {
            rotate = target;
        }

        if (/^\d/.test(target)) { // 2R처럼 명령어줄에 숫자가 포함되어 있는 경우
            for (let i = 0; i < parseInt(target[0]); i++) {
                if (rotate !== 'Q') { // 종료일 때는 명령어 출력 안함
                    console.log(rotate);
                }

                rotating(rotate); // 명령어 동작 수행 함수

                if (!isError) {
                    AddCount();
                    PrintCube();
                    IsComplete(); // 매번 성공 여부 확인
                }
            }
        } else {
            if (rotate !== 'Q') { // 종료일 때는 명령어 출력 안함
                console.log(rotate);
            }

            rotating(rotate); // 명령어 동작 수행 함수

            if (!isError) {
                AddCount();
                PrintCube();
                IsComplete(); // 매번 성공 여부 확인
            }
        }
    }
}

const main = () => {
    InitCube(); // 큐브 초기화 및 초기 상태 출력
    mixCube(0); // 큐브 섞기
    startTime = new Date(); // 시작 시각 측정
    // console.log(startTime);
    while (true) {
        const input = readlineSync.question('CUBE> ');
        try {
            RubiksCube(input);
        } catch (err) {
            console.log('문자열 형태만 입력 가능합니다.');
            // console.error(err);
        }
    }
}

main();