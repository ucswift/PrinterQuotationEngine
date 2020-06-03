import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../services/upload';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFileUploaderConfig } from 'angular-file-uploader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  public afuConfig: AngularFileUploaderConfig = {
    theme: 'dragNDrop',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    maxSize: 1,
    uploadAPI: {
      url: 'https://slack.com/api/files.upload',
    },
    formatsAllowed: '.stl',
    multiple: true,
  };

  constructor(private _formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      companyNameCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


  }


  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  private uploadFile(index: number, file) {
    const formData = new FormData();
    formData.append('file', file.data);
    this.files[index].inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.files[index].progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (let index = 0; index < files.length; index++) {
      const item = files[index];
      item.progress = 0;
      this.files.push(item);
      this.uploadFile(index, item);
    }
    const fileUpload = this.fileDropEl.nativeElement;
    fileUpload.value = '';
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
