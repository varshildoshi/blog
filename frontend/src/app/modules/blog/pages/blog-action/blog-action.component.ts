import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BlogEntry } from 'src/app/modules/model/blog-entry.interface';
import { BlogService } from 'src/app/modules/services/blog.service';
import { environment } from 'src/environments/environment';

export interface File {
  data: any,
  progress: number,
  inProgress: boolean
}

@Component({
  selector: 'app-blog-action',
  templateUrl: './blog-action.component.html',
  styleUrls: ['./blog-action.component.scss']
})
export class BlogActionComponent implements OnInit {

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  }

  defaultProfile = '../../../../../assets/images/blank-profile-picture.png';
  blogDefaultImage = '../../../../../assets/images/logo/logo-black-white.png';
  blogForm: FormGroup;
  loading = false;
  errorMessage: any;
  errors: any = [];
  environment = environment;

  isCreatPostSection = false;
  isPreviewPostSection = false;
  isViewPostSection = false;
  pageType = '';

  isPreviewOn = false;

  blogEntry$: Observable<BlogEntry>;
  blogId: number = 0;


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      [
        'indent',
        'outdent',
        'customClasses',
        'insertImage',
        'insertVideo',
        'toggleEditorMode'
      ]
    ]
  };


  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    public fb: FormBuilder,
    private blogService: BlogService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      headerImage: ['', Validators.required],
    });


    this.activatedRoute.data.pipe(
      map((type) => this.pageType = type.pageType)
    ).subscribe();
    this.blogId = this.activatedRoute.snapshot.params['id'];

    this.pageSetup();
  }

  pageSetup() {
    if (this.pageType === 'view') {
      this.isViewPostSection = true;
      this.getBlogByBlogId();
    } else if (this.pageType === 'add') {
      this.isCreatPostSection = true;
      this.isPreviewPostSection = true;
    }
  }

  getBlogByBlogId() {
    this.blogEntry$ = this.blogService.getBlogByBlogId(this.blogId).pipe(
      map((blogEntry: BlogEntry) => {
        return blogEntry;
      })
    );
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0
      }
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData;
    formData.append('file', this.file.data);
    this.file.inProgress = true;

    this.blogService.uploadHeaderImageToBlog(formData).pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed');
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          this.blogForm.patchValue({ headerImage: event.body.filename });
        }
      });
  }

  createPost() {
    this.blogService.createBlog(this.blogForm.value).subscribe(response => {
      if (response) {
        this.openSnackBar('Post created..!');
        this.router.navigate(['/blog']);
      }
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
