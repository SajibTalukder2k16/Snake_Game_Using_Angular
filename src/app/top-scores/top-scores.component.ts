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

  items: any;
  //items: Observable<any[]>;
  

  constructor(@Inject(MAT_DIALOG_DATA)public data:Array<number>,private db: AngularFirestore,firestore: AngularFirestore) {

    //this.items = firestore.collection('scores').valueChanges()
    /*
    firestore.collection('scores').valueChanges()._subscribe((result:any)=>{
      console.log(result);
    })
    //console.log("Sajib",this.items);
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

    this.db.collection('scores').valueChanges().subscribe(val => {
         //console.log("Talukder",val);
         this.items=val;
         this.foo();
         //let ara = val;
         //console
    });
    
    //console.log("Sajib ",out);
  }
  foo()
  {
    if(this.items?.length>0)
    {
      //console.log(this.items)
    }
  }

}
