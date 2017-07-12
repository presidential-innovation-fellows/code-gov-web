import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser';

@Injectable()

export class SeoService {

  private baseTitle: string;
  private titleService: Title;
  private headElement: HTMLElement;
  private metaDescription: HTMLElement;
  private robots: HTMLElement;
  private DOM: any;
  private rendererFactory: RendererFactory2;

  constructor(
    titleService: Title,
    @Inject(DOCUMENT) document,
    @Inject(RendererFactory2) rendererFactory
  ) {
    this.baseTitle = '· Code.gov';
    this.titleService = titleService;
    this.rendererFactory = rendererFactory;
    this.DOM = document;
    this.headElement = this.DOM.head;
    this.metaDescription = this.getOrCreateMetaElement('description');
    this.robots = this.getOrCreateMetaElement('robots');
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string, baseTitle = false) {
    if (baseTitle === true)
      newTitle += ' · Code.gov';
    this.titleService.setTitle(newTitle);
  }

  public getMetaDescription(): string {
    return this.metaDescription.getAttribute('content');
  }

  public setMetaDescription(description: string) {
    this.metaDescription.setAttribute('content', description);
  }

  public getMetaRobots(): string {
    return this.robots.getAttribute('content');
  }

  public setMetaRobots(robots: string) {
    this.robots.setAttribute('content', robots);
  }

  private getOrCreateMetaElement(name: string): HTMLElement {
    let el: HTMLElement;
    el = this.DOM.querySelector('meta[name=' + name + ']');
    if (el === null) {
      const renderer = this.rendererFactory.createRenderer(this.DOM, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });
      el = renderer.createElement('meta');
      renderer.setAttribute(el, 'name', name);
      renderer.appendChild(this.headElement, el);
    }
    return el;
  }
}
