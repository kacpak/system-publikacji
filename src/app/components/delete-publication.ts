import {Component, OnInit} from "@angular/core";
import {Publication} from "../models/publication";
import {Router, ActivatedRoute} from "@angular/router";
import {BackendService} from "../services/backend";

@Component({
    selector: 'delete-publication',
    templateUrl: 'templates/delete-publication.html'
})
export class DeletePublicationComponent implements OnInit {

    data: Publication;
    formDisabled = true;

    constructor(protected router: Router, protected route: ActivatedRoute, protected backend: BackendService) {
        this.data = new Publication();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.backend.getPublication(params['id']).subscribe(
                publication => {
                    this.data = publication;
                    this.formDisabled = false;
                }
            );
        });
    }

    deletePublication(): void {
        console.log(JSON.stringify(this.data, null, 2));
        this.backend.deletePublication(this.data._id, this.data._rev).subscribe(
            response => this.goToPublicationsList(),
            error => console.error(error)
        );
    }

    goToPublicationsList(): void {
        this.router.navigate(['/']);
    }
}