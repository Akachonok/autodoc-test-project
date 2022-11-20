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
import { INews } from 'src/app/models/news';
import { AutodocService } from 'src/app/services/autodoc.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  isloadingNewsList: boolean = false;
  newsList: INews[] = [];

  listConfig = {
    pageNumber: 1,
    countNews: 10,
  };

  constructor(
    private autodocService: AutodocService,
    private cdr: ChangeDetectorRef
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
        catchError((error) => EMPTY),
        tap((result) => {
          this.newsList.push(...result.news);
        })
      )
      .subscribe()
      .add(() => {
        this.isloadingNewsList = false;
        this.cdr.detectChanges();
      });
  }

  onWindowScroll(e: any) {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      this.listConfig.pageNumber++;
      this.loadNewsList(this.listConfig);
    }
  }

  openDialog(): void {}

  getUrl(url: string): string {
    return url.split('/')[1] || '';
  }
}
