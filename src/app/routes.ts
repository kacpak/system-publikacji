import {provideRouter, RouterConfig}  from '@angular/router';
import {PublicationsComponent} from './components/publications';
import {EditPublicationComponent} from "./components/edit-publication";
import {AddPublicationComponent} from "./components/add-publication";
import {DeletePublicationComponent} from "./components/delete-publication";

const routes: RouterConfig = [
    { path: '', component: PublicationsComponent },
    { path: 'add', component: AddPublicationComponent },
    { path: 'edit/:id', component: EditPublicationComponent },
    { path: 'delete/:id', component: DeletePublicationComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];