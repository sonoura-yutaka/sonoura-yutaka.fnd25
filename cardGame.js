'use strict'
// 1行目に記載している 'use strict' は削除しないでください


    let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shaffleCards = [];


    //0~numのランダムな数字生成
    function randomNumber(num){
        let ranNum = Math.floor(Math.random() * (num ))
        // console.log("ranNum: ", ranNum);
        return dealCard(ranNum);
    }

    //randomNumberに従ってcards[ranNun]から1つ値を持ってくる
    //次のディールで同じ値を出力させないためにcardsの配列からranNumを削除する 
    function dealCard(ranNum){
        shaffleCards.push(cards[ranNum]);
        cards.splice(ranNum,1);
        // console.log("元配列: ",cards);
        // console.log("新配列: ",shaffleCards );
        return shaffleCards;
      }


    //iの数だけカードを引く
    //ランダムナンバーで生成される数とディールカードで配られるカードの枚数、値をそろえるためi--して呼び出す
window.onload = function () { 
  for(let i = 10; i > 0; i--){
    randomNumber(i);
  }

  for(let i = 1; i < 11; i++){
    let setCard = document.getElementById(`Fr${i}`);
    // console.log(shaffleCards[i])
    setCard.style.backgroundImage = `url(t${shaffleCards[i - 1]}.png)`
    // console.log(setCard);
  }



}
