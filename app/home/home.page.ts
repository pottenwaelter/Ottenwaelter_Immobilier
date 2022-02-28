import { ModalOffrePage } from './../modals/modal-offre/modal-offre.page';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../services/api.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../services/authentication.service';
import { Component, ViewChild } from '@angular/core';
import { IonContent, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  prenom: string = "";
  nom: string = "";
  role: string = "";

  dbContent: any[] = [];

  @ViewChild(IonContent) ionContent: IonContent;

  constructor(public modalController: ModalController, private authService: AuthenticationService, private storage: Storage, private alertController: AlertController, private apiService: ApiService, private http: HttpClient) {
  }

  ngOnInit() {
    this.apiService.getDbContent().subscribe(
      data => {
        this.dbContent = JSON.parse(JSON.stringify(data));
      }
    );
  }

  ionViewDidEnter(){
    if(this.isAuth())
    {
      this.getValues();
    }
  }
  
  async openModal(id) {
    const modal = await this.modalController.create({
      component: ModalOffrePage,
      componentProps: {
        "id": id
      }
    });
    
    return await modal.present();
  }

  backToTop() {
    this.ionContent.scrollToTop(500);
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  isAdm() {
    return this.authService.isAdmin();
  }

  getValues() {
    this.storage.get('USER_INFO').then(
      response => { 
        this.prenom = response.prenom;
        this.nom = response.nom;
        this.role = response.role;
      });
  }

  logoutUser() {
    this.authService.logout();
    this.confirmationAlert();
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Succès',
      subHeader: '',
      message: 'Déconnecté !',
      buttons: ['OK']
    });
    await alert.present();
  }
}
