import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  prenom: string = "";
  nom: string = "";

  constructor(private authService: AuthenticationService,
              private router: Router, 
              private alertController: AlertController, 
              private storage: Storage) { }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  isAdm() {
    return this.authService.isAdmin();
  }

  logoutUser() {
    this.authService.logout();
    this.confirmationAlert();
  }

  displayMenuEvent() {
    if(this.isAuth())
    {
      this.getValues();    
    }
  }

  getValues() {
    this.storage.get('USER_INFO').then(
      response => { 
        this.prenom = response.prenom;
        this.nom = response.nom;
      });
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Succès',
      subHeader: '',
      message: 'Déconnecté !',
      buttons: 
      [
        {
          text: 'OK',
          handler: () => 
          {
            this.router.navigate(['home']);
          }
        }
      ]
    });

    await alert.present();
  }
  
}
