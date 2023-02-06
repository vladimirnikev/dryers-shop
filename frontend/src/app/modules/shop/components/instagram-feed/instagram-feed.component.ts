import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

declare const Instafeed: any;

@Component({
  selector: 'app-instagram-feed',
  templateUrl: './instagram-feed.component.html',
  styleUrls: ['./instagram-feed.component.scss'],
})
export class InstagramFeedComponent implements OnInit {
  ngOnInit(): void {
    const instafeed = new Instafeed({
      accessToken: environment.instagramToken,
      target: 'instafeed',
      limit: 3,
      template:
        '<a class="insta-post" href="{{link}}"><img title="{{caption}}" src="{{image}}" /></a>',
    });
    instafeed.run();
  }
}
