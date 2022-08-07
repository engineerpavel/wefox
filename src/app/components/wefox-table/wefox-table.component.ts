import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
        this.locations = this.locations.filter((val) => val.id !== location.id);
        this.location = new LocationModel();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Location deleted',
          life: 3000,
        });
      },
    });
  }
}
