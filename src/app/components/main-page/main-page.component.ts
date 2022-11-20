import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  catchError,
  distinctUntilChanged,
  EMPTY,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { INews } from 'src/app/models/news';

import { LocalStorageService } from 'src/app/services/localStorage.service';
import { AutodocService } from 'src/app/services/autodoc.service';

import { AddNewsComponent } from './add-news/add-news.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  newsList: INews[] = [];
  serverNews: INews[] = [];
  isloadingNewsList: boolean = false;

  listConfig = {
    pageNumber: 1,
    countNews: 10,
  };

  constructor(
    private autodocService: AutodocService,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNewsList();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  loadNewsList(listConfig = this.listConfig): void {
    this.isloadingNewsList = true;

    this.autodocService
      .getNewsList(listConfig)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy$),
        catchError(() => {
          this.snackBar.open('Что-то пошло не так');
          return EMPTY;
        }),
        tap((result) => {
          this.serverNews.push(...result.news);
        })
      )
      .subscribe()
      .add(() => {
        this.isloadingNewsList = false;
        this.setNewsList();
        this.cdr.detectChanges();
      });
  }

  setNewsList(): void {
    const state = this.localStorageService.getState() || [];

    this.newsList = [...state.reverse(), ...this.serverNews];
  }

  onWindowScroll(e: any) {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      this.listConfig.pageNumber++;
      this.loadNewsList(this.listConfig);
    }
  }

  openDialog(): void {
    this.dialog
      .open(AddNewsComponent, { width: '500px' })
      .afterClosed()
      .pipe(
        takeUntil(this.onDestroy$),
        tap((result) => {
          if (!result) return;

          this.localStorageService.saveState(result);
          this.setNewsList();
        })
      )
      .subscribe()
      .add(() => this.cdr.detectChanges());
  }

  getUrl(url: string): string {
    return url?.split('/')[1] || '';
  }
}
