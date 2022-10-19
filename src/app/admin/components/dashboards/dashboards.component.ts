import { Component, OnInit } from '@angular/core';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  constructor(
    private _alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this._alertify.message("Deneme mesaj", { delay:5, messageType: MessageType.Success })
  }

}
