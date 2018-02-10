import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ApiService } from '../api';
import { AgencyService } from '../agency';

@Injectable()
export class HelpWantedService extends ApiService {
  public tasks: any;

  constructor(private http: Http, private agencyService: AgencyService) {
    super(http);
  }

  cleanTask(task) {

    if (!task.agency) {
      task.agency = this.agencyService.getAgency(task.agency_id);
    }

    if (!task.image && task.agency_id) {
        task.image = `assets/img/logos/agencies/${task.agency_id}-50x50.png`;
    }
    return task;
  }

  cleanTasks(tasks) {
    return tasks.map(task => this.cleanTask(task));
  }

  getTasks() {
    return fetch('assets/help-wanted.json')
        .then(response => response.json())
        .then(tasks => this.cleanTasks(tasks.items));
  }

}
