import { Pipe, PipeTransform } from "@angular/core";
import { Menu } from "src/app/models/home/home.model";

@Pipe({
  name: "filterMenu",
  pure: false
})
export class FilterMenuPipe implements PipeTransform {
  transform(array: Menu[], field: number): any[] {
    return array.filter(item => {
      let idFatherMenu = 0;
      if (item.idFatherMenu != null) {
        idFatherMenu = item.idFatherMenu;
      }
      if (field !== 0 && item.idFatherMenu !== 0) {
        if (item.idFatherMenu === field) {
          idFatherMenu = item.idFatherMenu;
        }
      }
      return idFatherMenu === field;
    });
  }
}
