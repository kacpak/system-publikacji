import {Component, OnInit} from "@angular/core";
import {Publication} from "../models/publication";
import {BackendService} from "../services/backend";
import {ActivatedRoute, Router} from "@angular/router";
import {AddPublicationComponent} from "./add-publication";

@Component({
    selector: 'edit-publication',
    templateUrl: 'templates/edit-publication.html'
})
export class EditPublicationComponent extends AddPublicationComponent implements OnInit {

    constructor(protected router: Router, protected route: ActivatedRoute, protected backend: BackendService) {
        super(router, backend);
        this.model = new Publication();
        this.formDisabled = true;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.backend.getPublication(params['id']).subscribe(
                publication => {
                    this.model = publication;
                    this.formDisabled = false;
                }
            );
        });
    }

    save(): void {
        this.formDisabled = true;

        this.backend.updatePublication(this.model._id, this.model).subscribe(
            response => this.goToPublicationsList(),
            error => this.formDisabled = false
        );
    }
}
