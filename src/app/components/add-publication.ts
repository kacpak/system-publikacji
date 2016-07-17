import {Component} from "@angular/core";
import {Publication} from "../models/publication";
import {BackendService} from "../services/backend";
import {Router} from "@angular/router";

@Component({
    selector: 'add-publication',
    templateUrl: 'templates/edit-publication.html'
})
export class AddPublicationComponent {

    protected formDisabled = false;
    protected model: Publication;

    constructor(protected router: Router, protected backend: BackendService) {
        this.model = new Publication();
    }

    save(): void {
        this.formDisabled = true;

        this.backend.addPublication(this.model).subscribe(
            response => this.goToPublicationsList(),
            error => this.formDisabled = false
        );
    }

    goToPublicationsList(): void {
        this.router.navigate(['/']);
    }
}