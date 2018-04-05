class HideWord {
    
  constructor(word, arr){
    this.word = word;
    this.arr = arr;
  }

  filterTexte() {
      let word = this.word;
      let arr = this.arr;
      let str = '';
      let clickedLetters = arr.filter(e => e.isClicked == true);

      word.split('').forEach((e) => {
          str+=  clickedLetters.find(el => el.label == e) ? e : '-';
      });
      return str;
  }

  static HideWordFactory(word, arr){
    let filter = new HideWord(word, arr);
    return filter.filterTexte();
  }
}

HideWord.HideWordFactory.$inject = ['word', 'arr'];

export default HideWord;