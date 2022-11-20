import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutodocService } from 'src/app/services/autodoc.service';

@Component({
  selector: 'app-detail-information',
  templateUrl: './detail-information.component.html',
  styleUrls: ['./detail-information.component.scss'],
})
export class DetailInformationComponent implements OnInit {
  constructor(
    private autodocService: AutodocService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const carName = this.activatedRoute.snapshot.params['id'];
    this.autodocService
      .getNewsInfoimationByName(carName)
      .subscribe((res) => console.log(res));
  }
}
