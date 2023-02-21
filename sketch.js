let board = [
  ['','',''],
  ['','',''],
  ['','',''],
];  //board

let p= ['X','O']; //array of players

let currplayer;  //current player
let available=[];

function setup() {
  createCanvas(400, 400);
  frameRate(7);  //fps
  currplayer=floor(random(p.length));  //picking random player
  for(let j=0;j<3;j++)
    {
      for(let i=0;i<3;i++)
        {
          available.push([i,j]);
          }
      }
}

function equalsall(a,b,c)  
//to check if the three boxes are equal
{
  return (a==b && b==c && a!='');
}

function checkwinner()
{
  let winner=null;
  
  //horizontal
  for(let i=0;i<3;i++)
    {
      if(equalsall(board[i][0],board[i][1],board[i][2]))
        winner=board[i][0];
    }
  
  //vertical
  for (let i=0;i<3;i++) {
    if(equalsall(board[0][i], board[1][i], board[2][i]))
      winner = board[0][i];
  }
  
  // Diagonal left top to right bottom 
  if (equalsall(board[0][0], board[1][1], board[2][2])) 
  {
    winner = board[0][0];
  }
  
  //Diagonal right top to left bottom
  if (equalsall(board[2][0], board[1][1], board[0][2])) 
  {
    winner = board[2][0];
  }

  if (winner==null && available.length==0) 
  {
    return 'tie';
  } 
  else 
  {
    return winner;
  }
}

function nextTurn() {
  let index = floor(random(available.length));
  let box = available.splice(index, 1)[0];
  let i = box[0];
  let j = box[1];
  board[i][j] = p[currplayer];
  currplayer = (currplayer + 1) % p.length;   
}

function draw() {
  background(221);
  let w=width/3; //width of one box
  let h=height/3; //height of one box
  strokeWeight(1); //thickness of lines
  
  //outlines
  line(0,0,0,height);
  line(width,0,width,height);
  line(0,0,width,0);
  line(0,height,width,height);
  
  //inner lines
  line(w,0,w,height);
  line(2*w,0,2*w,height);
  line(0,h,width,h);
  line(0,2*h,width,2*h);
  
  
  for(let j=0;j<3;j++){
    for(i=0;i<3;i++){
      let x=w*i + w/2;
      let y=h*j + h/2;
      let box = board[i][j];
      textSize(21);   //size of text
      if(box == p[1]){
        noFill();
        ellipse(x,y,w/2);  //circle to represent 'O'
      }
      else if(box == p[0]){
        let nw=w/4;
        line(x-nw,y-nw,x+nw,y+nw); 
        line(x+nw,y-nw,x-nw,y+nw);
         //two diagonal lines combined to represent 'X'
        }
      }
    }

let result =checkwinner();
if(result!=null)
  {
    noLoop();
    let val=createP('');
    val.style('fontsize','21pt');
    if(result=='tie')
      {
        val.html("Tie!");
      }
    else
      {
        val.html(`${result} wins!`);
      }
  }
  else
    {
      nextTurn();
    }
}

    