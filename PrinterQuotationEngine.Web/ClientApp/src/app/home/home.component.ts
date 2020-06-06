import { Component, OnInit, ViewChild, ElementRef, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { StlModelViewerComponent } from '../components/angular-stl-model-viewer/angular-stl-model-viewer.component';
import { OptionsService } from '../services/options';
import { PrintOptions, Material } from '../models/printerOptions';
import { NgxSpinnerService } from 'ngx-spinner';

import * as _ from 'underscore';
import { QuoteService } from '../services/quote';
import { Quote } from '../models/quote';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private options: PrintOptions;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public resetUpload: boolean;
  @ViewChild('stlviewer') stlviewerEl: StlModelViewerComponent;
  files: any[] = [];
  ids: string[] = [];

  public material: string = 'PLA';
  public infill: number = 25;
  public color: string = 'Gray';
  public quantity: number = 1;

  public materials = [];
  public colors = [];

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
    public zone: NgZone,
    private optionsService: OptionsService,
    private spinner: NgxSpinnerService,
    private quoteService: QuoteService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      companyNameCtrl: [''],
      phoneCtrl: [''],
      jobTitleCtrl: ['', Validators.required],
      jobDescriptionCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({

    });
    this.thirdFormGroup = this._formBuilder.group({

    });

    this.optionsService.getOptions().subscribe((data) => {
      this.zone.run(() => {
        this.options = data;
        this.materials = data.materials;
        this.colors = this.getColors();
      });
    });
  }

  public async stepChanged(e) {
    let file = 0;
    if (e.selectedIndex === 2) {
      this.stlviewerEl.hasControls = true;
      this.stlviewerEl.stlModels = [`${this.baseUrl}api/Files/GetFile?fileId=${this.ids[file]}`];
      await this.stlviewerEl.load();
    } else if (e.selectedIndex === 3) {
      this.getQuote();
    }
  }

  public docUpload(env) {
    console.log(env);

    if (env && env.body) {
      this.ids = env.body.ids;
    }
  }

  public materialChange(e) {
    this.colors = this.getColors();
  }

  public getMaterials() {
    if (this.options && this.options.materials) {
      return _.pluck(this.options.materials, 'name');
    } else {
      return new Array();
    }
  }

  public getColors() {
    if (this.options) {
      const selectedMaterial = this.getSelectedMaterialOption();

      if (selectedMaterial) {
        return selectedMaterial.colors;
      } else {
        return new Array();
      }
    } else {
      return new Array();
    }
  }

  private getSelectedMaterialOption(): Material {
    if (this.options && this.options.materials) {
      const that = this;
      return this.options.materials.find(function (o) { return o.name === that.material; });
    } else {
      return null;
    }
  }

  private getQuote() {
    this.spinner.show();
    const quote = new Quote();
    quote.FirstName = this.firstFormGroup.controls['firstNameCtrl'].value;
    quote.LastName = this.firstFormGroup.controls['lastNameCtrl'].value;
    quote.EmailAddress = this.firstFormGroup.controls['emailCtrl'].value;
    quote.PhoneNumber = this.firstFormGroup.controls['phoneCtrl'].value;
    quote.CompanyName = this.firstFormGroup.controls['companyNameCtrl'].value;
    quote.JobName = this.firstFormGroup.controls['jobTitleCtrl'].value;
    quote.JobDescription = this.firstFormGroup.controls['jobDescriptionCtrl'].value;

    quote.FileId = this.ids[0];
    quote.Material = this.material;
    quote.Color = this.color;
    quote.Infill = Number(this.infill);
    quote.Quantity = Number(this.quantity);

    this.quoteService.getQuote(quote).subscribe((data) => {


      this.spinner.hide();
    });
  }
}
