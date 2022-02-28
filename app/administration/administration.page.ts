import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  image: any;
  button1State: boolean = false;
  button2State: boolean = false;
  button3State: boolean = false;

  validateDelete: boolean = false;

  validationMsg: string;
  errorMsg: string;

  dbContent: any[] = [];
  idForUpdate: number;

  dbEntry: any[] = [];

  typeOffreToUpdate: string;
  typeBienToUpdate: string;
  communeToUpdate: string;
  descriptifBienToUpdate: string;
  proprietaireLocationToUpdate: string;
  surfaceBienToUpdate: string;
  loyerLocationToUpdate: string;
  prixVenteToUpdate: string;
  chargesLocationToUpdate: string;
  taxesVenteToUpdate: string;
  adresseToUpdate: string;
  codePostalToUpdate: string;
  secteurToUpdate: string;
  numEtageToUpdate: string;
  nbrEtagesToUpdate: string;
  surfaceTerrainToUpdate: string;
  nbrPiecesToUpdate: string;
  nbrChambresToUpdate: string;
  nbrSdbToUpdate: string;
  nbrToilettesToUpdate: string;
  nbrPlacardsToUpdate: string;
  caveToUpdate: string;
  surfaceCaveToUpdate: string;
  descriptifCaveToUpdate: string;
  grenierToUpdate: string;
  surfaceGrenierToUpdate: string;
  descriptifGrenierToUpdate: string;
  cuisineEquipeeToUpdate: string;
  surfaceCuisineToUpdate: string;
  revetementEntreeToUpdate: string;
  revetementSalonToUpdate: string;
  revetementSejourToUpdate: string;
  revetementCuisineToUpdate: string;
  revetementSdbToUpdate: string;
  revetementChambresToUpdate: string;
  garageToUpdate: string;
  nbrPlacesGarageToUpdate: string;
  parkingToUpdate: string;
  nbrPlacesParkingToUpdate: string;
  anneeConstructionToUpdate: string;
  dpeToUpdate: string;
  referenceBienToUpdate: string;
  loueLocationToUpdate: string;
  venduVenteToUpdate: string;
  visibleToUpdate: string;
  videoToUpdate: string;
  photo0ToUpdate: string;
  photo1ToUpdate: string;
  photo2ToUpdate: string;
  photo3ToUpdate: string;
  photo4ToUpdate: string;
  photoCount: number;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private http: HttpClient, private router: Router, private alertController: AlertController) {}
    
  ngOnInit() {
    this.apiService.getDbContent().subscribe(
      data => {
        this.dbContent = JSON.parse(JSON.stringify(data));
      }
    );
  }

  button1Clicked() {
    if(this.button1State == false)
    {
      this.button1State = true;
    }
    else
    {
      this.button1State = false;
    }
  }

  button2Clicked() {
    if(this.button2State == false)
    {
      this.button2State = true;
    }
    else
    {
      this.button2State = false;
    }
  }

  button3Clicked() {
    if(this.button3State == false)
    {
      this.button3State = true;
    }
    else
    {
      this.button3State = false;
    }
  }

  //Définition du formulaire d'ajout d'offre
  formulaireNouvelleOffre = this.formBuilder.group({
    type_offre: ['', [Validators.required]],
    type_bien: ['', [Validators.required]],
    descriptif_bien: ['', [Validators.required]],
    loyer: [''],
    charges: [''],
    prix: [''],
    taxes: [''],
    adresse: ['', [Validators.required]],
    code_postal: ['', [Validators.required]],
    commune: ['', [Validators.required]],
    secteur: ['', [Validators.required]],
    num_etage: [''],
    nbr_etages: [''],
    surface_bien: ['', [Validators.required]],
    surface_terrain: [''],
    nbr_chambres: ['', [Validators.required]],
    nbr_pieces: ['', [Validators.required]],
    nbr_sdb: ['', [Validators.required]],
    nbr_toilettes: ['', [Validators.required]],
    nbr_placards: ['', [Validators.required]],
    cave_oui_non: ['', [Validators.required]],
    surface_cave: [''],
    descriptif_cave: [''],
    grenier_oui_non: ['', [Validators.required]],
    surface_grenier: [''],
    descriptif_grenier: [''],
    cuisine_equipee: ['', [Validators.required]],
    surface_cuisine: ['', [Validators.required]],
    revetement_entree: ['', [Validators.required]],
    revetement_sejour: ['', [Validators.required]],
    revetement_sdb: ['', [Validators.required]],
    revetement_salon: ['', [Validators.required]],
    revetement_chambres: ['', [Validators.required]],
    revetement_cuisine: ['', [Validators.required]],
    garage: ['', [Validators.required]],
    nbr_places_garage: [''],
    parking: ['', [Validators.required]],
    nbr_places_parking: [''],
    annee_construction: ['', [Validators.required]],
    dpe: ['', [Validators.required]],
    reference_bien: ['', [Validators.required]],
    visible: ['', [Validators.required]],
    loue_location: [''],
    vendu_vente: [''],
    video: ['', [Validators.required]],
    photo: ['', [Validators.required]]
  });

  get photo() {
    return this.formulaireNouvelleOffre.get('photo');
  }

  get type_offre() {
    return this.formulaireNouvelleOffre.get('type_offre');
  }

  get type_bien() {
    return this.formulaireNouvelleOffre.get('type_bien');
  }

  get descriptif_bien() {
    return this.formulaireNouvelleOffre.get('descriptif_bien');
  }

  get loyer() {
    return this.formulaireNouvelleOffre.get('loyer');
  }

  get charges() {
    return this.formulaireNouvelleOffre.get('charges');
  }

  get prix() {
    return this.formulaireNouvelleOffre.get('prix');
  }

  get taxes() {
    return this.formulaireNouvelleOffre.get('taxes');
  }
  
  get adresse() {
    return this.formulaireNouvelleOffre.get('adresse');
  }

  get commune() {
    return this.formulaireNouvelleOffre.get('commune');
  }

  get code_postal() {
    return this.formulaireNouvelleOffre.get('code_postal');
  }

  get secteur() {
    return this.formulaireNouvelleOffre.get('secteur');
  }

  get num_etage() {
    return this.formulaireNouvelleOffre.get('num_etage');
  }

  get nbr_etages() {
    return this.formulaireNouvelleOffre.get('nbr_etages');
  }

  get surface_bien() {
    return this.formulaireNouvelleOffre.get('surface_bien');
  }

  get surface_terrain() {
    return this.formulaireNouvelleOffre.get('surface_terrain');
  }

  get nbr_pieces() {
    return this.formulaireNouvelleOffre.get('nbr_pieces');
  }

  get nbr_chambres() {
    return this.formulaireNouvelleOffre.get('nbr_chambres');
  }

  get nbr_sdb() {
    return this.formulaireNouvelleOffre.get('nbr_sdb');
  }

  get nbr_toilettes() {
    return this.formulaireNouvelleOffre.get('nbr_toilettes');
  }

  get nbr_placards() {
    return this.formulaireNouvelleOffre.get('nbr_placards');
  }

  get cave_oui_non() {
    return this.formulaireNouvelleOffre.get('cave_oui_non');
  }

  get surface_cave() {
    return this.formulaireNouvelleOffre.get('surface_cave');
  }

  get descriptif_cave() {
    return this.formulaireNouvelleOffre.get('descriptif_cave');
  }

  get grenier_oui_non() {
    return this.formulaireNouvelleOffre.get('grenier_oui_non');
  }

  get surface_grenier() {
    return this.formulaireNouvelleOffre.get('surface_grenier');
  }

  get descriptif_grenier() {
    return this.formulaireNouvelleOffre.get('descriptif_grenier');
  }

  get cuisine_equipee() {
    return this.formulaireNouvelleOffre.get('cuisine_equipee');
  }

  get surface_cuisine() {
    return this.formulaireNouvelleOffre.get('surface_cuisine');
  }

  get revetement_entree() {
    return this.formulaireNouvelleOffre.get('revetement_entree');
  }

  get revetement_sejour() {
    return this.formulaireNouvelleOffre.get('revetement_sejour');
  }

  get revetement_sdb() {
    return this.formulaireNouvelleOffre.get('revetement_sdb');
  }

  get revetement_cuisine() {
    return this.formulaireNouvelleOffre.get('revetement_cuisine');
  }

  get revetement_chambres() {
    return this.formulaireNouvelleOffre.get('revetement_chambres');
  }

  get revetement_salon() {
    return this.formulaireNouvelleOffre.get('revetement_salon');
  }

  get garage() {
    return this.formulaireNouvelleOffre.get('garage');
  }

  get nbr_places_garage() {
    return this.formulaireNouvelleOffre.get('nbr_places_garage');
  }

  get parking() {
    return this.formulaireNouvelleOffre.get('parking');
  }

  get nbr_places_parking() {
    return this.formulaireNouvelleOffre.get('nbr_places_parking');
  }

  get annee_construction() {
    return this.formulaireNouvelleOffre.get('annee_construction');
  }

  get dpe() {
    return this.formulaireNouvelleOffre.get('dpe');
  }

  get reference_bien() {
    return this.formulaireNouvelleOffre.get('reference_bien');
  }

  get visible() {
    return this.formulaireNouvelleOffre.get('visible');
  }

  get loue_location() {
    return this.formulaireNouvelleOffre.get('loue_location');
  }

  get vendu_vente() {
    return this.formulaireNouvelleOffre.get('vendu_vente');
  }

  get video() {
    return this.formulaireNouvelleOffre.get('video');
  }

  public errorMessages = {
    type_offre: 
    [
      { type: 'required', message: "Choisir un type d'offre" }
    ],
    type_bien:
    [
      { type: 'required', message: "Choisir un type de bien" }
    ],
    descriptif_bien:
    [
      { type: 'required', message: "Entrez un descriptif" }
    ],
    adresse:
    [
      { type: 'required', message: "Entrez une adresse" }
    ],
    code_postal:
    [
      { type: 'required', message: "Entrez un code postal" }
    ],
    commune:
    [
      { type: 'required', message: "Entrez une commune" }
    ],
    secteur:
    [
      { type: 'required', message: "Entrez un secteur" }
    ],
    surface_bien:
    [
      { type: 'required', message: "Entrez une surface" }
    ],
    nbr_pieces:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_chambres:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_sdb:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_toilettes:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_placards:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    cave_oui_non:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    grenier_oui_non:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    cuisine_equipee:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    surface_cuisine:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    revetement_entree:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_sdb:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_cuisine:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_chambres:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_sejour:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_salon:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    garage:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    parking:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    annee_construction:
    [
      { type: 'required', message: "Entrez une année" }
    ],
    dpe:
    [
      { type: 'required', message: "Entrez un DPE" }
    ],
    reference_bien:
    [
      { type: 'required', message: "Entrez une référence pour le bien" }
    ],
    visible:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    video:
    [
      { type: 'required', message: "Entrez un lien vidéo" }
    ],
    photo:
    [
      { type: 'required', message: "Choisissez une photo" }
    ]
  }

  selectedImage(event) {
    this.image = event.target.files[0];
  }

  async confirmationAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Succès',
      subHeader: '',
      message: msg,
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

  async errorAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erreur',
      subHeader: '',
      message: msg,
      buttons: 
      [
        {
          text: 'OK',
          handler: () => 
          {
            this.router.navigate(['administration']);
          }
        }
      ]
    });

    await alert.present();
  }

  onSubmit() {
    let formData = new FormData();
    formData.append("type", "create");
    formData.append("photo", this.image);
    formData.append("type_offre", this.formulaireNouvelleOffre.value["type_offre"]);
    formData.append("type_bien", this.formulaireNouvelleOffre.value["type_bien"]);
    formData.append("descriptif_bien", this.formulaireNouvelleOffre.value["descriptif_bien"]);
    if(this.formulaireNouvelleOffre.value["loyer"])
    {
      formData.append("loyer", this.formulaireNouvelleOffre.value["loyer"]);
    }
    else
    {
      formData.append("loyer", "0");
    }
    if(this.formulaireNouvelleOffre.value["charges"])
    {
      formData.append("charges", this.formulaireNouvelleOffre.value["charges"]);
    }
    else
    {
      formData.append("charges", "0");
    }
    if(this.formulaireNouvelleOffre.value["prix"])
    {
      formData.append("prix", this.formulaireNouvelleOffre.value["prix"]);
    }
    else
    {
      formData.append("prix", "0");
    }
    if(this.formulaireNouvelleOffre.value["taxes"])
    {
      formData.append("taxes", this.formulaireNouvelleOffre.value["taxes"]);
    }
    else
    {
      formData.append("taxes", "0");
    }
    formData.append("adresse", this.formulaireNouvelleOffre.value["adresse"]);
    formData.append("code_postal", this.formulaireNouvelleOffre.value["code_postal"]);
    formData.append("commune", this.formulaireNouvelleOffre.value["commune"]);
    formData.append("secteur", this.formulaireNouvelleOffre.value["secteur"]);
    if(this.formulaireNouvelleOffre.value["num_etage"])
    {
      formData.append("num_etage", this.formulaireNouvelleOffre.value["num_etage"]);
    }
    else
    {
      formData.append("num_etage", "-1");
    }
    if(this.formulaireNouvelleOffre.value["nbr_etages"])
    {
      formData.append("nbr_etages", this.formulaireNouvelleOffre.value["nbr_etages"]);
    }
    else
    {
      formData.append("nbr_etages", "0");
    }
    formData.append("surface_bien", this.formulaireNouvelleOffre.value["surface_bien"]);
    if(this.formulaireNouvelleOffre.value["surface_terrain"])
    {
      formData.append("surface_terrain", this.formulaireNouvelleOffre.value["surface_terrain"]);
    }
    else
    {
      formData.append("surface_terrain", "0");
    }
    formData.append("nbr_pieces", this.formulaireNouvelleOffre.value["nbr_pieces"]);
    formData.append("nbr_chambres", this.formulaireNouvelleOffre.value["nbr_chambres"]);
    formData.append("nbr_sdb", this.formulaireNouvelleOffre.value["nbr_sdb"]);
    formData.append("nbr_toilettes", this.formulaireNouvelleOffre.value["nbr_toilettes"]);
    formData.append("nbr_placards", this.formulaireNouvelleOffre.value["nbr_placards"]);
    formData.append("cave_oui_non", this.formulaireNouvelleOffre.value["cave_oui_non"]);
    if(this.formulaireNouvelleOffre.value["surface_cave"])
    {
      formData.append("surface_cave", this.formulaireNouvelleOffre.value["surface_cave"]);
    }
    else
    {
      formData.append("surface_cave", "0");
    }
    if(this.formulaireNouvelleOffre.value["descriptif_cave"])
    {
      formData.append("descriptif_cave", this.formulaireNouvelleOffre.value["descriptif_cave"]);
    }
    else
    {
      formData.append("descriptif_cave", "0");
    }
    formData.append("grenier_oui_non", this.formulaireNouvelleOffre.value["grenier_oui_non"]);
    if(this.formulaireNouvelleOffre.value["surface_grenier"])
    {
      formData.append("surface_grenier", this.formulaireNouvelleOffre.value["surface_grenier"]);
    }
    else
    {
      formData.append("surface_grenier", "0");
    }
    if(this.formulaireNouvelleOffre.value["descriptif_grenier"])
    {
      formData.append("descriptif_grenier", this.formulaireNouvelleOffre.value["descriptif_grenier"]);
    }
    else
    {
      formData.append("descriptif_grenier", "0");
    }
    formData.append("cuisine_equipee", this.formulaireNouvelleOffre.value["cuisine_equipee"]);
    formData.append("surface_cuisine", this.formulaireNouvelleOffre.value["surface_cuisine"]);
    formData.append("revetement_entree", this.formulaireNouvelleOffre.value["revetement_entree"]);
    formData.append("revetement_salon", this.formulaireNouvelleOffre.value["revetement_salon"]);
    formData.append("revetement_sejour", this.formulaireNouvelleOffre.value["revetement_sejour"]);
    formData.append("revetement_cuisine", this.formulaireNouvelleOffre.value["revetement_cuisine"]);
    formData.append("revetement_chambres", this.formulaireNouvelleOffre.value["revetement_chambres"]);
    formData.append("revetement_sdb", this.formulaireNouvelleOffre.value["revetement_sdb"]);
    formData.append("garage", this.formulaireNouvelleOffre.value["garage"]);
    if(this.formulaireNouvelleOffre.value["nbr_places_garage"])
    {
      formData.append("nbr_places_garage", this.formulaireNouvelleOffre.value["nbr_places_garage"]);
    }
    else
    {
      formData.append("nbr_places_garage", "0");
    }
    formData.append("parking", this.formulaireNouvelleOffre.value["parking"]);
    if(this.formulaireNouvelleOffre.value["nbr_places_parking"])
    {
      formData.append("nbr_places_parking", this.formulaireNouvelleOffre.value["nbr_places_parking"]);
    }
    else
    {
      formData.append("nbr_places_parking", "0");
    }
    formData.append("annee_construction", this.formulaireNouvelleOffre.value["annee_construction"]);
    formData.append("dpe", this.formulaireNouvelleOffre.value["dpe"]);
    formData.append("reference_bien", this.formulaireNouvelleOffre.value["reference_bien"]);
    formData.append("visible", this.formulaireNouvelleOffre.value["visible"]);
    formData.append("video", this.formulaireNouvelleOffre.value["video"]);
    if(this.formulaireNouvelleOffre.value["loue_location"])
    {
      formData.append("loue_location", this.formulaireNouvelleOffre.value["loue_location"]);
    }
    else
    {
      formData.append("loue_location", "0");
    }
    if(this.formulaireNouvelleOffre.value["vendu_vente"])
    {
      formData.append("vendu_vente", this.formulaireNouvelleOffre.value["vendu_vente"]);
    }
    else
    {
      formData.append("vendu_vente", "0");
    }

    this.apiService.createNewOffer(formData).subscribe((response) => {
      if(response == null)
      {
        this.validationMsg = "L'offre a bien été créée, retour à l'accueil";
        this.confirmationAlert(this.validationMsg);
        this.formulaireNouvelleOffre.reset();
        this.button1State = false;
      }
      else
      {
        this.errorAlert(response);
        this.formulaireNouvelleOffre.reset();
        this.button1State = false;
      }
    })
  }


  //Gestion de la suppression

  formulaireSuppression = this.formBuilder.group({
    id_offre: ['', [Validators.required]]
  });

  public deleteErrorMessage = {
    id_offre:
    [
      { type: 'required', message: 'Choisir un article à supprimer' }
    ]
  };

  get id_offre() {
    return this.formulaireSuppression.get("id_article");
  }

  validatePopUp() {
    this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer cette offre ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.onDelete();
          }
        },
        {
          text: 'Annuler',
          handler: () => {

          }
        }
      ]
    }).then(response => {
      response.present();
    });
  }

  onDelete() {
    let formData = new FormData();
    formData.append("type", "delete");
    formData.append("id_offre", this.formulaireSuppression.value["id_offre"]);

    this.apiService.deleteOffer(formData).subscribe((response) => {
      if(response == null)
      {
        this.validationMsg = "L'offre a bien été supprimée, retour à l'accueil";
        this.confirmationAlert(this.validationMsg);
        this.formulaireSuppression.reset();
        this.button3State = false;
      }
      else
      {
        this.errorMsg = "Erreur lors de la suppression";
        this.errorAlert(this.errorMsg);
        this.formulaireSuppression.reset();
        this.button3State = false;
      }
    })
  }

  //Gestion de la mise à jour d'offre
  formulaireChoixOffre = this.formBuilder.group({
    id_offre_update: ['', Validators.required]
  })

  get id_offre_update() {
    return this.formulaireChoixOffre.get("id_offre_update");
  }

  displayUpdateForm() {
    this.idForUpdate = this.formulaireChoixOffre.value["id_offre_update"];
    this.getEntry(this.idForUpdate);
  }

  getEntry(id) {
    this.photoCount = 0;
    this.apiService.getDbEntry(id).subscribe(data => {
      this.dbEntry = JSON.parse(JSON.stringify(data));
      this.typeOffreToUpdate = data.type_offre;
      this.typeBienToUpdate = data.type_bien;
      this.descriptifBienToUpdate = data.descriptif_bien;
      if(data.type_offre == "location")
      {
        this.loyerLocationToUpdate = data.loyer_location;
        this.chargesLocationToUpdate = data.charges_location;
        this.loueLocationToUpdate = data.loue_location;
      }
      if(data.type_offre == "vente")
      {
        this.prixVenteToUpdate = data.prix_vente;
        this.taxesVenteToUpdate = data.taxes_vente;
        this.venduVenteToUpdate = data.vendu_vente;
      }
      this.adresseToUpdate = data.adresse;
      this.codePostalToUpdate = data.code_postal;
      this.communeToUpdate = data.commune;
      this.secteurToUpdate = data.secteur;
      if(data.numero_etage != "-1")
      {
        this.numEtageToUpdate = data.numero_etage;
      }
      if(data.nbr_etages != "0")
      {
        this.nbrEtagesToUpdate = data.nbr_etages;
      }
      this.surfaceBienToUpdate = data.surface_bien;
      if(data.surface_terrain != "0")
      {
        this.surfaceTerrainToUpdate = data.surface_terrain;
      }
      this.nbrPiecesToUpdate = data.nbr_pieces;
      this.nbrChambresToUpdate = data.nbr_chambres;
      this.nbrSdbToUpdate = data.nbr_sdb;
      this.nbrToilettesToUpdate = data.nbr_toilettes;
      this.nbrPlacardsToUpdate = data.nbr_placards;
      this.caveToUpdate = data.cave;
      if(data.cave != "non")
      {
        this.surfaceCaveToUpdate = data.surface_cave;
        this.descriptifCaveToUpdate = data.descriptif_cave;
      }
      this.grenierToUpdate = data.grenier;
      if(data.grenier != "non")
      {
        this.surfaceGrenierToUpdate = data.surface_grenier;
        this.descriptifGrenierToUpdate = data.descriptif_grenier;
      }
      this.cuisineEquipeeToUpdate = data.cuisine_equipee;
      this.surfaceCuisineToUpdate = data.surface_cuisine;
      this.revetementEntreeToUpdate = data.revetement_entree;
      this.revetementSalonToUpdate = data.revetement_salon;
      this.revetementSejourToUpdate = data.revetement_sejour;
      this.revetementCuisineToUpdate = data.revetement_cuisine;
      this.revetementSdbToUpdate = data.revetement_sdb;
      this.revetementChambresToUpdate = data.revetement_chambres;
      this.garageToUpdate = data.garage;
      if(data.garage != "non")
      {
        this.nbrPlacesGarageToUpdate = data.nbr_places_garage;
      }
      this.parkingToUpdate = data.parking;
      if(data.parking != "0")
      {
        this.nbrPlacesParkingToUpdate = data.nbr_places_parking;
      }
      this.anneeConstructionToUpdate = data.annee_construction;
      this.dpeToUpdate = data.dpe;
      this.referenceBienToUpdate = data.reference_bien;
      this.visibleToUpdate = data.visible;
      this.videoToUpdate = data.video;
      this.photo0ToUpdate = data.photo_0;
      this.photoCount++;
      if(data.photo_1)
      {
        this.photo1ToUpdate = data.photo_1;
        this.photoCount++;
      }
      if(data.photo_2)
      {
        this.photo2ToUpdate = data.photo_2;
        this.photoCount++;
      }
      if(data.photo_3)
      {
        this.photo3ToUpdate = data.photo_3;
        this.photoCount++;
      }
      if(data.photo_4)
      {
        this.photo4ToUpdate = data.photo_4;
        this.photoCount++;
      }
    });
  }

  formulaireOffre = this.formBuilder.group({
    type_offre: ['', [Validators.required]],
    type_bien: ['', [Validators.required]],
    descriptif_bien: ['', [Validators.required]],
    loyer: [''],
    charges: [''],
    prix: [''],
    taxes: [''],
    adresse: ['', [Validators.required]],
    code_postal: ['', [Validators.required]],
    commune: ['', [Validators.required]],
    secteur: ['', [Validators.required]],
    num_etage: [''],
    nbr_etages: [''],
    surface_bien: ['', [Validators.required]],
    surface_terrain: [''],
    nbr_chambres: ['', [Validators.required]],
    nbr_pieces: ['', [Validators.required]],
    nbr_sdb: ['', [Validators.required]],
    nbr_toilettes: ['', [Validators.required]],
    nbr_placards: ['', [Validators.required]],
    cave_oui_non: ['', [Validators.required]],
    surface_cave: [''],
    descriptif_cave: [''],
    grenier_oui_non: ['', [Validators.required]],
    surface_grenier: [''],
    descriptif_grenier: [''],
    cuisine_equipee: ['', [Validators.required]],
    surface_cuisine: ['', [Validators.required]],
    revetement_entree: ['', [Validators.required]],
    revetement_sejour: ['', [Validators.required]],
    revetement_sdb: ['', [Validators.required]],
    revetement_salon: ['', [Validators.required]],
    revetement_chambres: ['', [Validators.required]],
    revetement_cuisine: ['', [Validators.required]],
    garage: ['', [Validators.required]],
    nbr_places_garage: [''],
    parking: ['', [Validators.required]],
    nbr_places_parking: [''],
    annee_construction: ['', [Validators.required]],
    dpe: ['', [Validators.required]],
    reference_bien: ['', [Validators.required]],
    visible: ['', [Validators.required]],
    loue_location: [''],
    vendu_vente: [''],
    video: ['', [Validators.required]],
    photo: ['', [Validators.required]]
  })

  get photoUpdate() {
    return this.formulaireNouvelleOffre.get('photo');
  }

  get type_offreUpdate() {
    return this.formulaireNouvelleOffre.get('type_offre');
  }

  get type_bienUpdate() {
    return this.formulaireNouvelleOffre.get('type_bien');
  }

  get descriptif_bienUpdate() {
    return this.formulaireNouvelleOffre.get('descriptif_bien');
  }

  get loyerUpdate() {
    return this.formulaireNouvelleOffre.get('loyer');
  }

  get chargesUpdate() {
    return this.formulaireNouvelleOffre.get('charges');
  }

  get prixUpdate() {
    return this.formulaireNouvelleOffre.get('prix');
  }

  get taxesUpdate() {
    return this.formulaireNouvelleOffre.get('taxes');
  }
  
  get adresseUpdate() {
    return this.formulaireNouvelleOffre.get('adresse');
  }

  get communeUpdate() {
    return this.formulaireNouvelleOffre.get('commune');
  }

  get code_postalUpdate() {
    return this.formulaireNouvelleOffre.get('code_postal');
  }

  get secteurUpdate() {
    return this.formulaireNouvelleOffre.get('secteur');
  }

  get num_etageUpdate() {
    return this.formulaireNouvelleOffre.get('num_etage');
  }

  get nbr_etagesUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_etages');
  }

  get surface_bienUpdate() {
    return this.formulaireNouvelleOffre.get('surface_bien');
  }

  get surface_terrainUpdate() {
    return this.formulaireNouvelleOffre.get('surface_terrain');
  }

  get nbr_piecesUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_pieces');
  }

  get nbr_chambresUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_chambres');
  }

  get nbr_sdbUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_sdb');
  }

  get nbr_toilettesUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_toilettes');
  }

  get nbr_placardsUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_placards');
  }

  get cave_oui_nonUpdate() {
    return this.formulaireNouvelleOffre.get('cave_oui_non');
  }

  get surface_caveUpdate() {
    return this.formulaireNouvelleOffre.get('surface_cave');
  }

  get descriptif_caveUpdate() {
    return this.formulaireNouvelleOffre.get('descriptif_cave');
  }

  get grenier_oui_nonUpdate() {
    return this.formulaireNouvelleOffre.get('grenier_oui_non');
  }

  get surface_grenierUpdate() {
    return this.formulaireNouvelleOffre.get('surface_grenier');
  }

  get descriptif_grenierUpdate() {
    return this.formulaireNouvelleOffre.get('descriptif_grenier');
  }

  get cuisine_equipeeUpdate() {
    return this.formulaireNouvelleOffre.get('cuisine_equipee');
  }

  get surface_cuisineUpdate() {
    return this.formulaireNouvelleOffre.get('surface_cuisine');
  }

  get revetement_entreeUpdate() {
    return this.formulaireNouvelleOffre.get('revetement_entree');
  }

  get revetement_sejourUpdate() {
    return this.formulaireNouvelleOffre.get('revetement_sejour');
  }

  get revetement_sdbUpdate() {
    return this.formulaireNouvelleOffre.get('revetement_sdb');
  }

  get revetement_cuisineUpdate() {
    return this.formulaireNouvelleOffre.get('revetement_cuisine');
  }

  get revetement_chambresUpdate() {
    return this.formulaireNouvelleOffre.get('revetement_chambres');
  }

  get revetement_salonUpdate() {
    return this.formulaireNouvelleOffre.get('revetement_salon');
  }

  get garageUpdate() {
    return this.formulaireNouvelleOffre.get('garage');
  }

  get nbr_places_garageUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_places_garage');
  }

  get parkingUpdate() {
    return this.formulaireNouvelleOffre.get('parking');
  }

  get nbr_places_parkingUpdate() {
    return this.formulaireNouvelleOffre.get('nbr_places_parking');
  }

  get annee_constructionUpdate() {
    return this.formulaireNouvelleOffre.get('annee_construction');
  }

  get dpeUpdate() {
    return this.formulaireNouvelleOffre.get('dpe');
  }

  get reference_bienUpdate() {
    return this.formulaireNouvelleOffre.get('reference_bien');
  }

  get visibleUpdate() {
    return this.formulaireNouvelleOffre.get('visible');
  }

  get loue_locationUpdate() {
    return this.formulaireNouvelleOffre.get('loue_location');
  }

  get vendu_venteUpdate() {
    return this.formulaireNouvelleOffre.get('vendu_vente');
  }

  get videoUpdate() {
    return this.formulaireNouvelleOffre.get('video');
  }

  public updateErrorMessages = {
    type_offreUpdate: 
    [
      { type: 'required', message: "Choisir un type d'offre" }
    ],
    type_bienUpdate:
    [
      { type: 'required', message: "Choisir un type de bien" }
    ],
    descriptif_bienUpdate:
    [
      { type: 'required', message: "Entrez un descriptif" }
    ],
    adresseUpdate:
    [
      { type: 'required', message: "Entrez une adresse" }
    ],
    code_postalUpdate:
    [
      { type: 'required', message: "Entrez un code postal" }
    ],
    communeUpdate:
    [
      { type: 'required', message: "Entrez une commune" }
    ],
    secteurUpdate:
    [
      { type: 'required', message: "Entrez un secteur" }
    ],
    surface_bienUpdate:
    [
      { type: 'required', message: "Entrez une surface" }
    ],
    nbr_piecesUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_chambresUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_sdbUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_toilettesUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    nbr_placardsUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    cave_oui_nonUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    grenier_oui_nonUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    cuisine_equipeeUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    surface_cuisineUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    revetement_entreeUpdate:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_sdbUpdate:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_cuisineUpdate:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_chambresUpdate:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_sejourUpdate:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    revetement_salonUpdate:
    [
      { type: 'required', message: "Entrez un revêtement" }
    ],
    garageUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    parkingUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    annee_constructionUpdate:
    [
      { type: 'required', message: "Entrez une année" }
    ],
    dpeUpdate:
    [
      { type: 'required', message: "Entrez un DPE" }
    ],
    reference_bienUpdate:
    [
      { type: 'required', message: "Entrez une référence pour le bien" }
    ],
    visibleUpdate:
    [
      { type: 'required', message: "Entrez une valeur" }
    ],
    videoUpdate:
    [
      { type: 'required', message: "Entrez un lien vidéo" }
    ],
    photoUpdate:
    [
      { type: 'required', message: "Choisissez une photo" }
    ]
  }
}
