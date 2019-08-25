import { Component, OnInit } from '@angular/core';
import { TableInfoService } from 'src/app/services/table-info.service';

import { environment } from './../../../environments/environment';
import { TableInfos } from './../../interfaces/table-infos';

@Component({
  selector: 'app-table-infos',
  templateUrl: './table-infos.component.html',
  styleUrls: ['./table-infos.component.scss']
})
export class TableInfosComponent implements OnInit {

  /**
   * The Search query returned by the input
   */
  query: string;
  /**
   * The list of the items returned from the API
   */
  itemsList: Array<TableInfos>;
  /**
   * A copy of the returned values wich we apply the filters
   */
  items: Array<TableInfos>;
  /**
   * The item with highest "Hours studied" value
   */
  highestHoursItem;
  /**
   * The item with lowesst "Hours studied" value
   */
  lowestHoursItem;

  /**
   * @internal
   */
  constructor(
    private tableInfoService: TableInfoService,
  ) {
    this.tableInfoService
    .getInfos(environment.tableInfosUrl)
    .subscribe((res: TableInfos[]) => {
      this.itemsList = res;
      this.items = this.itemsList;
      this.listLowHighHours();
    });
  }

  /**
   * @internal
   */
  ngOnInit() {
    this.items = this.itemsList;
  }

  /**
   * Get the items with the lowest and highest "Hours studied" value
   */
  listLowHighHours() {
    this.sortData({
      active: 'hours_studied',
      direction: 'asc',
    }, false);
    this.lowestHoursItem = this.items[0];
    this.highestHoursItem = this.items[this.items.length - 1];
  }

  /**
   * Filter the items based on the string value from input
   * @param value The search query from input
   */
  filter(value: string) {
    this.items = this.itemsList.filter(item => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      );
    });
    this.listLowHighHours();
  }

  /**
   * Sort the items array
   * @param sort The object to sort
   * @param updateValues If is true, update the items based on sort
   */
  sortData(sort: object, updateValues = true) {
    const data = this.items.slice();
    if (!sort['active'] || sort['direction'] === '') {
      this.items = data;
      return;
    }
    if (!updateValues) {
      data.sort((a, b) => {
        return this.compare(a.hours_studied, b.hours_studied, true);
      });
    }

    this.items = data.sort((a, b) => {
      const isAsc = sort['direction'] === 'asc';
      switch (sort['active']) {
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'first': return this.compare(a.name['first'], b.name['first'], isAsc);
        case 'last': return this.compare(a.name['last'], b.name['last'], isAsc);
        case 'primary_group': return this.compare(a.primary_group, b.primary_group, isAsc);
        case 'phone': return this.compare(a.phone, b.phone, isAsc);
        case 'hours_studied': return this.compare(a.hours_studied, b.hours_studied, isAsc);
        default: return 0;
      }
    });
  }

  /**
   * An util function that compares two values
   * @param a the first value to compare
   * @param b the second value to compare
   * @param isAsc define if the order is 'asc' or 'desc'
   */
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
