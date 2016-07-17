import {Component}          from '@angular/core';
import {ROUTER_DIRECTIVES}  from '@angular/router';
import {PublicationsComponent} from "./publications";
import {EditPublicationComponent} from "./edit-publication";
import {AddPublicationComponent} from "./add-publication";
import {DeletePublicationComponent} from "./delete-publication";

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.html',
    directives: [ROUTER_DIRECTIVES],
    precompile: [PublicationsComponent, AddPublicationComponent, EditPublicationComponent, DeletePublicationComponent]
})
export class AppComponent {
}
