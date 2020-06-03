import { Component, OnInit, ViewChild, ElementRef, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../services/upload';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { StlModelViewerComponent } from '../components/angular-stl-model-viewer/angular-stl-model-viewer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public resetUpload: boolean;
  @ViewChild('stlviewer', { static: false }) stlviewerEl: StlModelViewerComponent;
  files: any[] = [];
  ids: string[] = [];

  public afuConfig: AngularFileUploaderConfig = {
    theme: 'dragNDrop',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    maxSize: 1,
    uploadAPI: {
      url: `${this.baseUrl}api/Files/UploadFiles`,
    },
    formatsAllowed: '.stl',
    //multiple: true,
    multiple: false,
  };

  constructor(private _formBuilder: FormBuilder,
              @Inject('BASE_URL') private baseUrl: string,
              private zone: NgZone,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      companyNameCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({

    });
    this.thirdFormGroup = this._formBuilder.group({

    });

  }

  public stepChanged(e) {
    let file = 0;
    if (e.selectedIndex === 2) {
      this.zone.run(() => {
        this.stlviewerEl.stlModels = [`'${this.baseUrl}api/Files/GetFile?fileId=${this.ids[file]}'`];
        this.cdr.detectChanges();
        this.stlviewerEl.onWindowResize();
      });
    }
  }

  public docUpload(env) {
    console.log(env);

    if (env && env.body) {
      this.ids = env.body.ids;
    }
  }
}
