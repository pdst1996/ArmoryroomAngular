import { Component, OnInit, ElementRef } from '@angular/core';
import { Notify } from 'src/app/modules/notify/notify';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { PartNumber } from 'src/app/models/part-number/part-number.model';
import { Tooling, EspecificDataTool } from 'src/app/models/tooling/tooling.model';
import { Station } from 'src/app/models/stations/stations.model';

@Component({
  selector: 'app-tooling-stations',
  templateUrl: './tooling-stations.component.html',
  styleUrls: ['./tooling-stations.component.css']
})
export class ToolingStationsComponent implements OnInit {

  public station:number;
  public elements:EspecificDataTool[];
  public stations:Station[];
  public elementsSelected:string[];
  public radioModel = 'stationMode';
  public txtElementsToSave = '';
  public tooling:number;
  public elementsToInsert:string;
  public toolings:Tooling[];
  public loader: any;
  constructor(private toolingService: ToolingService, private notify: Notify, private elementRef : ElementRef) { }

  ngOnInit() {
    this.station=0;
    this.tooling=0;
    this.elementsSelected = new Array<string>();
    this.getCounterMask();
    this.getStations();
  }

  cleanFields(){
    this.txtElementsToSave = ''; 
    this.elementsSelected = new Array<string>();
    this.elements = new Array<EspecificDataTool>();
    this.station=0;
    this.tooling=0;
  }

  getStations(){
    this.toolingService.findStations().subscribe(stations =>{
      this.stations = stations.data;
    });
  }

  getCounterMask(){
    this.toolingService.getCounterMask().subscribe(CounterMasks =>{
      this.toolings = new Array<Tooling>();
      this.toolings = CounterMasks;
    });
  }

  fillToolingsByStation(){
    this.loader = this.notify.setLoading("Llenando herramentales",this.loader);
    this.toolingService.findToolingsByStation(this.station).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  fillStationsByTooling(){
    this.loader = this.notify.setLoading("Llenando estaciones",this.loader);
    this.toolingService.findStationsByTooling(this.tooling).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  insertElements(){
    this.elementsToInsert = this.txtElementsToSave.trim().replace(/\r?\n/g,",");
    this.loader = this.notify.setLoading(`Insertando ${(this.radioModel=="stationMode")?' contramascaras':' numeros de parte'}`,this.loader);
    
    if(this.radioModel=="stationMode"){
      this.toolingService.insertToolingsToPartNumber(this.station,this.elementsToInsert).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        if(results.data.aceptados.length!=0){
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator + "\n","");
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator,"");
          }
          this.fillToolingsByStation();
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
          this.fillStationsByTooling();
        }
        if(results.data.rechazados.length!=0){
          this.notify.setNotification("Erroneas","Los numeros de narte del recuadro fueron rechazados","error");
          this.elementRef.nativeElement.querySelector("#txtElements").focus();
        }
      });
    }
  }

  deleteElements(){
    this.loader = this.notify.setLoading(`Eliminando ${(this.radioModel=="stationMode")?' herramantales':' numeros de parte'}`,this.loader);
    if(this.radioModel=="stationMode") {
      this.toolingService.deleteToolingFromPartNumber(this.station,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.fillToolingsByStation();
      })
    }
    else{
      this.toolingService.deletePartNumbersFromTooling(this.tooling,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.fillStationsByTooling();
      })
    }
    
  }
}
