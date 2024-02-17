import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent implements OnInit {
  form: FormGroup = new FormGroup<any>({});
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.form = new FormGroup<any>({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        author: new FormControl(post.author, Validators.required),
        name: new FormControl(post.name, Validators.required)
      });
      this.loading = false;
    })
  }

  submit() {

  }
}
