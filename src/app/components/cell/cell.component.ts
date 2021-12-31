import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { StatoCella } from 'src/app/enums/stato-cella.enum';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

@Input('stato') stato:StatoCella;
public StateEnum = StatoCella

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
 }

}
