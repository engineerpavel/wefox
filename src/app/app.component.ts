import { Component, OnInit } from '@angular/core';
import { CrudTableService } from './components/wefox-table/crud-table.service';
import { Observable } from 'rxjs';
import { LocationModel } from './models/tabledata.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  tableData: Observable<LocationModel[]> = new Observable<LocationModel[]>();

  constructor(private crudService: CrudTableService) {}

  ngOnInit() {
    this.tableData = this.crudService.getList();
  }
}
