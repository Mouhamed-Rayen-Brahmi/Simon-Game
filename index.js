let GameStart = false;
let lvl = 0;
const square = document.querySelectorAll('.square');

$(window).on('load', function() {
    $('#l').text("Press any key to start...");
});

$(document).on('keypress', function() {
    if (!GameStart) {
        GameStart = true;
        lvl = 1;
        startGame();
    }
});

function startGame() {
    $('#l').text("Level " + lvl);
    startLevel();
}

function startLevel() {
    let sequence = [];
    for (let i = 0; i < lvl; i++) {
        setTimeout(() => {
            let random = Math.floor(Math.random() * 4);
            sequence.push(square[random].getAttribute('data-color'));
            square[random].classList.add('pressed');
            setTimeout(() => {
                square[random].classList.remove('pressed');
            }, 350);
        }, i * 700);
    }

    setTimeout(() => {
        console.log(sequence);
        enableUserInput(sequence);
    }, lvl * 700);
}

function enableUserInput(sequence) {
    let response = [];
    let i = 0;
    let gameOverFlag = false;

    square.forEach(sq => {
        sq.addEventListener('mousedown', function handleClick() {
            if (gameOverFlag) return;
            this.classList.add('pressed');
            response.push(this.getAttribute('data-color'));
            setTimeout(() => {
                this.classList.remove('pressed');
            }, 200);

            if (response[i] !== sequence[i]) {
                gameOver();
                gameOverFlag = true; 
            } else {
                i++;
                if (i === sequence.length) {
                    response = [];
                    lvl++;
                    setTimeout(() => {
                        startGame();
                    }, 1000);
                    square.forEach(s => s.removeEventListener('mousedown', handleClick)); 
                }
            }
        });
    });
}

function gameOver() {
    GameStart = false;
    $("body").addClass("GameOver");
    $('#l').text("Game Over! Press any key to restart...");
    $(document).off('keypress').on('keypress', function() {
        if (!GameStart) {
            GameStart = true;
            lvl = 1;
            startGame();
        }
    });
    setTimeout(() => {
        $("body").removeClass("GameOver");
    }, 300);
}
