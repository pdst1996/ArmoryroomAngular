import { Component, OnInit, ElementRef } from '@angular/core';
import { Notify } from 'src/app/modules/notify/notify';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { PartNumber } from 'src/app/models/part-number/part-number.model';
import { Tooling, EspecificDataTool } from 'src/app/models/tooling/tooling.model';

@Component({
  selector: 'app-tooling-partnumber',
  templateUrl: './tooling-partnumber.component.html',
  styleUrls: ['./tooling-partnumber.component.css']
})
export class ToolingPartnumberComponent implements OnInit {

  public partNumber:number;
  public elements:EspecificDataTool[];
  public partNumbers:PartNumber[];
  public elementsSelected:string[];
  public radioModel = 'partNumberMode';
  public txtElementsToSave = '';
  public tooling:number;
  public elementsToInsert:string;
  public toolings:Tooling[];
  public loader: any;
  constructor(private toolingService: ToolingService, private notify: Notify, private elementRef : ElementRef) { }

  ngOnInit() {
    this.partNumber=0;
    this.tooling=0;
    this.elementsSelected = new Array<string>();
    this.getCounterMask();
    this.getPartNumbers();
  }

  cleanFields(){
    this.txtElementsToSave = ''; 
    this.elementsSelected = new Array<string>();
    this.elements = new Array<EspecificDataTool>();
    this.partNumber=0;
    this.tooling=0;
  }

  getPartNumbers(){
    this.toolingService.getPartNumbers().subscribe(partNumbers =>{
      this.partNumbers = partNumbers;
    });
  }

  getCounterMask(){
    this.toolingService.getCounterMask().subscribe(CounterMasks =>{
      this.toolings = new Array<Tooling>();
      this.toolings = CounterMasks;
    });
  }

  fillToolingsByPartNumber(){
    this.loader = this.notify.setLoading("Llenando herramentales",this.loader);
    this.toolingService.findToolingsByPartNumber(this.partNumber).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  fillPartNumbersByTooling(){
    this.loader = this.notify.setLoading("Llenando numeros de parte",this.loader);
    this.toolingService.findPartNumbersByTooling(this.tooling).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  insertElements(){
    this.elementsToInsert = this.txtElementsToSave.trim().replace(/\r?\n/g,",");
    this.loader = this.notify.setLoading(`Insertando ${(this.radioModel=="partNumberMode")?' contramascaras':' numeros de parte'}`,this.loader);
    
    if(this.radioModel=="partNumberMode"){
      this.toolingService.insertToolingsToPartNumber(this.partNumber,this.elementsToInsert).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        if(results.data.aceptados.length!=0){
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator + "\n","");
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator,"");
          }
          this.fillToolingsByPartNumber();
        }
        if(results.data.rechazados.length!=0){
          this.notify.setNotification("Erroneas","Las contramascaras del recuadro fueron rechazadas","error");
          this.elementRef.nativeElement.querySelector("#txtElements").focus();
        }
      });
    }
    else
    {
      this.toolingService.insertPartNumbersToTooling(this.tooling,this.elementsToInsert).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        if(results.data.aceptados.length!=0){
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator + "\n","");
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator,"");
          }
          this.fillPartNumbersByTooling();
        }
        if(results.data.rechazados.length!=0){
          this.notify.setNotification("Erroneas","Los numeros de narte del recuadro fueron rechazados","error");
          this.elementRef.nativeElement.querySelector("#txtElements").focus();
        }
      });
    }
  }

  deleteElements(){
    this.loader = this.notify.setLoading(`Eliminando ${(this.radioModel=="partNumberMode")?' herramantales':' numeros de parte'}`,this.loader);
    if(this.radioModel=="partNumberMode") {
      this.toolingService.deleteToolingFromPartNumber(this.partNumber,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.fillToolingsByPartNumber();
      })
    }
    else{
      this.toolingService.deletePartNumbersFromTooling(this.tooling,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.fillPartNumbersByTooling();
      })
    }
    
  }
}