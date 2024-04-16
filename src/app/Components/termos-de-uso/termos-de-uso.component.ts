import { Component } from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-termos-de-uso',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './termos-de-uso.component.html',
  styleUrl: './termos-de-uso.component.css'
})
export class TermosDeUsoComponent {

}
