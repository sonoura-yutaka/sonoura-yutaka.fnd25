'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// const cards = shuffleDraw()
let checkArray = [];//判定用のアレイ　グローバル変数やめる方法考える
const dealobj = {};
let intervalTime = 1000
let lisner = ""
let finishCount = 0;

// function bgm (bool){ いちどプレイするとループ設定だけ変えてもダメ
//     const bgm = new Audio("bgm.mp3");
//     bgm.play();
//     bgm.loop = bool;
//     console.log("BGM Play Now");
//   }


function allClear(){
  checkArray = [];
  finishCount = 0;
}

//整列した配列からランダムに抜き取り、シャッフルされた状態で配列にする
function shuffleDraw() {
  allClear();
  console.log(document.getElementById("count"))
  if (document.getElementById("count") != null ){
    const del = document.getElementById("count");
    del.remove();
    finishCount = 0;
  }
  countdown(4)
  const cardArray = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
  const randomArray = [];
  // console.log("初期：",cardArray);
  let i = cardArray.length;
  while (i > 0) {
    let ranIdx = Math.floor(Math.random() * i);
    let deal = cardArray.splice(ranIdx, 1);
    // console.log("残り:",cardArray);
    i = cardArray.length;
    // console.log("deal",deal)
    randomArray.push(deal);
  }
  // console.log(randomArray);
  return makeDealObj(randomArray);//シャッフル配列を引数としてカードにＮｏ付与したObj化する関数に渡す
}

//シャッフルされた配列(カード)をb1～b10のIDにset
//key = id : val = カードNo
function makeDealObj(sArray) {

  let i = 0;
  for (let val of sArray) {
    dealobj["b" + i] = val;
    i++
  }
  // console.log("dealobj:", dealobj);
  return cardflip(dealobj);//カードをDivとして生成する関数にカード情報のObjを渡す
}

//divタグにカード情報を入れつつ生成する 画像のurl情報も挿入
function cardflip(objs) {

  //スタートボタンを2回押したときの処置 =>　既に生成されているDivを削除してリセットしたい
  //removeもしくはremoveChildで要素を消せるはずだがremoveはfunctionじゃないとエラる
  const frameChildlen = document.getElementById("frame").children;
  // console.log("チルドレン：",frameChildlen)
  // console.log("チルドレン数：",frameChildlen.length )

  for (const cardObj in objs) {
    if (frameChildlen.length < 10 ){
      const frame = document.getElementById("frame");
      const cardName = document.createElement("div");
      cardName.setAttribute("id", cardObj)
      cardName.setAttribute("onClick",` cardClick("${cardObj}")`)


      frame.appendChild(cardName);
      const cardId = document.getElementById(cardObj);
      cardId.style.backgroundImage = "url(b" + objs[cardObj] + ".png)";
      cardId.style.backgroundRepeat = "no-repeat"; //背景画像繰り返し なし
      cardId.style.backgroundSize = "100% auto"; //背景画像サイズ指定
    }
      // console.log("aaa:",document.getElementById(cardObj))
      document.getElementById(cardObj).style.backgroundImage = "url(b" + objs[cardObj] + ".png)";
      document.getElementById(cardObj).style.backgroundRepeat = "no-repeat"; //背景画像繰り返し なし
      document.getElementById(cardObj).style.backgroundSize = "100% auto"; //背景画像サイズ指定
  }
  // console.log("objs:", objs)
  // lisner = document.getElementById("b0").addEventListener("click",cardClick,"b0");
  return 
}


//2枚のカードが一致するか照合して真偽値を返す
function matchCard(array) {
  const J = JSON.stringify;
  let judge =  J(array[0]) === J(array[1]);
  if (judge === false){
    const noGoodSE = new Audio("noGood.mp3");
    noGoodSE.play();
    const frameChildlen = document.getElementById("frame").children;
    for (const child of frameChildlen) {
      child.style.backgroundImage = "url(ura.png)";
      finishCount = 0;
    }
  }else {
    const goodSE = new Audio("good.mp3");
    goodSE.play();
    finishCount++
    console.log(finishCount)
  }
  if (finishCount === 5){
    const clearSE = new Audio("clear.mp3");
    clearSE.play();
    console.log("おしまい！！");
    const end = document.getElementById("count");
    end.innerText = "【 CLEAR!! 】";
  }
  return console.log( J(array[0]) === J(array[1]));
}



// 3.2.1のカウントダウン　Game開始前の暗記時間として表示
//　
function countdown(count){
  let interval = null;
  let timer = count;
  const num = document.createElement("div");
  const body = document.getElementsByTagName("body");
  body.item(0).appendChild(num);
  num.setAttribute("id", "count");

function func(){

  timer --;
  num.innerText = timer;

  if(timer <= 0 && interval != null){
    clearInterval(interval);
    num.innerText = "";
    const frameChildlen = document.getElementById("frame").children;
    for (const child of frameChildlen) {
      child.style.backgroundImage = "url(ura.png)";
    }
    document.getElementById("frame").style.pointerEvents= "auto";
    const dealSE = new Audio("deal.mp3");
    dealSE.play();
    return console.log("GAME START");
  }
  const countSE = new Audio("count.mp3");
  countSE.play(); 
  return timer;
  }
  interval = setInterval(func, intervalTime);
}


function cardClick(id){//クリックされたときの動作
  const card = document.getElementById(id);
  const flipSE = new Audio("cardflip.mp3");
  flipSE.play();
  if(card.style.backgroundImage === 'url("ura.png")'){//裏だったら表の表示にする　比較用のアレイにプッシュ
  // console.log("カードID",card)
    card.style.backgroundImage = `url(b${dealobj[id]}.png)`
    checkArray.push(dealobj[id]);
    // console.log(checkArray)
      if(checkArray.length === 2 ){// ２つ揃ったら判定関数を動かす
        matchCard(checkArray);
        checkArray.length = 0;//アレイを初期化
        // console.log("初期化確認",checkArray)
        }
   }
    // else{
    //   card.style.backgroundImage = "URL(ura.png)"//表だったらの裏表示にする・・・いらないかも
    // }

  }


