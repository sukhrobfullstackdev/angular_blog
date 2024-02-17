import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {FbCreateResponse, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.firebaseDB}/posts.json`, post).pipe(
      map((res: Post) => {
        const newPost: Post = {
          id: res.name,
          date: new Date(post?.date!),
          text: post.text,
          title: post.title,
          author: post.author
        };
        return newPost;
      })
    );
  }

  getAll(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${environment.firebaseDB}/posts.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res).map(key => ({
          ...res[key], id: key, date: new Date(res[key].date)
        }));
      })
    );
  }

  remove(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseDB}/posts/${id}.json`);
  }

  getById(id: string | undefined): Observable<Post> {
    return this.http.get(`${environment.firebaseDB}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return {...post, id: id || '', date: post.date};
      })
    );
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.firebaseDB}/posts/${post.id}.json`, post).pipe(
      map((post: Post) => {
        return {...post, id: post.id || '', date: post.date};
      })
    );
  }
}
