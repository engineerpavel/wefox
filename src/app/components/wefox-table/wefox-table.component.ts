import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocationModel} from '../../models/tabledata.model';

@Component({
  selector: 'app-wefox-table',
  templateUrl: './wefox-table.component.html',
  styleUrls: ['./wefox-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WefoxTableComponent {
  @Input()
  locations: LocationModel[] = [];

  @Output()
  createLocation: EventEmitter<LocationModel> = new EventEmitter<LocationModel>();

  @Output()
  updateLocation: EventEmitter<LocationModel> = new EventEmitter<LocationModel>();

  @Output()
  removeLocation: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  removeLocations: EventEmitter<string[]> = new EventEmitter<string[]>();

  location: LocationModel = new LocationModel();

  submitted: boolean = false;

  locationDialog: boolean = false;

  selectedLocations: LocationModel[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

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
        let ids = this.selectedLocations.map(({id}) => id);
        this.removeLocations.emit(ids);
        this.selectedLocations = [];
      },
    });
  }

  deleteLocation(location: LocationModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + location.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeLocation.emit(location.id);
        this.location = new LocationModel();
      },
    });
  }

  editLocation(location: LocationModel) {
    this.location = {...location};
    this.locationDialog = true;
  }

  hideDialog() {
    this.locationDialog = false;
    this.submitted = false;
  }

  showDetails() {

  }

  saveLocation() {
    this.submitted = true;
    if (this.location.title.trim()) {
      if (this.location.id) {
        this.updateLocation.emit(this.location);
      } else {
        this.createLocation.emit(this.location);
      }

      this.locations = [...this.locations];
      this.locationDialog = false;
      this.location = new LocationModel();
    }
  }
}
