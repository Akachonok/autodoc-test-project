import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';
import { INews } from 'src/app/models/news';
import { AutodocService } from 'src/app/services/autodoc.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  newsList: INews[] = [];

  constructor(private autodocService: AutodocService) {}

  ngOnInit(): void {
    this.loadNewsList();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  loadNewsList(): void {
    this.autodocService
      .getNewsList()
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => EMPTY),
        tap((result) => {
          this.newsList = result.news || [];
          console.log(result);
        })
      )
      .subscribe();
  }

  openDialog(): void {}
}
