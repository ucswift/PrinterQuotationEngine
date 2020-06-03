import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    public upload(formData) {
        return this.httpClient.post<any>(this.baseUrl + 'api/Files/UploadFiles', formData, {
            reportProgress: true,
            observe: 'events'
        });
    }
}
