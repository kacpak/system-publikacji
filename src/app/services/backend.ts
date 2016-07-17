import {Injectable}         from '@angular/core';
import {Http, Response, Headers, RequestOptionsArgs}   from '@angular/http';
import {Observable}         from 'rxjs/Observable';
import {Publication}        from '../models/publication';
import 'rxjs/Rx';

@Injectable()
export class BackendService {

    private requestOptions: RequestOptionsArgs;

    private data = {
        authorizationKey: 'Basic ZHJvYXJjZXN0ZXJpc3RhcmRzdHJlYXJlOmQ1NDQxY2FmZTc4OWZkMzA1NTY0MWEwYzFmZGFlNjgwZTc3NGUyNDM=',
        hostname: '1000df35-de7b-4fc7-b9b4-e392b56e574b-bluemix.cloudant.com',
        database: 'system-publikacji'
    };

    private endpoint = `https://${this.data.hostname}/${this.data.database}`;

    constructor(private http: Http) {
        let headers = new Headers();
        headers.append('Authorization', this.data.authorizationKey);

        this.requestOptions = {
            headers: headers,
            withCredentials: true
        };
    }

    public getPublication(id: string): Observable<Publication> {
        return this.http.get(`${this.endpoint}/${id}`, this.requestOptions)
            .map((res: Response) => res.json() || {})
            .catch(BackendService.handleError);
    }

    public getPublications(): Observable<Publication[]> {
        return this.http.post(
                    `${this.endpoint}/_find`,
                    {
                        "selector": {
                            "$not": {
                                "_id": "_design"
                            }
                        }
                    },
                    this.requestOptions
                )
                .map((res: Response) =>  res.json().docs || [])
                .catch(BackendService.handleError);
    }

    public addPublication(data: Publication): Observable<Response> {
        return this.http.post(this.endpoint, data, this.requestOptions);
    }

    public updatePublication(id: string, data: Publication): Observable<Response> {
        return this.http.put(`${this.endpoint}/${id}`, data, this.requestOptions);
    }

    public deletePublication(id: string, rev: string): Observable<Response> {
        return this.http.delete(`${this.endpoint}/${id}?rev=${rev}`, this.requestOptions);
    }

    private static handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}