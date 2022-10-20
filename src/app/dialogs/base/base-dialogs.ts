import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialogs<DialogComponent> {

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>
    ){}

    close(){
        this.dialogRef.close();
    }
}
