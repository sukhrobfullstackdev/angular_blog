import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  posts: Array<Post> = [];
  postsSubscription: Subscription = new Subscription();
  postsDeleteSubscription: Subscription = new Subscription();
  searchString: string = '';

  constructor(private postsService: PostsService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.postsSubscription = this.postsService.getAll().subscribe((posts: Array<Post>) => {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
    this.postsDeleteSubscription.unsubscribe();
  }

  delete(id: string | undefined) {
    this.postsDeleteSubscription = this.postsService.remove(id).subscribe(() => {
      this.alertService.success("The post has been successfully deleted!");
      this.posts = this.posts.filter((post: Post) => post.id !== id);
    });
  }
}
