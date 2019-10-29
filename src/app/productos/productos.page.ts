import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-productos',
    templateUrl: 'productos.page.html',
    styleUrls: ['productos.page.scss']
})
export class ProductosPage implements OnInit {
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
    data: any[] = new Array(12);
    constructor(public authservice: AuthService) {
    }
    ngOnInit() {
    }
    Onlogout() {
        this.authservice.logout();
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



