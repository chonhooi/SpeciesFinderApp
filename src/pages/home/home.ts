import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, Platform, ModalController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';

import { DetailsPage } from '../details/details';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [DetailsPage]
})

export class HomePage {
    public showCapture: boolean = false;
    public email: string;
    public password: string;
    public username: string;
    public id: number = 3;

    @ViewChild('loadCamera') cameraElement: ElementRef;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private detailsPage: DetailsPage, private platform: Platform, private http: Http, private navParams: NavParams, private camera: Camera, private modalCtrl: ModalController) {
    }

    takePicture() {
        try {
            this.camera.getPicture({
				quality : 50,
				destinationType : this.camera.DestinationType.DATA_URL       
            }).then((imageData) => {
                this.presentLoadingDefault();

                let base64Image = imageData;

                var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

                // invoke deep learning and get id
                //var deepLearningUrl = "/api/ScorpionFinder?code=KkmmJKU/ZYeesOyXu02NJG2vdHv3C24HMei4Ud4h8WP05njNtaOD/A==";
				var deepLearningUrl = "https://functionapp20170609052331.azurewebsites.net/api/ScorpionFinder?code=KkmmJKU/ZYeesOyXu02NJG2vdHv3C24HMei4Ud4h8WP05njNtaOD/A==";
                var rawData = 'image64string=' + encodeURIComponent(base64Image);
				
                this.http.post(deepLearningUrl, rawData, { headers: headers })
                    .subscribe(data => {
                        var modal = this.modalCtrl.create(DetailsPage, { results: data.json() });
                        modal.present();

                    }, error => {
                        console.log("Oooops!");
                        //this.data(error);
                    });;
            }, (err) => {
                console.log(err);
                //this.data(err);
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 10000);
    }
}
