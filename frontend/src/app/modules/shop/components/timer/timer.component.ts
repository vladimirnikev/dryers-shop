import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  milliSecondsInASecond = 1000;

  hoursInADay = 24;

  minutesInAnHour = 60;

  SecondsInAMinute = 60;

  public timeDifference = 0;

  public secondsToDday = 0;

  public minutesToDday = 0;

  public hoursToDday = 0;

  public daysToDday = 0;

  public dateNow = new Date();

  // public dDay = new Date('Jan 01 2023 00:00:00');
  public dDay = new Date(
    this.dateNow.getTime() +
      72 * this.minutesInAnHour * this.SecondsInAMinute * this.milliSecondsInASecond,
  );

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute,
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute,
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute)) %
        this.hoursInADay,
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay),
    );
  }

  ngOnInit() {
    this.subscription = interval(1000).subscribe(() => {
      this.getTimeDifference();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
