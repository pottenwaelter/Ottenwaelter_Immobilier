import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from './../services/api.service';
import { User } from './../models/user';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage {

  data: User;

  constructor(public apiService: ApiService,
              public router: Router, 
              private formBuilder: FormBuilder, 
              private alertController: AlertController) 
              {
                this.data = new User();
              }

  formulaireInscription = this.formBuilder.group({
    prenom: ['', [Validators.required, Validators.maxLength(100)]],
    nom: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    tel: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    mdp: ['', [Validators.required, Validators.maxLength(100)]]
  });

  get nom() {
    return this.formulaireInscription.get('nom');
  }

  get prenom() {
    return this.formulaireInscription.get('prenom');
  }

  get email() {
    return this.formulaireInscription.get('email');
  }

  get tel() {
    return this.formulaireInscription.get('tel');
  }

  get mdp() {
    return this.formulaireInscription.get('mdp');
  }

  public msgErreur = {
    prenom: [
      { type: 'required', message: 'Entrez votre prénom' },
      { type: 'maxlength', message: 'Le prénom ne doit pas dépasser 100 caractères' }
    ],
    nom: [
      { type: 'required', message: 'Entrez votre nom' },
      { type: 'maxlength', message: 'Le nom ne doit pas dépasser 100 caractères' }
    ],
    email: [
      { type: 'required', message: 'Entrez votre adresse e-mail' },
      { type: 'pattern', message: 'Entrez une adresse e-mail valide' }
    ],
    tel: [
      { type: 'required', message: 'Entrez votre numéro de téléphone' },
      { type: 'pattern', message: 'Entrez un numéro de téléphone valide' }
    ],
    mdp: [
      { type: 'required', message: 'Entrez votre mot de passe'},
      { type: 'maxlength', message: 'Votre mot de passe ne doit pas dépasser 100 caractères' }
    ]
  };
  

  ngOnInit() {
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Succès',
      message: 'Votre compte a bien été créé, retour à l\'accueil',
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

  async errorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erreur',
      message: 'L\'adresse e-mail est déjà utilisée',
      buttons:
      [
        {
          text: 'OK',
          handler: () =>
          {
            console.log("Rien");
          }
        }
      ]
    });

    await alert.present();
  }

  onSubmit() {
    this.data["prenom"] = this.formulaireInscription.value["prenom"];
    this.data["nom"] = this.formulaireInscription.value["nom"];
    this.data["email"] = this.formulaireInscription.value["email"];
    this.data["tel"] = this.formulaireInscription.value["tel"];
    this.data["mdp"] = this.formulaireInscription.value["mdp"];
    if(this.data["prenom"] && this.data["nom"] && this.data["email"] && this.data["tel"] && this.data["mdp"])
    {
      this.formulaireInscription.reset();
      this.apiService.createItem(this.data).subscribe(response => 
      {
        if(response == "Erreur")
        {
          this.errorAlert();
        }
        else
        {
          this.confirmationAlert();
        }
      });
    }
  }

}
