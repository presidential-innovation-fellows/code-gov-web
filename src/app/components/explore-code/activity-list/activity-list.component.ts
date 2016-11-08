import { Component, Input } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { RepoComponent } from '../repo';
import { ReposService } from '../../../services/repos';
import { TruncatePipe } from '../../../pipes/truncate';

@Component({
  selector: 'activity-list',
  styles: ['./activity-list.style.scss'],
  template: './activity-list.template.html'
})

export class ActivityListComponent {
  @Input() eventRepo;
  public activities: any;

  constructor() {}

  ngAfterViewChecked() {
    setTimeout(_ => this.activities = this.eventRepo.events);
  }
}
