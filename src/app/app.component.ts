import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MaqAPPv3';

  constructor(private _router: Router, private _query: ActivatedRoute) {}

  ngOnInit(): void {
    this._router.navigate(['/login']);
  }
}
