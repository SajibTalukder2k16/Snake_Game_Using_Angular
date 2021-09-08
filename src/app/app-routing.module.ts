import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnakeComponent } from './snake/snake.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {
    path:'',
    component:PlayerComponent,
  },
  {
    path:'snake',
    component:SnakeComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

