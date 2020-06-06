import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { PrintOptions } from '../models/printerOptions';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OptionsService {

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    public getOptions(): Observable<PrintOptions> {
        return this.httpClient.get<PrintOptions>(this.baseUrl + 'api/Options/Get');
    }
}
