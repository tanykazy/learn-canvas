// canvas の設定
const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');
const mouseXY = document.getElementById('mouseXY');

/* 点1~12 の座標を求めるのに必要な情報 */
// canvas の情報
const canvasX = 200;
const canvasY = 200;

// 大きな円の情報
const radiusOfPie = 92;
const centerPointX = 100;
const centerPointY = 100;
// 30-60-90 三角形
const shortLine = radiusOfPie /2;
const middleLine = shortLine * Math.sqrt(3);
const longLine = radiusOfPie;
// 12 点の情報
const coordinates = {
  dot1:	{x: centerPointX, y: centerPointY - longLine },
  dot2:	{x: centerPointX + shortLine, y: centerPointY - middleLine},
  dot3:	{x: centerPointX + middleLine, y: centerPointY - shortLine},
  dot4:	{x: centerPointX + longLine, y: centerPointY},
  dot5:	{x: centerPointX + middleLine, y: centerPointY + shortLine},
  dot6:	{x: centerPointX + shortLine, y: centerPointY + middleLine},
  dot7:	{x: centerPointX, y: centerPointY + longLine},
  dot8:	{x: centerPointX - shortLine, y: centerPointY + middleLine},
  dot9:	{x: centerPointX - middleLine, y: centerPointY + shortLine},
  dot10:{x: centerPointX - longLine, y: centerPointY},
  dot11:{x: centerPointX - middleLine, y: centerPointY - shortLine},
  dot12:{x: centerPointX - shortLine, y: centerPointY - middleLine}
}

// 選択された dots
const selectedDots = new Set();

// 円を描く
context.beginPath();
context.lineWidth = 2;
context.arc(100, 100, 92, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
context.fillStyle = "rgba(0,0,0,0)";
context.fill();
context.stroke();

// 12点を描く
for(let key in coordinates){
  context.beginPath();
  context.strokeStyle = "black"
  context.arc(coordinates[key].x, coordinates[key].y, 4, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
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

  // 1
  if(distanceOfDots == 48){
    context.strokeStyle = "red";
  }
  // 2
  else if(distanceOfDots == 92){
    context.strokeStyle = "blue";
  }
  // 3
  else if(distanceOfDots == 130){
    context.strokeStyle = "yellow";
  }
  // 4
  else if(distanceOfDots == 159){
    context.strokeStyle = "green";
  }
  // 5
  else if(distanceOfDots == 178){
    context.strokeStyle = "orange";
  }
  // 6
  else if(distanceOfDots == 184){
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
      context.lineWidth = 2;
      context.strokeStyle = "black"
      context.arc(coordinates[key].x, coordinates[key].y, 6, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
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
    context.arc(100, 100, radiusOfPie, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
    context.fillStyle = "rgba(0,0,0,0)";
    context.strokeStyle = "black"
    context.lineWidth = 2;
    context.fill();
    context.stroke();

    // 12点を描く
    for(let key in coordinates){
      context.beginPath();
      context.lineWidth = 2;
      context.arc(coordinates[key].x, coordinates[key].y, 4, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
      context.fillStyle = "rgba(0,0,0,0.7)";
      context.fill();
      context.stroke();
    }
  }

  // 2点が選択されたら線を引く
  if(selectedDots.size == 2){
    let dots = Array.from(selectedDots.values());

    // 1 点目から 2点目
    context.beginPath();
    context.lineWidth = 2;
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
    context.beginPath();
    setLineColor(dots[2],dots[0]);
    console.log(dots[2],dots[0])
    context.moveTo(coordinates[dots[2]].x, coordinates[dots[2]].y);
    context.lineTo(coordinates[dots[0]].x, coordinates[dots[0]].y);
    context.stroke();
    context.closePath();
  }
});

// マウスを動かしたときの処理
/*
myPics.addEventListener('mousemove', e => { 
  // 座標と選択された dot を表示する
  mouseXY.innerText = `x座標: ${e.offsetX}, Y座標:${e.offsetY} 選択された dot -> ${Array.from(selectedDots)}`
})
*/