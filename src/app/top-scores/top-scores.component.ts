import { Component, Inject, OnInit } from '@angular/core';
import { trigger,transition,style,animate } from '@angular/animations';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/compat';
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"; 


@Component({
  selector: 'app-top-scores',
  templateUrl: './top-scores.component.html',
  styleUrls: ['./top-scores.component.css'],
})
export class TopScoresComponent implements OnInit {
  db = getFirestore();


  items: Observable<any[]>;
  

  constructor(@Inject(MAT_DIALOG_DATA)public data:Array<number>,firestore: AngularFirestore) {

    
    this.items = firestore.collection('scores').valueChanges()

    console.log("Sajib",this.items);
    /*
    // Add a new document in collection "cities"
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
   }

  ngOnInit(): void {
    
  }

}
