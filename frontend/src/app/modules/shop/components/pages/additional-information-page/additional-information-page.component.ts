import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-information-page',
  templateUrl: './additional-information-page.component.html',
  styleUrls: ['./additional-information-page.component.scss'],
})
export class AdditionalInformationPageComponent implements OnInit {
  lastPartOfPath: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.lastPartOfPath = url.slice(-1)[0].path;
    });
  }
}
