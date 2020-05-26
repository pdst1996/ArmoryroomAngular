import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
  pure: false
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    if (array) {
      array.sort((a: any, b: any) => {
        if (parseInt(a[field]) < parseInt(b[field])) {
          return -1;
        } else if (parseInt(a[field]) > parseInt(b[field])) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    } else {
      return [];
    }
  }
}
