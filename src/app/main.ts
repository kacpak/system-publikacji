import {bootstrap}          from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS}     from '@angular/http';
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import {enableProdMode}     from '@angular/core';

import {AppComponent}       from './components/app';
import {appRouterProviders} from './routes'
import {BackendService} from "./services/backend";

//enableProdMode();
bootstrap(AppComponent, [
    BackendService,
    HTTP_PROVIDERS,
    appRouterProviders,
    disableDeprecatedForms(),
    provideForms()
]).catch(err => console.error(err));