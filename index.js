const readlineSync = require("readline-sync");

const WordRotate = (word_p, number_p, direct_p) => {
    let answer = '';
    let word_array = word_p.split(''); // 단어배열
    const count = Math.abs(parseInt(number_p)) % word_p.length; // 이동횟수
    let direct = ''; // 방향

    if (parseInt(number_p) < 0) { // 이동횟수가 음수인 경우 방향 바꿔놓기
        if (direct_p.toUpperCase() === 'L') {
            direct = 'R';
        } else if (direct_p.toUpperCase() === 'R') {
            direct = 'L';
        }
    } else {
        direct = direct_p.toUpperCase();
    }

    let chosen_array = [];
    let answer_array = [];
    if (direct === 'L') {
        for (let i = 0; i < count; i++) { // 이동횟수만큼 앞에서 제거된 요소를 빈배열 맨 뒤에 추가하기
            let chosen = word_array.shift();
            chosen_array.push(chosen);
        }
        answer_array = [...word_array, ...chosen_array]; // 기존 배열 맨 뒤에 붙이기
    } else if (direct === 'R') {
        for (let i = 0; i < count; i++) { // 이동횟수만큼 뒤에서 제거된 요소를 빈배열 맨 앞에 추가하기
            let chosen = word_array.pop();
            chosen_array.unshift(chosen);
        }
        answer_array = [...chosen_array, ...word_array]; // 기존 배열에 맨 앞에 붙이기
    }
    answer = answer_array.join(''); // 다시 문자열로 만들기
    return answer;
}

const main = () => {
    while (true) {
        const input = readlineSync.prompt().trim().toString().split(' ');
        try {
            const output = WordRotate(input[0], input[1], input[2]);
            console.log(output);
        } catch (err) {
            console.log('입력이 정상적이지 않습니다!');
            // console.error(err);
        }
    }
}

main();