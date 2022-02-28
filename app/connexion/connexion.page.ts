import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from './../models/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  data: User;

  constructor(
    public apiService : ApiService,
    public router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { 
    this.data = new User() 
  }
    
  ngOnInit() {
  }

  formulaireConnexion = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    mdp: ['', Validators.required],
  });

  get email() {
    return this.formulaireConnexion.get('email');
  }

  get mdp() {
    return this.formulaireConnexion.get('mdp');
  }

  public msgsErreur = {
    email: [
      { type: 'required', message: 'Entrez votre adresse e-mail'},
      { type: 'pattern', message: 'Entrez une adresse e-mail valide'}
    ],
    mdp: [
      { type: 'required', message: 'Entrez votre mot de passe'}
    ]
  };


  async wrongIdsAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Identifiants inconnus',
      subHeader: '',
      message: 'Les identifiants entrés sont erronés ou n\'existent pas',
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Succès',
      subHeader: '',
      message: 'L\'identification a réussi, retour à l\'accueil',
      buttons: 
      [
        {
          text: 'OK',
          handler: () => 
          {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  loginUser() {
    this.data["email"] = this.formulaireConnexion.value["email"];
    this.data["mdp"] = this.formulaireConnexion.value["mdp"];
    this.apiService.getUser(this.data).subscribe(userData => { 
      if(userData != null)
      {
        this.data["id"] = userData.id;
        this.data["prenom"] = userData.prenom;
        this.data["nom"] = userData.nom;
        this.authService.login(this.data);
        this.data["role"] = userData.role;
        this.confirmationAlert();
      }
      else
      {
        this.wrongIdsAlert();
      }
     });
  }
}
