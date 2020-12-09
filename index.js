const readlineSync = require('readline-sync');
const cube = Array(6).fill().map(() => Array(3).fill().map(() => Array(3)));
const twoDArray = Array(3).fill().map(() => Array(3));
let startTime;
let endTime;
let count = 0; // 조작갯수

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
const mixCube = () => {

}

// 조작 횟수 올리기
const AddCount = () => {
    count++;
    console.log('count: ', count);
};

// 출력 - 큐브의 6면을 펼친 상태로 출력한다.
const PrintCube = () => {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 0 || i === 5) {
                console.log('                ' + cube[i][j].join(' '));
            } else {
                console.log('  '.repeat(5 * (i - 1)) + cube[i][j].join(' '));
            }
        }
        if (i === 0 || i === 4 || i === 5) {
            console.log(' ');
        }
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
    PrintCube();
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
    PrintCube();
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
    PrintCube();
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
    PrintCube();
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
    PrintCube();
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
    PrintCube();
};

// Q 프로그램을 종료하고, 조작 받은 명령의 갯수를 출력시킨다.
const QuitProcess = () => {
    endTime = new Date(); // 종료 시각 측정
    elapsedTime = endTime - startTime;
    console.log(`경과시간: ${elapsedTime.getMinutes()} : ${elapsedTime.getSeconds()}`);
    console.log(`조작갯수: ${count}`);
    console.log('이용해주셔서 감사합니다. 뚜뚜뚜.');
    process.exit(0);
    return;
}

const RubiksCube = (args) => {
    mixCube();
    startTime = new Date(); // 시작 시각 측정
    console.log(startTime);
    const rotate_list = args.match(/[\D](')|[\D]/g);

    for (let c = 0; c < rotate_list.length; c++) {
        let rotate = rotate_list[c];

        if (rotate !== 'Q') { // 종료일 때는 명령어 출력 안함
            console.log(rotate);
        }

        switch (rotate) {
            case 'U\'':
                counterClockwise(cube_index.U);
                downRotate(0);
                AddCount();
                break;
            case 'L\'':
                counterClockwise(cube_index.L);
                rightRotate(0);
                AddCount();
                break;
            case 'F\'':
                counterClockwise(cube_index.F);
                backRotate(2);
                AddCount();
                break;
            case 'R\'':
                counterClockwise(cube_index.R);
                leftRotate(2);
                AddCount();
                break;
            case 'B\'':
                counterClockwise(cube_index.B);
                frontRotate(0);
                AddCount();
                break;
            case 'D\'':
                counterClockwise(cube_index.D);
                upRotate(2);
                AddCount();
                break;
            case 'U':
                clockwise(cube_index.U);
                upRotate(0);
                AddCount();
                break;
            case 'L':
                clockwise(cube_index.L);
                leftRotate(0);
                AddCount();
                break;
            case 'F':
                clockwise(cube_index.F);
                frontRotate(2);
                AddCount();
                break;
            case 'R':
                clockwise(cube_index.R);
                rightRotate(2);
                AddCount();
                break;
            case 'B':
                clockwise(cube_index.B);
                backRotate(0);
                AddCount();
                break;
            case 'D':
                clockwise(cube_index.D)
                downRotate(2);
                AddCount();
                break;
            case 'Q':
                QuitProcess();
                break;
            default:
                console.log(`${rotate}는 없는 명령어입니다!`);
                break;
        }
    }
}

const main = () => {
    InitCube(); // 큐브 초기화 및 초기 상태 출력
    while (true) {
        const input = readlineSync.question('CUBE> ');
        try {
            RubiksCube(input);
        } catch (err) {
            console.log('문자열 형태만 입력 가능합니다.');
            console.error(err);
        }
    }
}

main();