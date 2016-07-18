import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {BackendService} from '../services/backend'
import {Publication} from '../models/publication';
import {OrderByPipe} from './../pipes/orderByPipe';
import {FilterPipe} from "../pipes/filterPipe";

@Component({
    selector: 'publications',
    templateUrl: 'templates/publications.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [OrderByPipe, FilterPipe]
})
export class PublicationsComponent implements OnInit {
    order = 'title';
    searchFilter: string;
    refreshInProgress = false;
    data: Publication[];

    constructor(private publicationService: BackendService) {
    }

    ngOnInit() {
        this.refresh();
    }

    public onClick(id: string) {
        this.publicationService.getPublication(id).subscribe(
            publication => console.log(publication)
        )
    }

    public refresh(): void {
        this.refreshInProgress = true;
        this.publicationService.getPublications().subscribe(
            publications => {
                this.data = publications;
                this.refreshInProgress = false;
            },
            error => {
                this.refreshInProgress = false;
                console.error(error);
            }
        );
    }

    public orderListBy(orderBy: string) {
        this.order = orderBy;
    }
}
