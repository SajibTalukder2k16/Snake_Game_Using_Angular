import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {

  player_name:any
  constructor(private router:Router) { }

  ngOnInit(): void {

  }
  goToGame()
  {
    console.log(this.player_name);
    localStorage.setItem('player_name',JSON.stringify(this.player_name));
    this.router.navigate(['/snake'])
  }

}
