import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-ins-pec-det',
  templateUrl: './doc-ins-pec-det.component.html',
  styleUrls: ['./doc-ins-pec-det.component.css'],
})
export class DocInsPecDetComponent implements OnInit {
  _frenos: boolean = true;
  _alarma: boolean = true;
  _aceite: boolean = true;
  _motor: boolean = true;
  _transmision: boolean = true;

  ngOnInit(): void {}

  btnRegresar() {}

  btnGuardar() {}
}
