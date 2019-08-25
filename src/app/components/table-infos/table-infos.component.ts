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

  query: string;
  itemsList: Array<TableInfos>;
  items: Array<TableInfos>;

  constructor(
    private tableInfoService: TableInfoService,
  ) {
    this.tableInfoService.getInfos(environment.tableInfosUrl).subscribe((res: TableInfos[]) => {
      console.log('res => ', res);
      this.itemsList = res;
      this.items = this.itemsList;
    });
  }

  ngOnInit() {
    this.items = this.itemsList;
  }

  filter(value: string) {
    this.items = this.itemsList.filter(item => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      );
    });
  }

}
