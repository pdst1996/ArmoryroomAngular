import { Component, OnInit, ElementRef } from '@angular/core';
import { Notify } from 'src/app/modules/notify/notify';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { PartNumber } from 'src/app/models/part-number/part-number.model';
import { Tooling, EspecificDataTool } from 'src/app/models/tooling/tooling.model';
import { Station } from 'src/app/models/stations/stations.model';
import { ApplicationData } from 'src/app/models/home/home.model';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Constants } from 'src/app/helpers/constats';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  public tooling:FormControl = new FormControl();
  public toolingFilterCtrl: FormControl = new FormControl();
  public toolingsFiltered: ReplaySubject<Tooling[]> = new ReplaySubject<Tooling[]>(1);
  public elementsToInsert:string;
  public toolings:Tooling[];
  applicationData: ApplicationData;
  public loader: any;
  private _onDestroy = new Subject<void>();
  constructor(private toolingService: ToolingService, private notify: Notify, private elementRef : ElementRef, private historyService : HistoryService) { }

  ngOnInit() {
    this.station=0;
    this.tooling = new FormControl();
    this.elementsSelected = new Array<string>();
    this.getCounterMask();
    this.getStations();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
  }

  cleanFields(){
    this.txtElementsToSave = ''; 
    this.elementsSelected = new Array<string>();
    this.elements = new Array<EspecificDataTool>();
    this.station=0;
    this.tooling = new FormControl();
  }

  getStations(){
    this.toolingService.findStations().subscribe(stations =>{
      this.stations = stations.data;
    });
  }

  getCounterMask(){
    this.toolings = new Array<Tooling>();
    this.toolingsFiltered = new ReplaySubject<Tooling[]>(1);
    this.toolingService.getCounterMask().subscribe(results =>{
      this.toolings = results;

      this.toolingsFiltered.next(this.toolings.slice());
      this.toolingFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterToolings();
        });
    });
  }

  fillToolingsByStation(){
    this.loader = this.notify.setLoading("Llenando herramentales",this.loader);
    this.toolingService.findToolingsByStation(this.station).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  private filterToolings() {
    if (!this.toolings) {
      return;
    }
    let search = this.toolingFilterCtrl.value;
    if (!search) {
      this.toolingsFiltered.next(this.toolings.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.toolingsFiltered.next(
      this.toolings.filter(tool => tool.tooling.toLowerCase().indexOf(search) > -1)
    );
  }

  fillStationsByTooling(){
    this.loader = this.notify.setLoading("Llenando estaciones",this.loader);
    this.toolingService.findStationsByTooling(this.tooling.value).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  insertElements(){
    this.elementsToInsert = this.txtElementsToSave.trim().replace(/\r?\n/g,",");
    this.loader = this.notify.setLoading(`Insertando ${(this.radioModel=="stationMode")?' herramentales':' estaciones'}`,this.loader);
    
    if(this.radioModel=="stationMode"){
      this.toolingService.insertToolingsToStation(this.station,this.elementsToInsert).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        if(results.data.aceptados.length!=0){
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator + "\n","");
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator,"");
          }
          this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le agregó los herramentales (${this.elementsToInsert}) a la estacion (${this.station})`);
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
      this.toolingService.insertStationsToTooling(this.tooling.value,this.elementsToInsert).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        if(results.data.aceptados.length!=0){
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator + "\n","");
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator,"");
          }
          this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le agregó las estaciones (${this.elementsToInsert}) al herramental (${this.tooling})`);
          this.fillStationsByTooling();
        }
        if(results.data.rechazados.length!=0){
          this.notify.setNotification("Erroneas","Las estaciones del recuadro fueron rechazadas","error");
          this.elementRef.nativeElement.querySelector("#txtElements").focus();
        }
      });
    }
  }

  deleteElements(){
    this.loader = this.notify.setLoading(`Eliminando ${(this.radioModel=="stationMode")?' herramantales':' estaciones'}`,this.loader);
    if(this.radioModel=="stationMode") {
      this.toolingService.deleteToolingFromStation(this.station,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.fillToolingsByStation();
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le quitó los herramentales (${this.elementsSelected}) a la estación (${this.station})`);
      })
    }
    else{
      this.toolingService.deleteStationsFromTooling(this.tooling.value,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.fillStationsByTooling();
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le quitó las estaciones (${this.elementsSelected}) al herramental (${this.tooling.value})`);
      })
    }
    
  }
}
