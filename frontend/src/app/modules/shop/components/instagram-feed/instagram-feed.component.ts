import { Component, OnInit } from '@angular/core';

declare const instafeed: any;

@Component({
  selector: 'app-instagram-feed',
  templateUrl: './instagram-feed.component.html',
  styleUrls: ['./instagram-feed.component.scss'],
})
export class InstagramFeedComponent implements OnInit {
  ngOnInit(): void {
    instafeed.run();
  }
}
