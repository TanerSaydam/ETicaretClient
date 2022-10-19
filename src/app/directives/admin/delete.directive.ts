import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Input("appDelete") id: string = "";
  @Input() controller: string = "";
  @Output() callback = new EventEmitter<any>();
  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _http: HttpClientService,    
    public dialog: MatDialog,
    private _alertify: AlertifyService
  ) { 

    const icon = _renderer.createElement("i");
    icon.setAttribute("class", "fa fa-trash");    

    const button = _renderer.createElement("button");
    button.setAttribute("class", "btn btn-outline-danger btn-sm")
    button.setAttribute("style", "cursor: pointer;") 

    _renderer.appendChild(button,icon);

    _renderer.appendChild(_element.nativeElement, button);
  }

  @HostListener("click")
  onclick(){       
   this.openDialog(async ()=>{
      this._http.delete({
        controller: this.controller
      },this.id).subscribe(
        ()=> {
        this.callback.emit(true);
        this._alertify.message("Ürün başarıyla silindi.", {
          dismissOthers: true,
          messageType: MessageType.Warning,
          position: Position.TopRight
        })
      },
      (err: HttpErrorResponse)=>{
        this._alertify.message(err.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      });
    });    
  }

  openDialog(afterClose: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
       afterClose();
      }      
    });
  }

}



