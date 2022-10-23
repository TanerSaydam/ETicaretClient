import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListProductImage } from 'src/app/contracts/list-product-image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialogs } from '../base/base-dialogs';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialogs<SelectProductImageDialogComponent> implements OnInit {  

    constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private _product:ProductService,
    private _dialog: DialogService
  ){
    super(dialogRef)
  }

  images: ListProductImage[];

  async ngOnInit() {
    this.getList();
  }

  async getList(){
    this.images = await this._product.readImages(this.data as string, ()=> {

    });
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini seçin ya da sürükleyin",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }

  async deleteImage(imageId: string, event: any){
    this._dialog.openDialog({      
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,      
      afterClosed: async ()=>{
        await this._product.deleteImage(this.data as string,imageId, ()=> {     
          // var card = document.getElementById(`card-${imageId}`);
          // card.remove();
          this.getList();
        });
      }
    })    
  }
}

export enum SelectProductImageState{
  Close
}
