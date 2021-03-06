import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog-actions',
    templateUrl: './dialog-with-actions.component.html',
    styleUrls: []
})
export class DialogWithActionsComponent {

    constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
        data.okData = (data.okData !== undefined) ? data.okData : true;
        data.declineData = data.declineData || false;
    }

    onOkClick(): void {
        this.closeWith(this.data.okData);
    }

    onDeclineClick(): void {
        this.closeWith(this.data.declineData);
    }

    showDecline(): boolean {
        return (this.data['hideDecline'] === undefined) ? true : !this.data.hideDecline;
    }

    private closeWith(data) {
        this.dialogRef.close(data);
    }

}
