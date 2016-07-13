import {bootstrap}        from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS}   from '@angular/http'

import {AppComponent} from './components/app';
import {enableProdMode} from "@angular/core";

//enableProdMode();
bootstrap(AppComponent, [HTTP_PROVIDERS]);