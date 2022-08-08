import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CrudTableService } from './components/wefox-table/crud-table.service';
import { first, Observable } from 'rxjs';
import { LocationModel } from './models/tabledata.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  tableData: Observable<LocationModel[]> = new Observable<LocationModel[]>();

  constructor(
    private crudService: CrudTableService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getLocations();
  }

  getLocations(): void {
    this.tableData = this.crudService.getList();
  }

  create(location: LocationModel): void {
    this.crudService
      .createItem(location)
      .pipe(first())
      .subscribe((res) => {
        this.getLocations();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location ' + res.title + ' created',
          life: 4000,
        });
      });
  }

  update(location: LocationModel): void {
    this.crudService
      .updateItem(location)
      .pipe(first())
      .subscribe((res) => {
        this.getLocations();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location ' + res.title + ' updated',
          life: 4000,
        });
      });
  }

  remove(id: string): void {
    this.crudService
      .removeItem(id)
      .pipe(first())
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location deleted',
          life: 4000,
        });
        this.getLocations();
      });
  }

  removeArr(ids: string[]): void {
    this.crudService
      .removeItems(ids)
      .pipe(first())
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Locations Deleted',
          life: 4000,
        });
        this.getLocations();
      });
  }
}
