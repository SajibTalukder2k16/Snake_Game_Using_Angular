import { Component, OnInit,HostListener } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog'
import { TopScoresComponent } from '../top-scores/top-scores.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  val:any
  last_key=""
  key_work_done=true;
  
  //items:Observable<any[]>

  constructor(private matDialog: MatDialog,private db: AngularFirestore) {
    //this.items = firestore.collection('scores').valueChanges();
    this.db.collection('scores').valueChanges().subscribe(val => {
      console.log(val);
      this.val=val;
      //let ara = val;
      //console
 });
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

    
    let ara=[this.val[0].score,this.val[1].score,this.val[2].score,this.val[3].score,this.val[4].score]
    //console.log(typeof(this.val[1]))
    //this.val=ara;
    ara.sort((a,b)=>{
      if(a<b)
      return 1;
      else
      return -1;
    })
    for(let i=0;i<5;i++)
    {
      this.val[i].score =ara[i];
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
  console.log("Pause Option: ",this.pause_option)
  //console.log("Key: ",this.previous_key);
  if(this.pause_option===true)
  {



    //if(this.pause_option)
    this.condition_for_snake_loop=this.snakeArr.length>1
    if(this.isCollide())
    {
      let ara=[this.val[0].score,this.val[1].score,this.val[2].score,this.val[3].score,this.val[4].score]
      ara.push(this.score);
      ara.sort((a,b)=>{
        if(a<b)
        return 1;
        else
        return -1;
      })
      for(let i=0;i<5;i++)
      {
        console.log("hello",i)
        this.val[i].score =ara[i];
        let temp_doc="top"+(i+1).toString();
        console.log(temp_doc)
        this.db.collection("scores").doc(temp_doc).set({
          //name: "Talukder",
          score: this.val[i].score,
        })
  
      }
      console.log(this.val);
  
  
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
        this.snakeArr.push(this.previous_position);
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
  


  //snake display
  setTimeout(() => {
    this.gameEngine();//.updatePositions();
  }, 200);
}

@HostListener('document:keydown',['$event']) onKeydownHandle(e:KeyboardEvent)
{
  console.log(e.code);
  if(this.snakeArr.length===1 && this.key_work_done===true)
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
            console.log("Hi this");
            //this.pause_option=!this.pause_option;
            if(this.pause_option===true)
            {
              this.pause_option=false;
              this.previous_key=e.key;
            }
            else
            {
              this.pause_option=true;
              this.previous_key=this.last_key;

            }

        }
        this.key_work_done=false;
      }
      else if(this.snakeArr.length>1 && this.key_work_done===true)
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
          if(this.pause_option===true)
          {
            this.pause_option=false;
            this.previous_key=e.key;
          }
          else
          {
            this.pause_option=true;
            this.previous_key=this.last_key;

          }
        }
        this.key_work_done=false;
      }
}


    
}
function Dialoge(Dialoge: any) {
  throw new Error('Function not implemented.');
}

function DialogExampleComponent(DialogExampleComponent: any) {
  throw new Error('Function not implemented.');
}

