import { Component } from '@angular/core';
import { PosizioneCella } from './entità/posizione-cella';
import { StatoApp } from './enums/stato-app';
import { StatoCella } from './enums/stato-cella.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameOfLife';
  nRighe: number = 20;
  nColonne: number = 40;
  statoCella: StatoCella[][];
  statoApp: StatoApp;
  ciclo: number;
  nuoveCelleVive: PosizioneCella[];
  nuoveCelleMorte: PosizioneCella[];
  interval: number;


  constructor() {
    this.statoApp = StatoApp.disattivo;
    this.statoCella = [];

  }

  ngOnInit() {
    this.inizializzaGriglia();
    this.ciclo = 0;

  }

  inizializzaGriglia() {
    for (let i = 0; i < this.nRighe; i++) {
      this.statoCella[i] = [];
      for (let j = 0; j < this.nColonne; j++) {
        let valore = StatoCella.morto;
        this.statoCella[i][j] = valore;
      }
    }
  }

  cambiaStatoCella(i1: number, i2: number) {
    if (this.statoApp === StatoApp.disattivo) {
      if (this.statoCella[i1][i2] === StatoCella.morto) this.statoCella[i1][i2] = StatoCella.vivo;
      else {
        this.statoCella[i1][i2] = StatoCella.morto;
      }
    }
  }

  fermaApp() {
    this.statoApp = StatoApp.disattivo;
    this.inizializzaGriglia();
    clearInterval(this.interval);
    this.ciclo = 0;
  }


  attivaApp() {
    this.statoApp = StatoApp.attivo;

    this.interval = window.setInterval(() => {
      this.ciclo++;

      this.nuoveCelleMorte = new Array<any>();
      this.nuoveCelleVive = new Array<any>();

      for (let i = 0; i < this.nRighe; i++) {
        for (let j = 0; j < this.nColonne; j++) {
          /* 4 regole */


          // window.alert('Cella numero ' + i + ', ' + j);
          // window.alert('Vicini vivi ' + this.nViciniVivi(i, j));
          // window.alert('Vicini morti ' + this.nViciniMorti(i, j));


          let nViciniVivi = this.nViciniVivi(i, j);
          if (this.statoCella[i][j] == StatoCella.vivo) {
            /* regola 1*/
            if (nViciniVivi <= 1) this.nuoveCelleMorte.push({ riga: i, colonna: j });
            /* regola 2*/
            if (nViciniVivi >= 4) this.nuoveCelleMorte.push({ riga: i, colonna: j });
            /* regola 3*/
            if (nViciniVivi == 2 || nViciniVivi == 3) this.nuoveCelleVive.push({ riga: i, colonna: j });
          } else if (this.statoCella[i][j] == StatoCella.morto) {
            /* regola 4*/
            if (nViciniVivi == 3) this.nuoveCelleVive.push({ riga: i, colonna: j });
          }
        }

      }

      
        //**applico cambi */
        for (let el of this.nuoveCelleMorte) {
          this.statoCella[el.riga][el.colonna] = StatoCella.morto;
        }


        for (let el of this.nuoveCelleVive) {
          this.statoCella[el.riga][el.colonna] = StatoCella.vivo;
        }


    }, 500);




  }



  nViciniVivi(i: number, j: number): number {
    let risultato = 0;

    risultato += this.ul(i, j);
    risultato += this.u(i, j);
    risultato += this.ur(i, j);
    risultato += this.l(i, j);
    risultato += this.r(i, j);
    risultato += this.dl(i, j);
    risultato += this.d(i, j);
    risultato += this.dr(i, j);
    return risultato;
  }

  nViciniMorti(i: number, j: number): number {

    return 8 - this.nViciniVivi(i, j);

  }

  private ul(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i - 1][j - 1]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }

  private u(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i-1][j]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }

  private ur(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i - 1][j + 1]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }

  private l(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i][j - 1 ]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }

  private r(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i][j +1 ]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }

  private dl(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i + 1][j - 1]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }

  private d(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i+1][j]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }

  private dr(i: number, j: number): StatoCella {
    let result = 0;
    try {
      result = this.statoCella[i + 1][j + 1]
    } catch {
      result = 0;
    }
    return result ? result : 0;
  }









}











