import { Router } from '@angular/router';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from './../services/api.service';
import { ContactForm } from './../models/contact-form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  data: ContactForm

  constructor(public router: Router, public apiService: ApiService, private formBuilder: FormBuilder, private alertController: AlertController) {
    this.data = new ContactForm();
   }

  ngOnInit() {
  }

  formulaireContact = this.formBuilder.group({
    prenom: ['', [Validators.required, Validators.maxLength(100)]],
    nom: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    tel: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    demande: ['', [Validators.required, Validators.maxLength(5000)]]
  })

  get prenom() {
    return this.formulaireContact.get("prenom");
  }

  get nom() {
    return this.formulaireContact.get("nom");
  }

  get email() {
    return this.formulaireContact.get("email");
  }

  get tel() {
    return this.formulaireContact.get("tel");
  }

  get demande() {
    return this.formulaireContact.get("demande");
  }

  public msgsErreur = {
    prenom: [
      { type: 'required', message: 'Entrez votre prénom' },
      { type: 'maxlength', message: 'Le prénom ne doit pas dépasser 100 caractères'}
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
    demande: [
      { type:'required', message: 'Entrez votre demande' },
      { type: 'maxlength', message: 'Le message ne doit pas dépasser 5000 caractères' }
    ]
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Succès',
      subHeader: '',
      message: 'Votre demande a bien été envoyée, retour à l\'accueil',
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

  onSubmit() {
    this.data["prenom"] = this.formulaireContact.value["prenom"];
    this.data["nom"] = this.formulaireContact.value["nom"];
    this.data["email"] = this.formulaireContact.value["email"];
    this.data["tel"] = this.formulaireContact.value["tel"];
    this.data["demande"] = this.formulaireContact.value["demande"];
    if(this.data["prenom"] && this.data["nom"] && this.data["email"] && this.data["tel"] && this.data["demande"])
    {
      this.apiService.sendContactForm(this.data).subscribe(() => {
        this.confirmationAlert();
      });
    }
  }

}
