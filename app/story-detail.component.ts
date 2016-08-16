import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Story } from './story';
import { StoryService } from './story.service';

import { LIST_IDS } from './temp-stories';

@Component({
  selector: 'story-detail',
  styleUrls: ['styles/tables.css', 'styles/story-detail.component.css'],
  templateUrl: 'templates/story-detail.component.html'
})

export class StoryDetailComponent implements OnInit {
  story: Story;
  navigated = false;
  ids: any = LIST_IDS;

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getIDs();

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.storyService.getStory(id)
            .then(story => this.story = story);
      } else {
        this.navigated = false;
        this.story = new Story();
      }
    });
  }

  goBack(savedStory: Story = null) {
    //this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }

  log(info: any) {
    console.log(info);
  }

  getIDs() {
    this.storyService.getIDs().then(ids => this.ids = ids);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
