import { Component, OnInit,HostListener } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog'
import { TopScoresComponent } from '../top-scores/top-scores.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Input } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  foodSound = new Audio('/assets/audio/eating.wav')
  gameOverSound = new Audio('/assets/audio/game_over.wav')
  moveSound = new Audio('/assets/audio/direction_change.wav')
  musicSound = new Audio('/assets/audio/bg_music.mp3')
  poisonSound = new Audio('/assets/audio/poison.wav')
  last_move=""
  inputDir ={x:0,y:0}
  score=0;
  lastPaintTime=0;
  pause_option = true;
  previous_key=""
  food={x:6,y:7}
  ctime:number=new Date().getTime();
  a=2
  b=16
  food_position:any;// = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
  food_position1:any;// = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
  food_position2:any;// = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
  head_position = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
  previous_position={x:this.head_position.x-1,y:this.head_position.y};
  //snakeArr = [{x:this.head_position.x-1,y:this.head_position.y}]
  snakeArr = [{x:-100,y:-100}]
  condition_for_snake_loop = this.snakeArr.length>1;
  notEaten = true;
  
  scoreBox = "scoreBox"
  score_list = "score_list";
  head="head"
  val:any
  last_key=""
  key_work_done=true;
  speed = 230;
  player:any
  count:any;
  //items:Observable<any[]>
  check_position(x:any,y:any)
  {
    if(x.x===y.x && x.y===y.y)
      return true;
    else
      return false;
  }
  constructor(private matDialog: MatDialog,private db: AngularFirestore) {
    //this.items = firestore.collection('scores').valueChanges();
    this.food_position = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
    while(this.check_position(this.food_position,this.head_position))
    {
      this.food_position={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())};
    }

    this.food_position1={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
    while(this.check_position(this.food_position1,this.food_position) && this.check_position(this.food_position1,this.head_position))
    {
      this.food_position1={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
    }
    this.food_position2={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
    while(this.check_position(this.food_position2,this.food_position) && this.check_position(this.food_position2,this.food_position1) && this.check_position(this.head_position,this.food_position2))
    {
      this.food_position2={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
    }
    this.player= localStorage.getItem('player_name');
    let temp_pla="";
    for(let i=1;i<this.player.length-1;i++)
    {
      temp_pla+=this.player[i];
    }
    this.player=temp_pla;
    //console.log(this.player)
    
    this.db.collection('scores').valueChanges().subscribe(val => {
      //console.log(val);
      this.val=val;
      //let ara = val;
      //console
 });
  this.db.collection('play_count').valueChanges().subscribe(val =>{
    this.count=val;
    console.log(this.count);
  })
   }

  ngOnInit(): void {
    this.gameEngine();
  }
  openDialog()
  {
    this.pause_option=false;
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    //this.val=[-1];
    //this.readOnLocalStorage();

    
    //console.log(this.val);
    //console.log(this.val.sort())
    
    //let l=this.val.length

    
    let ara=[{sc:this.val[0].score,nm:this.val[0].name},{sc:this.val[1].score,nm:this.val[1].name},{sc:this.val[2].score,nm:this.val[2].name},{sc:this.val[3].score,nm:this.val[3].name},{sc:this.val[4].score,nm:this.val[4].name}]
    ara.push({sc:this.score,nm:this.player});
    for (let i = 0; i < 6; i++) 
    {
      for (let j = 0; j < 6-i-1; j++)
      {
        if(ara[j].sc<ara[j+1].sc)
        {
          let t1=ara[j];
          let t2=ara[j+1];
          ara[j]=t2;
          ara[j+1]=t1;
        }
      }
    }
    for(let i=0;i<5;i++)
      {
        //console.log("hello",i)
        this.val[i].score =ara[i].sc;
        this.val[i].name=ara[i].nm;
        
  
      }

    
    /*
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
          if (this.val[j] > this.val[j + 1]) {
              let tmp = this.val[j];
              this.val[j] = this.val[j + 1];
              this.val[j + 1] = tmp ;
          }
      }
      
  }
  */

    //let another=this.val.sort();
    //console.log(another);
    this.matDialog.open(TopScoresComponent,
      {
        
        width:'40%',
        
        data:this.val
        
      });
    
  }
  /*
  writeOnLocalStorage()
  {
    //this.readOnLocalStorage();
    this.val.sort((a,b)=>{
      if(a>b)
      return 1;
      else
      return -1;
    })
    let l=this.val.length
    //console.log(this.val);
    localStorage.setItem("top1",JSON.stringify(this.val[l-1]));
    localStorage.setItem("top2",JSON.stringify(this.val[l-2]));
    localStorage.setItem("top3",JSON.stringify(this.val[l-3]));
    localStorage.setItem("top4",JSON.stringify(this.val[l-4]));
    localStorage.setItem("top5",JSON.stringify(this.val[l-5]));
  }*/
  /*
  readOnLocalStorage()
  {
    
    firestore.collection("scores").doc("top6").set({
      name: "Talukder",
      score: 9,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    //this.val=[-1]
    let temp=localStorage.getItem("top1");
    if(temp)
    {
    
      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top2")
    if(temp)
    {

      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top3")
    if(temp)
    {
s.val.push(num)
      
      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top4")
    if(temp)
    {

      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top5")
    if(temp)
    {

      this.val.push(parseInt(temp))
    }
    this.val.sort((a,b)=>{
      if(a>b)
      return 1;
      else
      return -1;
    })
    //this.val.sort();
    //l//et 
    //return val;
  }
  */

  isCollide() {
    for (let i = 1; i < this.snakeArr.length; i++) {
        //own
        if(this.head_position.x===this.snakeArr[i].x && this.head_position.y===this.snakeArr[i].y)
        {
            this.gameOverSound.play();
            //console.log("owwwww");
            this.notEaten=true;
            return true;
        }
    }
    //go outside
    //console.log(sArr[0].x,sArr[0].y);
    if(this.head_position.x<=1 || this.head_position.x>=18 || this.head_position.y<=1 ||this.head_position.y>=18)
    {
        this.gameOverSound.play();
        //console.log("true");
        this.notEaten=true;
        return true;
    }
    //console.log("false")
    return false
}

gameEngine()
{
  //console.log("Pause Option: ",this.pause_option)
  //console.log("Key: ",this.previous_key);
  if(this.pause_option===true)
  {

    //if(this.pause_option)
    this.condition_for_snake_loop=this.snakeArr.length>1
    if(this.isCollide())
    {
      this.count[0].cnt++;

      this.db.collection("play_count").doc('count').set({
        //name: "Talukder",
        cnt:this.count[0].cnt,
      })
      setTimeout(() => {
        
      }, 1000);
      let ara=[{sc:this.val[0].score,nm:this.val[0].name},{sc:this.val[1].score,nm:this.val[1].name},{sc:this.val[2].score,nm:this.val[2].name},{sc:this.val[3].score,nm:this.val[3].name},{sc:this.val[4].score,nm:this.val[4].name}]
      ara.push({sc:this.score,nm:this.player});
      for (let i = 0; i < 6; i++) 
      {
      for (let j = 0; j < 6-i-1; j++)
       {
        if(ara[j].sc<ara[j+1].sc)
        {
          let t1=ara[j];
          let t2=ara[j+1];
          ara[j]=t2;
          ara[j+1]=t1;

        }
      }
    }

      for(let i=0;i<5;i++)
      {
        //console.log("hello",i)
        this.val[i].score =ara[i].sc;
        this.val[i].name=ara[i].nm;
        let temp_doc="top"+(i+1).toString();
        //console.log(temp_doc)
        this.db.collection("scores").doc(temp_doc).set({
          //name: "Talukder",
          name:this.val[i].name,
          score: this.val[i].score,
        })
  
      }
      //console.log(this.val);
  
  
        this.inputDir ={x:0,y:0}
        
        //debugger
        alert("Game Over")
        //this.snakeArr = [{x:13,y:15}]
        this.head_position = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
        this.snakeArr = [{x:-1,y:-1}]
        //this.snakeArr.push()
        //musicSound.play();
        this.score=0;
        this.speed=230;
        this.previous_key="";
  
        //scoreBox.innerHTML="Score: "+score;
  
    }
    
    //after eating food
///eating food0
    if(this.check_position(this.food_position,this.head_position))
    {
        this.foodSound.play();
        this.score+=1;
        this.snakeArr.push(this.previous_position);
        //let temp_x=Math.round(this.a+(this.b-this.a)*Math.random())
        //let temp_y = Math.round(this.a+(this.b-this.a)*Math.random())
        let temp_new_food={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
        while(true)
        {
          let chk = false;
          for(let i=0;i<this.snakeArr.length;i++)
          {
            if(this.check_position(temp_new_food,this.snakeArr[i]))
            {
              chk=true;
            }
            //this.snakeArr[i].x===
          }
          if(this.check_position(this.head_position,temp_new_food) && this.check_position(temp_new_food,this.food_position1) && this.check_position(temp_new_food,this.food_position2))
          {
            chk=true;
          }
          if(chk===false)
          {
            break;
          }
          temp_new_food={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
        }
        this.food_position =temp_new_food;


        ///speed
        this.speed-=4;

  
    }

    //eating food1
    if(this.check_position(this.food_position1,this.head_position))
    {
      this.foodSound.play();
        this.score+=2;
        this.snakeArr.push(this.previous_position);
        //let temp_x=Math.round(this.a+(this.b-this.a)*Math.random())
        //let temp_y = Math.round(this.a+(this.b-this.a)*Math.random())
        let temp_new_food={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
        while(true)
        {
          let chk = false;
          for(let i=0;i<this.snakeArr.length;i++)
          {
            if(this.check_position(temp_new_food,this.snakeArr[i]))
            {
              chk=true;
            }
            //this.snakeArr[i].x===
          }
          if(this.check_position(this.head_position,temp_new_food) && this.check_position(temp_new_food,this.food_position) && this.check_position(temp_new_food,this.food_position2))
          {
            chk=true;
          }
          if(chk===false)
          {
            break;
          }
          temp_new_food={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
        }
        this.food_position1 =temp_new_food;


        ///speed
        this.speed-=10;

  
    }
    
    ///eating food 2

    if(this.check_position(this.food_position2,this.head_position))
    {
      //this.foodSound.play();
      this.poisonSound.play();
        this.score-=3;
        this.snakeArr.push(this.previous_position);
        //let temp_x=Math.round(this.a+(this.b-this.a)*Math.random())
        //let temp_y = Math.round(this.a+(this.b-this.a)*Math.random())
        let temp_new_food={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
        while(true)
        {
          let chk = false;
          for(let i=0;i<this.snakeArr.length;i++)
          {
            if(this.check_position(temp_new_food,this.snakeArr[i]))
            {
              chk=true;
            }
            //this.snakeArr[i].x===
          }
          if(this.check_position(this.head_position,temp_new_food) && this.check_position(temp_new_food,this.food_position) && this.check_position(temp_new_food,this.food_position1))
          {
            chk=true;
          }
          if(chk===false)
          {
            break;
          }
          temp_new_food={x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
        }
        this.food_position2 =temp_new_food;


        ///speed
        this.speed+=4;

  
    }

    
    //moving the snake
    
    for(let i=this.snakeArr.length-2;i>=0;i--)
    {
      this.snakeArr[i+1]= {...this.snakeArr[i]}
    }
    
    if(this.snakeArr.length>1)
    {
      this.snakeArr[1].x += this.inputDir.x
      this.snakeArr[1].y += this.inputDir.y;
    }
    
  
  
      if(this.previous_key==="ArrowUp" && (this.last_key!="ArrowDown"||this.snakeArr.length===1))
      {
        this.pause_option=true;
        this.head_position.y--;
        let l=this.snakeArr.length;
        if(l>1)
        {
          this.snakeArr[1].y=this.head_position.y+1;
          this.snakeArr[1].x=this.head_position.x;
        }
        if(l<=2)
        {
          for(let i=2;i<l-1;i++)
          {
            this.snakeArr[i].x=this.snakeArr[i+1].x;
            this.snakeArr[i].y=this.snakeArr[i+1].y;
            //v.push(this.previous_position[i]);
          }
        }
        if(l>1)
        {
          this.previous_position.x=this.snakeArr[l-1].x;
          this.previous_position.y=this.snakeArr[l-1].y;
        }
        this.last_key="ArrowUp"
      }
      else if(this.previous_key==="ArrowDown" && (this.last_key!="ArrowUp"||this.snakeArr.length===1))
      {
        this.pause_option=true
          this.head_position.y++;
          let l=this.snakeArr.length;
          if(l>1)
          {
            this.snakeArr[1].y=this.head_position.y-1;
            this.snakeArr[1].x=this.head_position.x;
          }
          if(l<=2)
        {
          for(let i=2;i<l-1;i++)
          {
            this.snakeArr[i].x=this.snakeArr[i+1].x;
            this.snakeArr[i].y=this.snakeArr[i+1].y;
            //v.push(this.previous_position[i]);
          }
        }
        if(l>1)
        {
          this.previous_position.x=this.snakeArr[l-1].x;
          this.previous_position.y=this.snakeArr[l-1].y;
        }
        this.last_key="ArrowDown"
        
      }
      else if(this.previous_key==="ArrowLeft" && (this.last_key!="ArrowRight"||this.snakeArr.length===1))
      {
        this.pause_option=true
        this.head_position.x--;
        let l=this.snakeArr.length;
        if(l>1)
        {
          this.snakeArr[1].y=this.head_position.y;
          this.snakeArr[1].x=this.head_position.x+1;
        }
        if(l<=2)
        {
          for(let i=2;i<l-1;i++)
          {
            this.snakeArr[i].x=this.snakeArr[i+1].x;
            this.snakeArr[i].y=this.snakeArr[i+1].y;
            //v.push(this.previous_position[i]);
          }
        }
        if(l>1)
        {
          this.previous_position.x=this.snakeArr[l-1].x;
          this.previous_position.y=this.snakeArr[l-1].y;
        }
        this.last_key="ArrowLeft"
      }
      else if(this.previous_key==="ArrowRight" && (this.last_key!="ArrowLeft"||this.snakeArr.length===1))
      {
        this.pause_option=true
        this.head_position.x++;
        let l=this.snakeArr.length;
        if(l>1)
        {
          this.snakeArr[1].y=this.head_position.y;
          this.snakeArr[1].x=this.head_position.x-1;
        }
        if(l<=2)
        {
          for(let i=2;i<l-1;i++)
          {
            this.snakeArr[i].x=this.snakeArr[i+1].x;
            this.snakeArr[i].y=this.snakeArr[i+1].y;
            //v.push(this.previous_position[i]);
          }
        }
        if(l>1)
        {
          this.previous_position.x=this.snakeArr[l-1].x;
          this.previous_position.y=this.snakeArr[l-1].y;
        }
        this.last_key="ArrowRight";
    
      }
      this.key_work_done=true;
    /*
    if(this.previous_key===" ")
    {
      //this.pause_option=!this.pause_option;
      last_key=this.previous_key;
      /*
      if(this.pause_option===false)
      {
        this.pause_option=false;
      }
      
    }
    */
  }
  else
  {
    this.key_work_done=true;
  }
  


  //snake display
  setTimeout(() => {
    this.gameEngine();//.updatePositions();
  }, this.speed);
}

@HostListener('document:keydown',['$event']) onKeydownHandle(e:KeyboardEvent)
{
  //console.log(e.code);
  if(this.snakeArr.length===1 && this.key_work_done===true)
      {
        if(e.key==="ArrowUp")
        {
            //style.transform = 'rotate(180deg)';
            
            let elem = document.querySelector("#head")
            if (elem instanceof HTMLElement) {
                // elem.style
                  elem.style.transform = 'rotate(90deg)' 
            } 
            
            this.pause_option=true;
            //console.log("ArrowUp")
            this.inputDir.x=0
            this.inputDir.y=-1
            this.previous_key=e.key;
            this.key_work_done=false;
            //this.last_move=e.key
        }
        else if(e.key==="ArrowDown")
        {
          let elem = document.querySelector("#head")
          if (elem instanceof HTMLElement) {
              // elem.style
                elem.style.transform = 'rotate(270deg)'
              
          }
          //this.head_position.y++;
          this.pause_option=true;
            //console.log("ArrowDown")
            this.inputDir.x=0
            this.inputDir.y=1
            this.previous_key=e.key;
            this.key_work_done=false;
        }
        else if(e.key==="ArrowLeft")
        {
          let elem = document.querySelector("#head")
          if (elem instanceof HTMLElement) {
              // elem.style

                elem.style.transform = 'scaleX(1)'
              
          }
          //this.head_position.x--;
          this.pause_option=true;
            //console.log("ArrowLeft")
            this.inputDir.x=-1
            this.inputDir.y=0
            this.previous_key=e.key;
            this.key_work_done=false;
        }
        else if(e.key==="ArrowRight")
        {
          let elem = document.querySelector("#head")
          if (elem instanceof HTMLElement) {
              // elem.style

                elem.style.transform = 'scaleX(-1)'
              
          }

          //this.head_position.x++;
          this.pause_option=true;
            //console.log("ArrowRight")
            this.inputDir.x=1
            this.inputDir.y=0
            this.previous_key=e.key;
            this.key_work_done=false;
        }
        else if(e.key===" ")
        {
            console.log("Hi this");
            //this.pause_option=!this.pause_option;
            if(this.pause_option===true)
            {
              this.pause_option=false;
              //this.previous_key=e.key;
            }
            else
            {
              this.pause_option=true;
              this.previous_key=this.last_key;

            }
            this.key_work_done=false;
            

        }
        this.key_work_done=false;
      }
      else if(this.snakeArr.length>1 && this.key_work_done===true)
      {
        if(e.key==="ArrowUp" && this.previous_key!="ArrowDown")
        {
          let elem = document.querySelector("#head")
            if (elem instanceof HTMLElement) {
                // elem.style
                  elem.style.transform = 'rotate(90deg)' 
            } 

          this.pause_option=true;
            //console.log("ArrowUp")
            this.inputDir.x=0
            this.inputDir.y=-1
            this.previous_key=e.key;
            this.key_work_done=false;
        }
        else if(e.key==="ArrowDown" && this.previous_key!="ArrowUp")
        {
          let elem = document.querySelector("#head")
          if (elem instanceof HTMLElement) {
              // elem.style
                elem.style.transform = 'rotate(270deg)'
              
          }
          this.pause_option=true;
            //console.log("ArrowDown")
            this.inputDir.x=0
            this.inputDir.y=1
            this.previous_key=e.key;
            this.key_work_done=false;
        }
        else if(e.key==="ArrowLeft" && this.previous_key!="ArrowRight")
        {

          let elem = document.querySelector("#head")
          if (elem instanceof HTMLElement) {
              // elem.style

                elem.style.transform = 'scaleX(1)'
              
          }
          this.pause_option=true;
            //console.log("ArrowLeft")
            this.inputDir.x=-1
            this.inputDir.y=0
            this.previous_key=e.key;
            this.key_work_done=false;
        }
        else if(e.key==="ArrowRight" && this.previous_key!="ArrowLeft")
        {
          let elem = document.querySelector("#head")
          if (elem instanceof HTMLElement) {
              // elem.style

                elem.style.transform = 'scaleX(-1)'
              
          }
          this.pause_option=true;
            //console.log("ArrowRight")
            this.inputDir.x=1
            this.inputDir.y=0
            this.previous_key=e.key;
            this.key_work_done=false;
        }
        else if(e.key===" ")
        {

          if(this.pause_option===true)
          {
            this.pause_option=false;
            //this.previous_key=this.last_key;
          }
          else
          {
            this.pause_option=true;
            this.previous_key=this.last_key;

          }
          this.key_work_done=false;
        }
        
        
      }
}


    
}
function Dialoge(Dialoge: any) {
  throw new Error('Function not implemented.');
}

function DialogExampleComponent(DialogExampleComponent: any) {
  throw new Error('Function not implemented.');
}

