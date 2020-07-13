const tic_tac_toe = {
    board: ['','','','','','','','',''],
    simbols: {
        options: ['x','o'],
        turn_index: 0,
        change: function (){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    winning_sequence: null,

    init: function (container) {
        this.container_element = container;
    },

    make_play: function (position) {
        if (this.gameover) return false;
        if (this.board[position] === ''){
            this.board[position] = this.simbols.options [this.simbols.turn_index];
            this.draw();
            let winning_sequences_index = this.check_winning_sequences (this.simbols.options [ this.simbols.turn_index ] );
            if (winning_sequences_index >= 0) {
                this.game_is_over();
            }else {
                this.simbols.change();
            }
            return true;
         }else {
             return false;
         }
    },

    game_is_over: function() {
        this.gameover = true;
        console.log('GAME OVER');
        for(i=0;i<=8;i++){
            if (this.winning_sequences[this.winning_sequence][0] == i ||
                this.winning_sequences[this.winning_sequence][1] == i ||
                this.winning_sequences[this.winning_sequence][2] == i){
                    let q = document.getElementById('q'+i+'');
                    q.style.backgroundColor = "green";
                    
                }
            
        }
    },

    check_winning_sequences: function (simbol) {
        for (i in this.winning_sequences) {
            if (this.board [ this.winning_sequences[i][0] ] == simbol &&
                this.board [ this.winning_sequences[i][1] ] == simbol &&
                this.board [ this.winning_sequences[i][2] ] == simbol){
                    console.log('Sequência vencedora: ' + i);
                    this.winning_sequence = i;
                    return i;
                }
        };
        return -1;
    },

    restart: function() {
        for(i in this.board){
            this.board[i] = '';
            this.draw();
        }
        this.gameover = false;
    },

    draw: function () {
        let content = '';

        for(i in this.board) {
            content += '<div id="q'+i+'" onclick="tic_tac_toe.make_play('+ i +')">'+ this.board[i] +'</div>';
        }

        this.container_element.innerHTML = content;
    }
}
// Próximos passos
// 1º destacar quem venceu
// 2º construir placar
// 3º animação da vitória