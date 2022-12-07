const calculateIncrementScore = (currentPoints) => {
    switch (currentPoints) {
        case 0: 
            return 15;
        case 15:
            return 30;
        case 30:
            return 40;
        case 40:
            return -1; // We will designate -1 as "game"
    }
}

function Match(player1, player2) {
    this.runningSetScore = { player1: 0, player2: 0 };
    this.runningGameScore = { player1: 0, player2: 0 };
    this.runningGameAdvantageScore = { player1: 0, player2: 0 };
    this.matchStatus = {inPlay: true, winner: ""};

    this.incrementGameAdvantageScore = (player) => {
        if (player === player1) {
            this.runningGameAdvantageScore.player1++;
        }
        if (player === player2) {
            this.runningGameAdvantageScore.player2++;
        }
    }

    this.incrementGameScore = (player) => {
        if (player === player1) {
            this.runningGameScore.player1 = calculateIncrementScore(this.runningGameScore.player1);
        }
        if (player === player2) {
            this.runningGameScore.player2 = calculateIncrementScore(this.runningGameScore.player2);
        }
    }

    this.resetGame = () => {
        this.runningGameScore = { player1: 0, player2: 0 };
        this.runningGameAdvantageScore = { player1: 0, player2: 0 };
    }

    this.isGameWon = () => {
        if (this.runningGameScore.player1 === -1 || (this.runningGameAdvantageScore.player1 - this.runningGameAdvantageScore.player2 === 2)) {
            this.runningSetScore.player1++;
            return true;
        }

        if (this.runningGameScore.player2 === -1|| (this.runningGameAdvantageScore.player2 - this.runningGameAdvantageScore.player1 === 2)) {
            this.runningSetScore.player2++;
            return true;
        }

        return false;
    }

    this.declareWinner = (player) => {
        this.matchStatus.inPlay = false;
        this.matchStatus.winner = player;
    }

    this.checkMatchWin = () => {
        if (this.runningSetScore.player1 >= 6 && (this.runningSetScore.player1 - this.runningSetScore.player2 >= 2)){
            this.declareWinner(player1);
        }
        if (this.runningSetScore.player2 >= 6 && (this.runningSetScore.player2 - this.runningSetScore.player1 >= 2)){
            this.declareWinner(player2);
        }
    }

    this.score = () => {
        // Check if there's a match winner
        if (this.matchStatus.inPlay === false){
            console.log(`The winner is ${this.matchStatus.winner} with the match score of ${this.runningSetScore.player1}-${this.runningSetScore.player2}`);
            return;
        }

        let gameScore = `${this.runningGameScore.player1}-${this.runningGameScore.player2}`
        if (this.runningGameScore.player1 === 40 && this.runningGameScore.player2 === 40) {
            if (this.runningGameAdvantageScore.player1 === this.runningGameAdvantageScore.player2) {
                gameScore = "Deuce";
            } else if (this.runningGameAdvantageScore.player1 > this.runningGameAdvantageScore.player2) {
                gameScore = `Advantage ${player1}`;
            } else {
                gameScore = `Advantage ${player2}`;
            }
        }
        console.log(`${this.runningSetScore.player1}-${this.runningSetScore.player2}, ${gameScore}`);
    }

    this.pointWonBy = (player) => {
        // Check valid match
        if (this.matchStatus.inPlay === false) {
            return;
        }
        // Check for advantage scoring
        if (this.runningGameScore.player1 === 40 && this.runningGameScore.player2 === 40) {
            this.incrementGameAdvantageScore(player);
        } else {
            this.incrementGameScore(player);
        }
        
        // Check for game win (and match win)
        if (this.isGameWon()){
            this.checkMatchWin();
            this.resetGame();
        }
    }
}

// Main Application logic here -- from readme

const match = new Match("player 1", "player 2");
match.pointWonBy("player 1");
match.pointWonBy("player 2");
// this will return "0-0, 15-15"
match.score();

match.pointWonBy("player 1");
match.pointWonBy("player 1");
// this will return "0-0, 40-15"
match.score();

match.pointWonBy("player 2");
match.pointWonBy("player 2");
// this will return "0-0, Deuce"
match.score();

match.pointWonBy("player 1");
// this will return "0-0, Advantage player 1"
match.score();

match.pointWonBy("player 1");
// this will return "1-0"
match.score();

// Below is just made up game data
match.pointWonBy("player 2");
match.pointWonBy("player 2");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.score();
match.pointWonBy("player 2");
match.pointWonBy("player 2");
match.score();
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.score();
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.score();
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.score();
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.score();