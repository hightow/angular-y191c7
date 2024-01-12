import { Component } from '@angular/core';
import { Category, Price, Product } from './model';

@Component({
  selector: 'my-app',
  template: `
        <div style="background-color: gray; margin-bottom: 40px">
        Category-Filter:<kendo-dropdownlist class="form-control"
                                            [data]="categories"
                                            [value]="selectedCategory"
                                            (valueChange)="setSelectedCategory($event)"
                                            [valuePrimitive]="false">
                            <ng-template kendoDropDownListValueTemplate
                                            let-dataItem>
                                <span>{{dataItem.CategoryName}}</span>
                            </ng-template>
                            <ng-template kendoDropDownListItemTemplate
                                            let-dataItem>
                                <span>{{dataItem.CategoryName}}</span>
                            </ng-template>
                        </kendo-dropdownlist>
                        <div style="padding-top:10px">Selected Category: {{ selectedCategory.CategoryID }}</div>
                        
    </div>
        <kendo-grid [data]="filteredGridData">
            <kendo-grid-column field="ProductID" title="ID"> </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Name"> </kendo-grid-column>
            <kendo-grid-column field="Category.CategoryName" title="Category"> </kendo-grid-column>
            <kendo-grid-column field="UnitPrice" title="Price">
                <ng-template kendoGridCellTemplate let-data>
                    {{ data.UnitPrice }}
                    <kendo-dropdownlist
                                [data]="listItems"
                                [textField]="'betrag'"
                                [valueField]="'betrag'"
                                [valuePrimitive]="true"></kendo-dropdownlist>
                </ng-template>
            </kendo-grid-column>
        </kendo-grid>
    `,
})
export class AppComponent {
  public listItems: Price[] = [
    {
      betrag: 12,
      calculated: true,
    },
    {
      betrag: 17,
      calculated: true,
    },
    {
      betrag: 19,
      calculated: false,
    },
    {
      betrag: 22,
      calculated: true,
    },
  ];

  public categories: Category[] = [
    {
      CategoryName: 'All Categories',
    },
    {
      CategoryID: 1,
      CategoryName: 'Beverages',
    },
    {
      CategoryID: 2,
      CategoryName: 'Condiments',
    },
  ];

  public selectedCategory: Category = this.categories[0];

  setSelectedCategory(category: Category) {
    this.selectedCategory = category;
    if (this.selectedCategory.CategoryID) {
      this.filteredGridData = this.gridData.filter(
        (p) => p.Category.CategoryID === this.selectedCategory.CategoryID
      );
    } else {
      this.filteredGridData = [...this.gridData];
    }
  }

  public gridData: Product[] = [
    {
      ProductID: 1,
      ProductName: 'Chai',
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      ProductID: 2,
      ProductName: 'Chang',
      UnitPrice: 19,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      ProductID: 3,
      ProductName: 'Aniseed Syrup',
      UnitPrice: 10,
      Category: {
        CategoryID: 2,
        CategoryName: 'Condiments',
      },
    },
  ];

  public filteredGridData = this.gridData;
}
