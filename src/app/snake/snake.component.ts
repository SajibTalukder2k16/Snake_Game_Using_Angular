import { Component, OnInit,HostListener } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog'
import { TopScoresComponent } from '../top-scores/top-scores.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  
  
  
  inputDir ={x:0,y:0}
  score=0;
  lastPaintTime=0;
  pause_option = true;
  previous_key=""
  food={x:6,y:7}
  ctime:number=new Date().getTime();
  a=2
  b=16
  food_position = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
  head_position = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
  previous_position={x:this.head_position.x-1,y:this.head_position.y};
  //snakeArr = [{x:this.head_position.x-1,y:this.head_position.y}]
  snakeArr = [{x:-100,y:-100}]
  condition_for_snake_loop = this.snakeArr.length>1;
  notEaten = true;
  
  scoreBox = "scoreBox"
  score_list = "score_list";
  val = [-1];
  
  items:Observable<any[]>

  constructor(private matDialog: MatDialog,firestore: AngularFirestore) {
    this.items = firestore.collection('scores').valueChanges();

   }

  ngOnInit(): void {
    //this.readTextFile();
    //this.writeOnLocalStorage();
    //this.readOnLocalStorage();
    //this.keysEvent();
    this.gameEngine();
  }
  openDialog()
  {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.val=[-1];
    this.readOnLocalStorage();

    
    console.log(this.val);
    //console.log(this.val.sort())
    
    let l=this.val.length
    let ara=[this.val[1],this.val[2],this.val[3],this.val[4],this.val[5]]
    console.log(typeof(this.val[1]))
    this.val=ara;
    this.val.sort((a,b)=>{
      if(a>b)
      return 1;
      else
      return -1;
    })
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
        
        data:this.items
        
      });
  }
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
  }
  readOnLocalStorage()
  {
    /*
    firestore.collection("scores").doc("top6").set({
      name: "Talukder",
      score: 9,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });*/
    //this.val=[-1]
    let temp=localStorage.getItem("top1");
    if(temp)
    {
      /*
      let ll=temp.length
      console.log(temp,ll)
      let v=parseInt(temp)
      let num = 0;
      for(let i=ll-1;i>=0;i--)
      {
        console.log(v);
        let rem=v%10
        num=num*10+rem
        v= Math.floor(v/10);
        
      }
      */
      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top2")
    if(temp)
    {
      /*
      let ll=temp.length
      let v=parseInt(temp)
      let num = 0;
      for(let i=ll-1;i>=0;i--)
      {
        let rem=v%10
        num=num*10+rem
        v= Math.floor(v/10);
      }
      this.val.push(num)
      */
      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top3")
    if(temp)
    {
      /*
      let ll=temp.length
      let v=parseInt(temp)
      let num = 0;
      for(let i=ll-1;i>=0;i--)
      {
        let rem=v%10
        num=num*10+rem
        v= Math.floor(v/10);
      }
      this.val.push(num)
      */
      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top4")
    if(temp)
    {
      /*
      let ll=temp.length
      let v=parseInt(temp)
      let num = 0;
      for(let i=ll-1;i>=0;i--)
      {
        let rem=v%10
        num=num*10+rem
        v= Math.floor(v/10);
      }
      this.val.push(num)
      */
      this.val.push(parseInt(temp))
    }
    temp=localStorage.getItem("top5")
    if(temp)
    {
      /*
      let ll=temp.length
      let v=parseInt(temp)
      let num = 0;
      for(let i=ll-1;i>=0;i--)
      {
        let rem=v%10
        num=num*10+rem
        v= Math.floor(v/10);
      }
      this.val.push(num)
      */
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

  isCollide() {
    for (let i = 1; i < this.snakeArr.length; i++) {
        //own
        if(this.head_position.x===this.snakeArr[i].x && this.head_position.y===this.snakeArr[i].y)
        {
            //gameOverSound.play();
            //console.log("owwwww");
            this.notEaten=true;
            return true;
        }
    }
    //go outside
    //console.log(sArr[0].x,sArr[0].y);
    if(this.head_position.x<=1 || this.head_position.x>=18 || this.head_position.y<=1 ||this.head_position.y>=18)
    {
        //gameOverSound.play();
        //console.log("true");
        this.notEaten=true;
        return true;
    }
    //console.log("false")
    return false
}

gameEngine()
{
  this.condition_for_snake_loop=this.snakeArr.length>1
  if(this.isCollide())
  {
    this.val.push(this.score);
    this.readOnLocalStorage();
    console.log(this.val)
    this.writeOnLocalStorage();
      //musicSound.pause();
      this.inputDir ={x:0,y:0}
      
      //debugger
      alert("Game Over")
      //this.snakeArr = [{x:13,y:15}]
      this.head_position = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}
      this.snakeArr = [{x:-1,y:-1}]
      //this.snakeArr.push()
      //musicSound.play();
      this.score=0;
      //this.speed=5;
      this.previous_key="";

      //scoreBox.innerHTML="Score: "+score;

  }
  
  //after eating food

  if(this.head_position.y===this.food_position.y && this.head_position.x===this.food_position.x)
  {
      this.score+=1;
      //debugger
      //this.val.push(this.score);
      //this.writeOnLocalStorage();
      //this.val.push(this.score);
      //this.speed+=.3;
      //let val = this.speed.toFixed(2)

      //foodSound.play();
      //this.snakeArr.unshift({x:this.snakeArr[1].x+this.inputDir.x , y:this.snakeArr[1].y+this.inputDir.y})
      
      //console.log(this.snakeArr.length)
      //console.log(this.previous_position);
      this.snakeArr.push(this.previous_position);
      //this.snakeArr.push(this.snakeArr[this.snakeArr.length-1]);
      console.log(this.snakeArr.length)
      //this.previous_position
      console.log(this.snakeArr);

      //this.previous_position.push(this.pre);
      this.food_position = {x: Math.round(this.a+(this.b-this.a)*Math.random()),y: Math.round(this.a+(this.b-this.a)*Math.random())}

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
  if(this.previous_key==="ArrowUp" && this.pause_option===true)
  {
    
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
  }
  else if(this.previous_key==="ArrowDown")
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
    
  }
  else if(this.previous_key==="ArrowLeft" )
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
  }
  else if(this.previous_key==="ArrowRight")
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
  }

  //snake display
  if(this.pause_option===true)
  setTimeout(() => {
    this.gameEngine();//.updatePositions();
  }, 200);
}

@HostListener('document:keydown',['$event']) onKeydownHandle(e:KeyboardEvent)
{
  console.log(e.code);
  if(this.snakeArr.length===1)
      {
        if(e.key==="ArrowUp")
        {
            //this.head_position.y--;
            this.pause_option=true;
            //console.log("ArrowUp")
            this.inputDir.x=0
            this.inputDir.y=-1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowDown")
        {
          //this.head_position.y++;
          this.pause_option=true;
            //console.log("ArrowDown")
            this.inputDir.x=0
            this.inputDir.y=1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowLeft")
        {
          //this.head_position.x--;
          this.pause_option=true;
            //console.log("ArrowLeft")
            this.inputDir.x=-1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowRight")
        {
          //this.head_position.x++;
          this.pause_option=true;
            //console.log("ArrowRight")
            this.inputDir.x=1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key===" ")
        {
            //console.log("Hi this");
            this.pause_option=!this.pause_option;
        }
      }
      else
      {
        if(e.key==="ArrowUp" && this.previous_key!="ArrowDown")
        {
          this.pause_option=true;
            //console.log("ArrowUp")
            this.inputDir.x=0
            this.inputDir.y=-1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowDown" && this.previous_key!="ArrowUp")
        {
          this.pause_option=true;
            //console.log("ArrowDown")
            this.inputDir.x=0
            this.inputDir.y=1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowLeft" && this.previous_key!="ArrowRight")
        {
          this.pause_option=true;
            //console.log("ArrowLeft")
            this.inputDir.x=-1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowRight" && this.previous_key!="ArrowLeft")
        {
          this.pause_option=true;
            //console.log("ArrowRight")
            this.inputDir.x=1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key===" ")
        {
            //console.log("Hi this");
            this.pause_option=!this.pause_option;
        }
      }
}
/*
  keysEvent()
  {
    addEventListener('keydown',e=>{
      console.log("Size: ",this.snakeArr.length)
      console.log(this.snakeArr)
      if(this.snakeArr.length===1)
      {
        if(e.key==="ArrowUp")
        {
            //this.head_position.y--;
            this.pause_option=true;
            //console.log("ArrowUp")
            this.inputDir.x=0
            this.inputDir.y=-1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowDown")
        {
          //this.head_position.y++;
          this.pause_option=true;
            //console.log("ArrowDown")
            this.inputDir.x=0
            this.inputDir.y=1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowLeft")
        {
          //this.head_position.x--;
          this.pause_option=true;
            //console.log("ArrowLeft")
            this.inputDir.x=-1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowRight")
        {
          //this.head_position.x++;
          this.pause_option=true;
            //console.log("ArrowRight")
            this.inputDir.x=1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key===" ")
        {
            //console.log("Hi this");
            this.pause_option=!this.pause_option;
        }
      }
      else
      {
        if(e.key==="ArrowUp" && this.previous_key!="ArrowDown")
        {
          this.pause_option=true;
            //console.log("ArrowUp")
            this.inputDir.x=0
            this.inputDir.y=-1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowDown" && this.previous_key!="ArrowUp")
        {
          this.pause_option=true;
            //console.log("ArrowDown")
            this.inputDir.x=0
            this.inputDir.y=1
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowLeft" && this.previous_key!="ArrowRight")
        {
          this.pause_option=true;
            //console.log("ArrowLeft")
            this.inputDir.x=-1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key==="ArrowRight" && this.previous_key!="ArrowLeft")
        {
          this.pause_option=true;
            //console.log("ArrowRight")
            this.inputDir.x=1
            this.inputDir.y=0
            this.previous_key=e.key;
        }
        else if(e.key===" ")
        {
            //console.log("Hi this");
            this.pause_option=!this.pause_option;
        }
      }
      
  })
  }
  */

    
}
function Dialoge(Dialoge: any) {
  throw new Error('Function not implemented.');
}

function DialogExampleComponent(DialogExampleComponent: any) {
  throw new Error('Function not implemented.');
}

