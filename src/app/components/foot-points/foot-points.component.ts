import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-foot-points',
  templateUrl: './foot-points.component.html',
  styleUrls: ['./foot-points.component.scss'],
})
export class FootPointsComponent implements OnInit {
  @Input() listpunts:any;

  constructor() { }

  ngOnInit() {
    document.getElementById('a').style.background='#ff0000'
    if(this.listpunts==1){
      document.getElementById('a').style.background='#ff0000';
    }
  }

}
