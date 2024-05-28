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
  vms: Vm[] = [];
  vmDialog: boolean = false;
  deleteVmDialog: boolean = false;
  deleteVmsDialog: boolean = false;
  vm: Vm = this.initializeVm();
  selectedvms: Vm[] = [];
  submitted: boolean = false;

  vmCols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'private_ips', header: 'Private IPs' },
    { field: 'floating_ips', header: 'Floating IPs' },
    // Ajoutez d'autres colonnes si nécessaire pour les propriétés spécifiques aux VMs
  ];

  constructor(private vmService: VmService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadVms();
  }

  loadVms() {
    this.vmService.getVms().subscribe((data) => {
      this.vms = data;
    });
  }
  openNew() {
    this.vm = this.initializeVm();
    this.submitted = false;
    this.vmDialog = true;
  }

  
  

  deleteSelectedVms() {
    // Logique de suppression similaire à celle du composant des enseignants (teachers)
  }

  deleteVm(vm: Vm) {
    // Logique de suppression similaire à celle du composant des enseignants (teachers)
  }

  confirmDeleteSelected() {
    // Logique de suppression similaire à celle du composant des enseignants (teachers)
  }

  confirmDelete() {
    // Logique de suppression similaire à celle du composant des enseignants (teachers)
  }

  hideDialog() {
    this.vmDialog = false;
    this.submitted = false;
  }

  initializeVm(): Vm {
    return {
      _id: '',
      name: '',
      private_ips: '',
      floating_ips: '',
      // Initialisez d'autres propriétés VM si nécessaire
    };
  }

  onGlobalFilter(event: any) {
    // Implémentez la logique de filtrage global si nécessaire
  }
}
