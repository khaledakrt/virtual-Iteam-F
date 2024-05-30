import { Component, OnInit } from '@angular/core';
import { Vm } from 'src/app/demo/api/vm'; // Assurez-vous d'importer correctement votre interface VM
import { VmService } from 'src/app/demo/service/vm.service'; // Importez le service approprié pour les VMs
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ad-vms', // Modifiez le sélecteur du composant si nécessaire
  templateUrl: './ad-vms.component.html', // Assurez-vous que le chemin du modèle est correct
  styleUrls: ['./ad-vms.component.scss'], // Assurez-vous que le chemin du fichier de style est correct
  providers: [MessageService],
})
export class AdVmsComponent implements OnInit {
  instances: any[] = [];

  constructor(private VmService: VmService) { }

  ngOnInit(): void {
    this.VmService.getInstances().subscribe(
      data => {
        this.instances = data;
      },
      error => {
        console.error('Error fetching instances:', error);
      }
    );
  }
  selectedInstances: any[] = []; // Define selectedInstances property

  // Other component logic goes here

}
