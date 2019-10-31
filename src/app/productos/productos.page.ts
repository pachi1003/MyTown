import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';



@Component({
    selector: 'app-productos',
    templateUrl: 'productos.page.html',
    styleUrls: ['productos.page.scss']
})
export class ProductosPage implements OnInit {
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    data: any[] = new Array(12);
    constructor() {
    }
    ngOnInit() {
    }
    loadData(event) {
        console.log('cargando datos...');
        setTimeout(() => {
            if ( this.data.length > 30) {
                event.target.complete();
                this.infiniteScroll.disabled = true;
                return;
            }
            const siguientes = new Array(12);
            this.data.push( ...siguientes );
            event.target.complete();
        }, 1000);
    }
}



