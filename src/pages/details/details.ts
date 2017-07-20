import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

@Component({
    selector: 'page-details',
    templateUrl: 'details.html'
})
export class DetailsPage {

    public results: any;

    constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
        this.results = navParams.get('results');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
