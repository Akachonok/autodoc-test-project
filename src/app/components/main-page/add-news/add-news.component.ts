import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent implements OnInit {
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: unknown) {}

  ngOnInit(): void {
    this.initForm();
  }

  handle(event: any): void {
    const reader = new FileReader();

    reader.readAsDataURL(event.files[0]);
    reader.onload = (value) => {
      this.form.controls['titleImageUrl'].setValue(value.target?.result);
    };
  }

  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      titleImageUrl: new FormControl(null, Validators.required),
      publishedDate: new FormControl(new Date()),
    });
  }
}
