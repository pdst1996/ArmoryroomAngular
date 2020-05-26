import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { PrincipalService } from "src/app/modules/principal/principal.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.scss"]
})
export class PrincipalComponent implements OnInit, OnDestroy {
  @ViewChild("modalCharg", { static: true }) charging: ModalDirective;
  @ViewChild("modalConfirm", { static: true }) confirm: ModalDirective;
  public serial_number: string;
  public part_number: string;
  public reference1: string;
  public RevList = [];
  private subscriptions: Array<Subscription>;

  constructor(private principalService: PrincipalService) {
    this.subscriptions = [];
  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.RevList.push(i);
    }
    const getTestSub: Subscription = this.principalService
      .getTest({ test: "test_get" })
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("Get Ok");
        }
      );

    const postTestSub: Subscription = this.principalService
      .postTest({ test: "test_post" })
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("Post Ok");
        }
      );

    this.subscriptions.push(getTestSub);
    this.subscriptions.push(postTestSub);
  }

  eventHandler(event) {
    if (event.keyCode === 13) {
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
