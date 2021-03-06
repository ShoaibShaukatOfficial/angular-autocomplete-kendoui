import { Component, ViewChild } from '@angular/core';
import {
  AutoCompleteComponent,
  VirtualizationSettings
} from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'my-app',
  template: `
    <h4>Kendo UI Auto Complete with 5K Items</h4>
    <kendo-autocomplete
      #autocomplete
      [data]="data"
      [filterable]="true"
      (filterChange)="handleFilter($event)"
      [virtual]="virtual"
    >
      <ng-template kendoAutoCompleteItemTemplate let-dataItem>
        <div>
          <span>
            <b>Name: </b>
            <span [innerHTML]="dataItem.Name"> </span>
          </span>
          <span>
            <b>Group Name: </b>
            <span [innerHTML]="dataItem.CarrierName"> </span>
          </span>
          <span>
            <b>MerchantName #: </b>
            <span [innerHTML]="dataItem.MerchantName"> </span>
          </span>
        </div>
      </ng-template>
    </kendo-autocomplete>
  `
})
export class AppComponent {
  public virtual: VirtualizationSettings = {
    itemHeight: 50,
    pageSize: 10
  };
  public source: Array<any> = [];
  public data: Array<string>;

  constructor() {
    this.generateData(5000);
    this.data = this.source.slice();
  }

  generateData(size: number) {
    this.data = [];
    for (let i = 0; i < size; i++) {
      this.source.push({
        CompanyId: i,
        GroupId: i,
        MerchantId: i,
        GroupName: ' Random Group' + i,
        MerchantName: 'Random Merchant' + i,
        Name: 'Name' + i
      });
    }
  }
  handleFilter(value) {
    this.data = this.source.filter(
      o =>
        o.Name.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        o.GroupName.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()) ||
        o.MerchantName.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
    );
  }
}
