import { Component, OnInit, ElementRef } from '@angular/core';
import { Notify } from 'src/app/modules/notify/notify';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { PartNumber, PartNumber42q } from 'src/app/models/part-number/part-number.model';
import { Tooling, EspecificDataTool } from 'src/app/models/tooling/tooling.model';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Constants } from 'src/app/helpers/constats';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Project } from 'src/app/models/project/project.model';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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
  public tooling:FormControl = new FormControl();
  public toolingFilterCtrl: FormControl = new FormControl();
  public toolingsFiltered: ReplaySubject<Tooling[]> = new ReplaySubject<Tooling[]>(1);
  public elementsToInsert:string;
  public toolings:Tooling[];
  applicationData: ApplicationData;
  public loader: any;
  projects : Project[];
  public projectSelected : number = 0;
  public projectSelected2 : number = 0;
  partNumbersUniversal : PartNumber42q[];
  public partNumberSelected: FormControl = new FormControl();
  public partNumbersFilterCtrl: FormControl = new FormControl();
  public partNumbersFiltered: ReplaySubject<PartNumber42q[]> = new ReplaySubject<PartNumber42q[]>(1);
  private _onDestroy = new Subject<void>();
  public notifyLoading : any;

  constructor(private toolingService: ToolingService, private notify: Notify, private elementRef : ElementRef, private historyService : HistoryService) { }

  ngOnInit() {
    this.partNumber=0;
    this.elementsSelected = new Array<string>();
    this.getCounterMask();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    this.getAllProjects();
  }

  cleanFields(){
    this.txtElementsToSave = ''; 
    this.elementsSelected = new Array<string>();
    this.elements = new Array<EspecificDataTool>();
    this.partNumber=0;
    this.tooling=new FormControl();
    this.partNumberSelected = new FormControl();
    this.getCounterMask();
  }

  getAllProjects(){
    this.toolingService.findAllProjects().subscribe(pprojects =>{
      this.projects = pprojects;
    });
  }

  getPartNumbersByProject(){
    this.partNumbersUniversal = new Array<PartNumber42q>();
    this.partNumbersFiltered = new ReplaySubject<PartNumber42q[]>(1);
    this.notifyLoading = this.notify.setLoading("Cargando numeros de parte", this.notifyLoading);
    this.toolingService.getPartNumbersByProject42q(this.projectSelected).subscribe(results =>{
      this.partNumbersUniversal = results.data;
      this.notifyLoading = this.notify.setLoadingDone("Listo", this.notifyLoading);

      this.partNumbersFiltered.next(this.partNumbersUniversal.slice());
      this.partNumbersFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterPartNumbers();
        });
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

  private filterPartNumbers() {
    if (!this.partNumbersUniversal) {
      return;
    }
  
    let search = this.partNumbersFilterCtrl.value;
    if (!search) {
      this.partNumbersFiltered.next(this.partNumbersUniversal.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    
    this.partNumbersFiltered.next(
      this.partNumbersUniversal.filter(part => part.part_number.toLowerCase().indexOf(search) > -1)
    );
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
 
  fillToolingsByPartNumber(){
    this.loader = this.notify.setLoading("Llenando herramentales",this.loader);
    this.toolingService.findToolingsByPartNumber(this.partNumberSelected.value).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  fillPartNumbersByTooling(){
    this.loader = this.notify.setLoading("Llenando numeros de parte",this.loader);
    this.toolingService.findPartNumbersByTooling(this.tooling.value).subscribe(results=>{
      this.elements = results.data;
      this.loader = this.notify.setLoadingDone("Completado",this.loader);
    })
  }

  insertElements(){
    this.elementsToInsert = this.txtElementsToSave.trim().replace(/\r?\n/g,",");
    this.loader = this.notify.setLoading(`Insertando ${(this.radioModel=="partNumberMode")?' contramascaras':' numeros de parte'}`,this.loader);
    
    if(this.radioModel=="partNumberMode"){
      this.toolingService.insertToolingsToPartNumber(this.partNumberSelected.value,this.elementsToInsert, this.projectSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        console.log(results)
        if(results.data.aceptados.length!=0){
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator + "\n","");
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator,"");
          }
          this.fillToolingsByPartNumber();
          this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le agregó los herramentales (${this.elementsToInsert}) al numero de parte (${this.partNumber})`);
        }
        if(results.data.rechazados.length!=0){
          this.notify.setNotification("Erroneas","Las contramascaras del recuadro fueron rechazadas","error");
          this.elementRef.nativeElement.querySelector("#txtElements").focus();
        }
      });
    }
    else
    {
      this.toolingService.insertPartNumbersToTooling(this.tooling.value,this.elementsToInsert, this.projectSelected2).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        if(results.data.aceptados.length!=0){
          let aux = new Array<string>();
          aux = results.data.aceptados;
          for (const iterator of aux) {
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator + "\n","");
            this.txtElementsToSave = this.txtElementsToSave.replace(iterator,"");
          }
          this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le agregó los numeros de parte(${this.elementsToInsert}) al herramental (${this.tooling})`);
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
      this.toolingService.deleteToolingFromPartNumber(this.partNumberSelected.value,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le quitó (${this.elementsSelected}) al numero de parte (${this.partNumber})`);
        this.fillToolingsByPartNumber();
      })
    }
    else{
      this.toolingService.deletePartNumbersFromTooling(this.tooling.value,this.elementsSelected).subscribe(results=>{
        this.loader = this.notify.setLoadingDone("Completado",this.loader);
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Le quitó (${this.elementsSelected}) al herramental (${this.tooling})`);
        this.fillPartNumbersByTooling();
      })
    }
    
  }
}
