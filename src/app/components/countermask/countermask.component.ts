import { Component, OnInit } from '@angular/core';

import { CountermaskService } from 'src/app/modules/countermask/countermask.service';
import { CounterMask,PartNumber } from '../../models/countermask/countermask.model'
@Component({
  selector: 'app-countermask',
  templateUrl: './countermask.component.html',
  styleUrls: ['./countermask.component.css']
})
export class CountermaskComponent implements OnInit {

  public pNParte:number;
  public PartNumbers:PartNumber[];
  
  public PartNumber:PartNumber;
  public bVisibleNP = "npdiv";
  public textValue = '';
  public pkCMask:number;
  public ValueContent:string[];
  public nCounterMasks:CounterMask[];
  public CounterMask: CounterMask;
  constructor(private projectService: CountermaskService) { }

  ngOnInit() {
    this.pNParte=0;
    this.getCounterMask();
    this.getPartNumbers();
   
  }
  getPartNumbers(){
    this.projectService.getPartNumbers().subscribe(PartNumbers =>{
      this.PartNumbers = PartNumbers;
    });
  }
  getCounterMask(){
    this.projectService.getCounterMask().subscribe(CounterMasks =>{
      this.nCounterMasks = new Array<CounterMask>();
      for(const iterator of CounterMasks)
      {
        if(iterator.fkType.pktype==5)
        {
          this.nCounterMasks.push(iterator);
      
        }
      }
   
      console.log(CounterMasks)
    });
  }
  mInsert(value: string)
  {
    this.ValueContent = value.split('\n');
    for(const iterator of this.ValueContent)
    {
     
      alert(iterator);  
       
    }
    
  }
}
