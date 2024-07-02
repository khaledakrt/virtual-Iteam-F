import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root',
})
export class ImageService {
    private imageEndpoint = 'http://localhost:3002/uploads/'; // Update the URL accordingly

    constructor() {}

    getImageUrl(imageFileName: string): string {
        return `${this.imageEndpoint}${imageFileName}`;
    }
}
