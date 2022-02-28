import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-modal-offre',
  templateUrl: './modal-offre.page.html',
  styleUrls: ['./modal-offre.page.scss'],
})
export class ModalOffrePage implements OnInit {

  //config slider
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  slider: any;

  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  }

  modalId: string;

  dbEntry: any[] = [];

  identifiant: string;
  typeOffre: string;
  typeBien: string;
  commune: string;
  descriptifBien: string;
  proprietaireLocation: string;
  surfaceBien: string;
  loyerLocation: string;
  prixVente: string;
  chargesLocation: string;
  taxesVente: string;
  adresse: string;
  codePostal: string;
  secteur: string;
  numEtage: string;
  nbrEtages: string;
  surfaceTerrain: string;
  nbrPieces: string;
  nbrChambres: string;
  nbrSdb: string;
  nbrToilettes: string;
  nbrPlacards: string;
  cave: string;
  surfaceCave: string;
  descriptifCave: string;
  grenier: string;
  surfaceGrenier: string;
  descriptifGrenier: string;
  cuisineEquipee: string;
  surfaceCuisine: string;
  revetementEntree: string;
  revetementSalon: string;
  revetementSejour: string;
  revetementCuisine: string;
  revetementSdb: string;
  revetementChambres: string;
  garage: string;
  nbrPlacesGarage: string;
  parking: string;
  nbrPlacesParking: string;
  anneeConstruction: string;
  dpe: string;
  referenceBien: string;
  loueLocation: string;
  venduVente: string;
  visible: string;
  video: string;
  photo0: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photoCount: number;

  constructor(private modalController: ModalController, private apiService: ApiService, private navParams: NavParams) { }

  ngOnInit() {
    this.modalId = this.navParams.data.id;
    this.getEntry(this.modalId);
    this.slider = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };
  }

  ionViewDidEnter(){
    for(let i = 0; i < this.photoCount; i++)
    {
      this.slider.slidesItems[i] = {"name": this["photo" + i]};
    }
  }

  //Aller au prochain slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Aller au slide précédent
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Méthode appelée quand on change de slide
  slideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Méthodes pour vérifier si le slide est le premier ou dernier, pour activer/désactiver la navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  getEntry(id) {
    this.photoCount = 0;
    this.apiService.getDbEntry(id).subscribe(data => {
      this.dbEntry = JSON.parse(JSON.stringify(data));
      this.identifiant = data.identifiant;
      this.typeOffre = data.type_offre;
      this.typeBien = data.type_bien;
      this.descriptifBien = data.descriptif_bien;
      if(data.type_offre == "location")
      {
        this.proprietaireLocation = data.proprietaire_location;
        this.loyerLocation = data.loyer_location;
        this.chargesLocation = data.charges_location;
        this.loueLocation = data.loue_location;
      }
      if(data.type_offre == "vente")
      {
        this.prixVente = data.prix_vente;
        this.taxesVente = data.taxes_vente;
        this.venduVente = data.vendu_vente;
      }
      this.adresse = data.adresse;
      this.codePostal = data.code_postal;
      this.commune = data.commune;
      this.secteur = data.secteur;
      if(data.numero_etage != "-1")
      {
        this.numEtage = data.numero_etage;
      }
      if(data.nbr_etages != "0")
      {
        this.nbrEtages = data.nbr_etages;
      }
      this.surfaceBien = data.surface_bien;
      if(data.surface_terrain != "0")
      {
        this.surfaceTerrain = data.surface_terrain;
      }
      this.nbrPieces = data.nbr_pieces;
      this.nbrChambres = data.nbr_chambres;
      this.nbrSdb = data.nbr_sdb;
      this.nbrToilettes = data.nbr_toilettes;
      this.nbrPlacards = data.nbr_placards;
      this.cave = data.cave;
      if(data.cave != "non")
      {
        this.surfaceCave = data.surface_cave;
        this.descriptifCave = data.descriptif_cave;
      }
      this.grenier = data.grenier;
      if(data.grenier != "non")
      {
        this.surfaceGrenier = data.surface_grenier;
        this.descriptifGrenier = data.descriptif_grenier;
      }
      this.cuisineEquipee = data.cuisine_equipee;
      this.surfaceCuisine = data.surface_cuisine;
      this.revetementEntree = data.revetement_entree;
      this.revetementSalon = data.revetement_salon;
      this.revetementSejour = data.revetement_sejour;
      this.revetementCuisine = data.revetement_cuisine;
      this.revetementSdb = data.revetement_sdb;
      this.revetementChambres = data.revetement_chambres;
      this.garage = data.garage;
      if(data.garage != "non")
      {
        this.nbrPlacesGarage = data.nbr_places_garage;
      }
      this.parking = data.parking;
      if(data.parking != "0")
      {
        this.nbrPlacesParking = data.nbr_places_parking;
      }
      this.anneeConstruction = data.annee_construction;
      this.dpe = data.dpe;
      this.referenceBien = data.reference_bien;
      this.visible = data.visible;
      this.video = data.video;
      this.photo0 = data.photo_0;
      this.photoCount++;
      if(data.photo_1)
      {
        this.photo1 = data.photo_1;
        this.photoCount++;
      }
      if(data.photo_2)
      {
        this.photo2 = data.photo_2;
        this.photoCount++;
      }
      if(data.photo_3)
      {
        this.photo3 = data.photo_3;
        this.photoCount++;
      }
      if(data.photo_4)
      {
        this.photo4 = data.photo_4;
        this.photoCount++;
      }
    });
  }

  async closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
