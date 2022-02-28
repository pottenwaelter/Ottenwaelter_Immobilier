import { ApiService } from './../services/api.service';
import { IonContent, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalOffrePage } from './../modals/modal-offre/modal-offre.page';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  heartType: string="heart-outline";

  dbContent: any[] = [];

  type_bien: string = "";
  type_offre: string = "";
  commune: string = "";
  descriptif_bien: string = "";
  surface_bien: string = "";
  prix_vente: string = "";
  loyer_location: string = "";
  nbr_pieces: string = "";
  photo_0: string = "";

  @ViewChild(IonContent) ionContent: IonContent;

  constructor(private apiService: ApiService, private modalController: ModalController) { }

  ngOnInit() {
    this.apiService.getDbContent().subscribe(
      data => {
        this.dbContent = JSON.parse(JSON.stringify(data));
      }
    )}

  backToTop() {
    this.ionContent.scrollToTop(500);
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

  toggleHeart() {
    if(this.heartType == 'heart-outline')
    {
      this.heartType = 'heart';
    }
    else
    {
      this.heartType = 'heart-outline';
    }
  }

}
