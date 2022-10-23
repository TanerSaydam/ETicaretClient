import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare let $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  productList: List_Product[] = [];
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', "updatedDate", "ptohos","edit","delete"];
  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    private _product: ProductService,
    private _alertify: AlertifyService,
    private _dialog: DialogService
  ){}

  async ngOnInit() {
   await this.getProducts();
  }

  async getProducts(){

    const products = await this._product.read(this.paginator ? this.paginator.pageIndex: 0, this.paginator? this.paginator.pageSize: 5, ()=> {      
    }, (err)=> {this._alertify.message(err, {
      dismissOthers: true,
      position: Position.TopRight,
      messageType: MessageType.Error
    })})

    this.dataSource = new MatTableDataSource<List_Product>(products.products);
    this.paginator.length = products.totalCount;
    
  }

  pageChanged(){
    this.getProducts();
  }

  addProductImages(id: string){
    this._dialog.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1400px"
      }
    })
  }
}