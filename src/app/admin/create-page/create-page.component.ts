import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";
import {HttpResponse} from "@angular/common/http";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss'
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(private service: PostsService, private alert: AlertService) {
    this.form = new FormGroup<any>({});
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) return;
    const post: Post = {
      text: this.form.value.title,
      author: this.form.value.author,
      title: this.form.value.title,
      date: new Date()
    };
    this.service.create(post).subscribe((res: Post) => {
      this.alert.success("The post has been successfully created!");
      this.form.reset();
    })
  }
}
