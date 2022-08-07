import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationModel } from '../../models/tabledata.model';

@Component({
  selector: 'app-wefox-table',
  templateUrl: './wefox-table.component.html',
  styleUrls: ['./wefox-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService],
})
export class WefoxTableComponent {
  @Input()
  locations: LocationModel[] = [];

  @Output()
  createLocation: EventEmitter<LocationModel> = new EventEmitter<LocationModel>();

  @Output()
  updateLocation: EventEmitter<LocationModel> = new EventEmitter<LocationModel>();

  @Output()
  removeLocation: EventEmitter<number | undefined> = new EventEmitter<
    number | undefined
  >();

  @Output()
  removeLocations: EventEmitter<(number | undefined)[]> = new EventEmitter<
    (number | undefined)[]
  >();

  location: LocationModel = new LocationModel();

  submitted: boolean = false;

  locationDialog: boolean = false;

  selectedLocations: LocationModel[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  openNew(): void {
    this.location = new LocationModel();
    this.submitted = false;
    this.locationDialog = true;
  }

  deleteSelectedLocations() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected locations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.locations = this.locations.filter(
          (val) => !this.selectedLocations.includes(val)
        );
        let ids = this.selectedLocations.map(({ id }) => id)!;
        this.removeLocations.emit(ids);
        this.selectedLocations = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Locations Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteLocation(location: LocationModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + location.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeLocation.emit(this.location.id);
        this.locations = this.locations.filter((val) => val.id !== location.id);
        this.location = new LocationModel();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location ' + location.title + ' deleted',
          life: 3000,
        });
      },
    });
  }

  editLocation(location: LocationModel) {
    this.location = { ...location };
    this.locationDialog = true;
  }

  hideDialog() {
    this.locationDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if (this.location.title.trim()) {
      if (this.location.id) {
        this.updateLocation.emit(this.location);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location Updated',
          life: 3000,
        });
      } else {
        this.createLocation.emit(this.location);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location Created',
          life: 3000,
        });
      }

      this.locations = [...this.locations];
      this.locationDialog = false;
      this.location = new LocationModel();
    }
  }
}
