async function load(i) {
    let doc = await fetch('document.json');
    let data = await doc.json();
    if (data[i]) {
        return data[i];
    } else {
        return false;
    }
}

async function affQuestion(i) {
    if (load != false) {
        data = await load(i);
    } else {
        return false;
    }
    const question = document.getElementById('question');
    let result = [];
    question.innerHTML = data.question;
    for (let index = 1; index <= 4; index++) {
        document.getElementById(index).innerHTML = data.reponses[index - 1];
    }
    document.addEventListener('click', async function (e) {
        if (e.target.id == data.solution) {
            result.push(1);
            if (load(i++) != false) {
                result.push(await affQuestion(i+1));
            } else {
                return result;
            }
        } else if (e.target.id <= 4 && e.target.id >= 1) {
            result.push(0)
            if (load(i++) != false) {
                result.push(await affQuestion(i+1));
            } else {
                return result;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    result = await affQuestion(0);
    console.log(result);
});

