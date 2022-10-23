import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private _http: HttpClientService,
    private _alertify: AlertifyService,
    private _dialog: MatDialog
  ) { }
  

  public files: NgxFileDropEntry[] = [];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {   

    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File)=> {
          fileData.append(_file.name, _file, file.relativePath);
      })
    }

    this.openDialog(()=> {
      this._http.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers:new HttpHeaders({"responseType": "blob"})
      }, fileData).subscribe({
        next: (res)=> {          
          this._alertify.message("Dosyalar başarıyla yüklendi", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight            
          })
        },
        error: (err: HttpErrorResponse)=> {
          console.log(err);
          
          this._alertify.message(err.error, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          })
        }
      })
    })
   
  }

  openDialog(afterClose: any): void {
    const dialogRef = this._dialog.open(FileUploadDialogComponent, {
      width: '450px',
      data: FileUploadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == FileUploadDialogState.Yes) {
       afterClose();
      }      
    });
  }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
