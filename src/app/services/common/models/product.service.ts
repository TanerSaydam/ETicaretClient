import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListProductImage } from 'src/app/contracts/list-product-image';
import { List_Product } from 'src/app/contracts/list_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private _client: HttpClientService
  ) { }

  create(product: Create_Product, callBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this._client.post({
      controller: "products"
    }, product).subscribe({
      next: (res) => { callBack(); },
      error: (err: HttpErrorResponse) => {
        const _err: Array<{ key: string, value: Array<string> }> = err.error;
        let message = "";
        _err.forEach(element => {
          element.value.forEach((x, index) => {
            message += `${x}<br>`;
          });
        });
        errorCallBack(message);
      }
    })
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number, products: List_Product[] }> = this._client.get<{ totalCount: number, products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(() => successCallBack())
      .catch((err: HttpErrorResponse) => errorCallBack(err.message));

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this._client.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallBack? :()=> void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this._client.get<ListProductImage[]>({
      action: "getProductImages",
      controller: "products",
    }, id);

    const images: ListProductImage[] = await firstValueFrom(getObservable);
    successCallBack();

    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack: ()=> void){
    const deleteObservable = this._client.delete({
      action: "deleteProductImage",
      controller: "products",
      queryString: `imageId=${imageId}`
    },id);

    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}
