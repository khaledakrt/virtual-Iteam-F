import { Component, OnInit } from '@angular/core';
import { VmService } from 'src/app/demo/service/vm.service';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ad-vms',
  templateUrl: './ad-vms.component.html',
  styleUrls: ['./ad-vms.component.scss'],
  providers: [MessageService],
})
export class AdVmsComponent implements OnInit {
  instances: any[] = [];
  images: any[] = [];
  flavors: any[] = [];
  networks: any[] = [];
  view: string = 'instances'; // Set the default view to 'instances'

  constructor(private vmService: VmService) { }

  ngOnInit(): void {
    this.loadInstances();
    this.loadImages();
    this.loadFlavors();
    this.loadNetworks();
  }

  loadInstances(): void {
    this.vmService.getInstances().subscribe(
      data => {
        this.instances = data;
      },
      error => {
        console.error('Error fetching instances:', error);
      }
    );
  }

  loadImages(): void {
   this.vmService.getImages().subscribe(
      data => {
        this.images = data.map(image => {
          image.size = (image.size / (1024 * 1024 * 1024)).toFixed(2); // Convert size from bytes to gigabytes
          return { ...image, size: `${image.size} Go` };
        });
      },
      error => {
        console.error('Error fetching images:', error);
      }
    );
  }

  loadFlavors(): void {
    this.vmService.getFlavors().subscribe(
      data => {
        this.flavors = data;
      },
      error => {
        console.error('Error fetching flavors:', error);
      }
    );
  }

  loadNetworks(): void {
    this.vmService.getNetworks().subscribe(
      data => {
        this.networks = data;
      },
      error => {
        console.error('Error fetching networks:', error);
      }
    );
  }

  selectedInstances: any[] = [];
  selectedImages: any[] = [];
  selectedFlavors: any[] = [];
  selectedNetworks: any[] = [];

  // Other component logic goes here
}
