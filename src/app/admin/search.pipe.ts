import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../shared/interfaces";

@Pipe({
  name: 'searchField',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Array<Post>, search: string = ''): Array<Post> {
    if (!search.trim()) return posts;
    return posts.filter((post: Post) => post?.title?.toLowerCase().includes(search.toLowerCase().trim()));
  }
}
