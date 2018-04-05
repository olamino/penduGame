import PlayService from '../play.service';

class PlayDetailController {

    constructor($scope, $playData) {

        this.$playData = $playData;
        this.$scope = $scope;
        this.unicodeCharacter = {
            '65' : 'a', '66' : 'b', '67' : 'c', '68' : 'd', '69' : 'e', '70' : 'f', '71' : 'g',
            '72' : 'h', '73' : 'i', '74' : 'j', '75' : 'k', '76' : 'l', '77' : 'm', '78' : 'n',
            '79' : 'o', '80' : 'p', '81' : 'q', '82' : 'r', '83' : 's', '84' : 't', '85' : 'u',
            '86' : 'v', '87' : 'w', '88' : 'x', '89' : 'y', '90' : 'z'
        };
        this.letters = [];
        this.generatedWord = '';
        this.counter = 0;
        this.wordLength =0;
        this.maxTry = 0;
        this.lost = false;
        this.win = false;
        this.endGame = false;
        this.showletters = false;
        this.message = '';


        this.$playData.getConfig()
            .then((res) => {
                this.maxMistake = res.maxMistake || 3;
                this.messageWin = res.messageWin || 'messageWin';
                this.messageLost = res.messageLost || 'messageLost';
                this.words = res.words || ['erreur'];
                this.startPlay();
                this.getKeyboardClickevent();
            })
            .catch((rej) => {
                console.log('erreur ', rej);
            });
    }
      
    
    startPlay() {
        this.showletters = true;
        this.letters = this.getKeyboard();
        this.generatedWord = this.words[this.CreateRandomValues()];
        this.wordLength = this.generatedWord.length;
        this.wordArray = this.generatedWord.split('');
        this.counter = 0;
        this.maxTry = this.wordLength + this.maxMistake;
        this.lost = false;
        this.win = false;
        this.endGame = false;
        this.message = '';
    }
    
    getKeyboard() {
        return 'azertyuiopqsdfghjklmwxcvbn'.split('').map(function (key) {
          return { label: key, isClicked: false };
        });
    }
    
    getKeyboardClickevent() {
        document.onkeydown = (e) => {
          let unicode = e.charCode ? e.charCode : e.keyCode;
          let key = this.unicodeCharacter[unicode];
          if (key != undefined) {
            let index = this.letters.findIndex(x => x.label==key);
            this.clickedKey(this.letters[index]);
            this.$scope.$apply();
          }
        }
    }
    
    CreateRandomValues() {
        return Math.round(Math.random() * this.words.length - 1);
    }
    
    clickedKey(key) {
        key.isClicked = true;
        this.counter++;
        this.verifEndGame();
    }
    
    verifEndGame() {
        let isWin = this.isWiner();
        if (isWin == true || this.counter == this.maxTry) {
          this.gameOver(isWin);
        }
    }
    
    gameOver(isWiner) {
        this.win = isWiner;
        this.lost = isWiner ? false : true;
        this.endGame = true;
        this.message = isWiner ? this.messageWin : this.messageLost;
        this.showletters = false;
    }
    
    isWiner() {
        let clickedKey = this.letters.filter(key => key.isClicked == true);
        let isExist = true;
        this.wordArray.forEach((letter) => {
          let index = clickedKey.find(el => el.label == letter);
          if (index === undefined) {
            isExist = false;
          }
        });
        return isExist;
    }

    static PlayFactory($scope, $playData) {
        return new PlayDetailController($scope, $playData);
    }
}

PlayDetailController.PlayFactory.$inject = ['$scope', '$playData'];

export default PlayDetailController;