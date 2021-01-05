// canvas の設定
const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');
const mouseXY = document.getElementById('mouseXY');

// 点1~12 の座標
const coordinates = {
  dot1:	{x: 100, y:   4},
  dot2:	{x: 148, y:  16.8615616},
  dot3:	{x: 183.1384384, y:  52},
  dot4:	{x: 196, y: 100},
  dot5:	{x: 183.1384384, y: 148},
  dot6:	{x: 148, y: 183.1384384},
  dot7:	{x: 100, y: 196},
  dot8:	{x:  52, y: 183.1384384},
  dot9:	{x:  16.8615616, y: 148},
  dot10:{x:  4, y: 100},
  dot11:{x: 16.8615616, y:  52},
  dot12:{x:  52, y:  16.8615616}
}

// 選択された dots
const selectedDots = new Set();

// 円を描く
context.strokeStyle = "black"
context.beginPath();
context.arc(100, 100, 96, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
context.fillStyle = "rgba(0,0,0,0)";
context.fill();
context.stroke();

// 12点を描く
for(let key in coordinates){
  context.beginPath();
  context.strokeStyle = "black"
  context.arc(coordinates[key].x, coordinates[key].y, 3, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
  context.fillStyle = "rgba(0,0,0,0.7)";
  context.fill();
  context.stroke();
}

// 線の長さを元にラインの色を決定する
function setLineColor (dot1,dot2) {
  let distanceOfDots = 
  Math.round(
    Math.sqrt(
      Math.pow((coordinates[dot1].x - coordinates[dot2].x),2) + 
      Math.pow((coordinates[dot1].y - coordinates[dot2].y),2)))

  console.log(distanceOfDots);

  if(distanceOfDots == 50){
    context.strokeStyle = "red";
  }
  else if(distanceOfDots == 96){
    context.strokeStyle = "blue";
  }
  else if(distanceOfDots == 136){
    context.strokeStyle = "yellow";
  }
  else if(distanceOfDots == 166){
    context.strokeStyle = "green";
  }
  else if(distanceOfDots == 185){
    context.strokeStyle = "orange";
  }
  else if(distanceOfDots == 192){
    context.strokeStyle = "pink";
  }
}

// 12点周辺でのクリック時の処理
myPics.addEventListener('mousedown',(e)=>{

  // クリック時の座標に応じてdotに色をつけて、selectedDots に追加する
  for(let key in coordinates){
    if((e.offsetX > coordinates[key].x - 15 && e.offsetX < coordinates[key].x + 15) 
        && (e.offsetY > coordinates[key].y - 15 && e.offsetY < coordinates[key].y + 15)){
      context.beginPath();
      context.arc(coordinates[key].x, coordinates[key].y, 4, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
      context.fillStyle = "rgba(255,200,0,0.8)";
      context.fill();
      context.stroke();
      selectedDots.add(key);
    }
  }

  // 4点目が選択されたときの処理
  if(selectedDots.size > 3){

    // canvas を白紙にする
    context.clearRect(0, 0, 200, 200);
    selectedDots.clear();

    // 円を描く
    context.beginPath();
    context.arc(100, 100, 95, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
    context.fillStyle = "rgba(0,0,0,0)";
    context.strokeStyle = "black"
    context.fill();
    context.stroke();

    // 12点を描く
    for(let key in coordinates){
      context.beginPath();
      context.arc(coordinates[key].x, coordinates[key].y, 4, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
      context.fillStyle = "rgba(0,0,0,0.7)";
      context.fill();
      context.stroke();
    }
  }

  // 2点が選択されたら線を引く
  if(selectedDots.size == 2){
    let dots = Array.from(selectedDots.values());

    context.beginPath();
    setLineColor(dots[0],dots[1]);
    console.log(dots[0],dots[1])
    context.moveTo(coordinates[dots[0]].x, coordinates[dots[0]].y); //最初の点の場所
    context.lineTo(coordinates[dots[1]].x, coordinates[dots[1]].y); //2番目の点の場所
    context.stroke();
  }

  // 3点が選択されたら三角形を描写する
  if(selectedDots.size == 3){
    let dots = Array.from(selectedDots.values());

    // 2点目から3点目
    context.beginPath();
    setLineColor(dots[1],dots[2]);
    console.log(dots[1],dots[2])
    context.moveTo(coordinates[dots[1]].x, coordinates[dots[1]].y);
    context.lineTo(coordinates[dots[2]].x, coordinates[dots[2]].y);
    context.stroke();

    // 3点目から1点目
    setLineColor(dots[2],dots[0]);
    console.log(dots[2],dots[0])
    context.moveTo(coordinates[dots[2]].x, coordinates[dots[2]].y);
    context.lineTo(coordinates[dots[0]].x, coordinates[dots[0]].y);
    context.stroke();
    context.closePath();	//三角形の最後の線 closeさせる
  }

});

// マウスを動かしたときの処理
/*
myPics.addEventListener('mousemove', e => { 
  // 座標と選択された dot を表示する
  mouseXY.innerText = `x座標: ${e.offsetX}, Y座標:${e.offsetY} 選択された dot -> ${Array.from(selectedDots)}`
})
*/