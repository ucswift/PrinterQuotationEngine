import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { PrintOptions } from '../models/printerOptions';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    public getQuote(quote: Quote): Observable<PrintOptions> {
        return this.httpClient.post<PrintOptions>(this.baseUrl + 'api/Quote/Process', quote);
    }
}
