import { Component, OnInit } from '@angular/core';
import { InstanceService } from 'src/app/demo/service/Instance.Service';
import { AuthStudentService } from 'src/app/demo/service/auth-student.service'; // Assurez-vous d'importer correctement votre service d'authentification étudiant

@Component({
  selector: 'app-my-vms',
  templateUrl: './my-vms.component.html',
  styleUrls: ['./my-vms.component.scss']
})
export class MyVmsComponent implements OnInit {
  instances: any[] = []; // Tableau pour stocker les instances
  securityGroupAdded: string | null = null; // Variable pour stocker le nom du groupe de sécurité ajouté
  floatingIpAdded: string | null = null; // Variable pour stocker l'adresse IP flottante ajoutée
  defaultSecurityGroupName = 'Groupe1'; // Nom du groupe de sécurité par défaut

  constructor(
    private instanceService: InstanceService,
    private authStudentService: AuthStudentService
  ) {}

  ngOnInit() {
    // Récupération de l'ID de l'étudiant connecté
    const studentId = this.authStudentService.getLoggedInStudentId();

    if (studentId) {
      // Appel du service pour récupérer les instances par ID d'étudiant
      this.instanceService.getInstancesByStudentId(studentId).subscribe(
        (data) => {
          this.instances = data; // Assignation des données récupérées au tableau instances
        },
        (error) => {
          console.error('Erreur lors de la récupération des instances:', error);
        }
      );
    } else {
      console.error('ID de l\'étudiant connecté non trouvé.');
    }
  }

  startInstance(instanceId: string) {
    this.instanceService.startInstance(instanceId).subscribe(
      (response) => {
        console.log('Instance started successfully:', response);
        // Vous pouvez ajouter un code pour mettre à jour l'interface utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors du démarrage de l\'instance:', error);
      }
    );
  }

  stopInstance(instanceId: string) {
    this.instanceService.stopInstance(instanceId).subscribe(
      (response) => {
        console.log('Instance stopped successfully:', response);
        // Vous pouvez ajouter un code pour mettre à jour l'interface utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'arrêt de l\'instance:', error);
      }
    );
  }

  assignFloatingIp(instanceId: string) {
    this.instanceService.assignFloatingIp(instanceId).subscribe(
      (response) => {
        console.log('Floating IP assigned successfully:', response);
        if (response && response.message) {
          this.floatingIpAdded = response.message;
        }
        // Mettez à jour l'interface utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'assignation de l\'adresse IP flottante:', error);
      }
    );
  }

  assignSecurityGroup(instanceId: string) {
    this.instanceService.assignSecurityGroup(instanceId).subscribe(
      (response) => {
        console.log('Security group assigned successfully:', response);
        if (response && response.message) {
          this.securityGroupAdded = response.message; // Utilisez la réponse du backend si elle contient le nom du groupe
        } else {
          this.securityGroupAdded = this.defaultSecurityGroupName; // Utilisez le nom par défaut si la réponse du backend ne contient pas le nom du groupe
        }
        // Mettez à jour l'interface utilisateur si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'assignation du groupe de sécurité:', error);
      }
    );
  }
}
