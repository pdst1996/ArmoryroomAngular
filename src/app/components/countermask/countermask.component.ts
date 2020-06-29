import { Component, OnInit, ElementRef } from '@angular/core';

import { CountermaskService } from 'src/app/modules/countermask/countermask.service';
import { CounterMask,PartNumber,CounterMaskData } from '../../models/countermask/countermask.model'
import { Notify } from 'src/app/modules/notify/notify';
@Component({
  selector: 'app-countermask',
  templateUrl: './countermask.component.html',
  styleUrls: ['./countermask.component.css']
})
export class CountermaskComponent implements OnInit {

  public pNParte:number;
  public txtAfill:CounterMaskData[];
  public PartNumbers:PartNumber[];
  public ngtxtAfill:string[];
  public PartNumber:PartNumber;
  public bVisibleNP = 'npdiv';
  public textValue = '';
  public pkCMask:number;
  public ValueContent:string;
  public ValuestoDelete:string;

  public nCounterMasks:CounterMask[];
  public CounterMask: CounterMask;
  public Loader: any;
  constructor(private countermaskService: CountermaskService,private notify: Notify, private elementRef : ElementRef) { }

  ngOnInit() {
    this.pNParte=0;
    this.pkCMask=0;
    this.ngtxtAfill = new Array<string>();
    this.getCounterMask();
    this.getPartNumbers();
  }

  cleanFields(){
    this.textValue = ''; 
    this.ngtxtAfill = new Array<string>();
    this.txtAfill = new Array<CounterMaskData>();
    this.pNParte=0;
    this.pkCMask=0;
  }

  getPartNumbers(){
    this.countermaskService.getPartNumbers().subscribe(PartNumbers =>{
      this.PartNumbers = PartNumbers;
    });
  }
  getCounterMask(){
    this.countermaskService.getCounterMask().subscribe(CounterMasks =>{
      this.nCounterMasks = new Array<CounterMask>();
      // for(const iterator of CounterMasks)
      //   if(iterator.fkType.pktype==5)
      //     this.nCounterMasks.push(iterator);
      this.nCounterMasks = CounterMasks;
    });
  }
  mFillCMPN()
  {
    this.Loader = this.notify.setLoading("Llenando ContraMascaras",this.Loader);
    this.countermaskService.findCounterMaskByPartNumber(this.pNParte).subscribe(results=>{
      let data = results.data;
      this.txtAfill = new Array<CounterMaskData>();
      this.txtAfill = data;
     
      console.log(data);
      this.Loader = this.notify.setLoadingDone("Completado",this.Loader);
    })
  }
  mFillPNCM()
  {
    this.Loader = this.notify.setLoading("Llenando Numeros de Parte",this.Loader);
    this.countermaskService.findPartNumberByCounterMask(this.pkCMask).subscribe(results=>{
      let data = results.data;
      this.txtAfill = new Array<CounterMaskData>();
      this.txtAfill = data;
     
      console.log(data);
      this.Loader = this.notify.setLoadingDone("Completado",this.Loader);
    })
  }
  mInsert()
  {
    this.ValueContent= this.textValue.trim().replace(/\r?\n/g,",");
    this.Loader = this.notify.setLoading(`Insertando ${(this.bVisibleNP=="npdiv")?' contramascaras':' numeros de parte'}`,this.Loader);
    if(this.bVisibleNP=="npdiv")
    {
      this.countermaskService.insertCounterMaskToPartNumber(this.pNParte,this.ValueContent).subscribe(results=>{
        this.Loader = this.notify.setLoadingDone("Completado",this.Loader);
        
        if(results.data.aceptados.length!=0)
        {
          
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.textValue = this.textValue.replace(iterator + "\n","");
            this.textValue = this.textValue.replace(iterator,"");
           
          }
          this.mFillCMPN();
        }
        if(results.data.rechazados.length!=0)
        {
          this.notify.setNotification("Erroneas","Las contramascaras del recuadro fueron rechazadas","error");
          this.elementRef.nativeElement.querySelector("#txtElements").focus();
        }
      })
      
    }
    else
    {
      this.countermaskService.insertPartNumbersToCounterMask(this.pkCMask,this.ValueContent).subscribe(results=>{
        this.Loader = this.notify.setLoadingDone("Completado",this.Loader);
        if(results.data.aceptados.length!=0)
        {
          
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.textValue = this.textValue.replace(iterator + "\n","");
            this.textValue = this.textValue.replace(iterator,"");
           
          }
          this.mFillPNCM();
        }
        if(results.data.rechazados.length!=0)
        {
          this.notify.setNotification("Erroneas","Los numeros de narte del recuadro fueron rechazados","error");
          this.elementRef.nativeElement.querySelector("#txtElements").focus();
        }
      })
    }
         
  }
  mDelete()
  {
    this.ValuestoDelete="";
 
   
    
    this.Loader = this.notify.setLoading(`Eliminando ${(this.bVisibleNP=="npdiv")?'ContraMascaras':'Numeros de Parte'}`,this.Loader);
    if(this.bVisibleNP=="npdiv")
    {
      
      this.countermaskService.deleteCounterMasksFromPartNumber(this.pNParte,this.ngtxtAfill).subscribe(results=>{
        this.Loader = this.notify.setLoadingDone("Completado",this.Loader);
        this.mFillCMPN();
      })
      
    }
    else
    {
      this.countermaskService.deletePartNumbersFromCounterMask(this.pkCMask,this.ngtxtAfill).subscribe(results=>{
        this.Loader = this.notify.setLoadingDone("Completado",this.Loader);
        this.mFillPNCM();
      })
    }
    
  }
}
