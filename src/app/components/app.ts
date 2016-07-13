import {Component, OnInit} from '@angular/core';
import {BackendService} from '../services/backend'
import {Publication} from '../models/publication';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/publications.html',
    providers: [
        BackendService
    ]
})
export class AppComponent implements OnInit {
    sortType = 'title';
    sortReverse = false;
    refreshInProgress = false;
    data: Publication[];

    constructor(private publicationService: BackendService) {
    }

    ngOnInit() {
        this.refresh();
    }

    public refresh(): void {
        this.refreshInProgress = true;
        this.publicationService.getPublications().subscribe(
            publications => {
                this.data = publications;
                this.refreshInProgress = false;
            },
            error => this.refreshInProgress = false
        );
    }
}
