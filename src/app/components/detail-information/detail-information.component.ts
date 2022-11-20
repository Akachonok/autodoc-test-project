import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Subject, takeUntil, tap } from 'rxjs';
import { INewsInformation } from 'src/app/models/news';
import { AutodocService } from 'src/app/services/autodoc.service';

@Component({
  selector: 'app-detail-information',
  templateUrl: './detail-information.component.html',
  styleUrls: ['./detail-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailInformationComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  isloadingNews: boolean = false;
  news: INewsInformation;

  constructor(
    private autodocService: AutodocService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  loadNews(): void {
    const carName = this.activatedRoute.snapshot.params['id'];
    this.isloadingNews = true;

    this.autodocService
      .getNewsInfoimationByName(carName)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((error) => EMPTY),
        tap((result) => (this.news = result))
      )
      .subscribe()
      .add(() => {
        console.log(this.news);

        this.isloadingNews = false;
        this.cdr.detectChanges();
      });
  }
}
