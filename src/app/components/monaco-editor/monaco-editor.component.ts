import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MonacoEditorService } from './monaco-editor.service';

@Component({
  selector: 'monaco-editor',
  template: require('./monaco-editor.template.html'),
  styles: [require('./monaco-editor.style.scss')]
})

export class MonacoEditorComponent {
  private static loadMonaco: Promise<any>;

  @Input() private monaco: any;
  @Output() private monacoChange = new EventEmitter<any>();
  @Input() private editor: any;
  @Output() private editorChange = new EventEmitter<any>();
  @Input() private model: any;
  @Output() private modelChange = new EventEmitter<any>();
  @Input() private text: string;
  @Input() private fileName: string;
  @ViewChild('monacoEditor') private editorElement: ElementRef;

  constructor(private monacoEditor: MonacoEditorService) {}

  initMonaco() {
    this.monaco = (<any>window).monaco;
    this.monacoChange.emit(this.monaco);

    this.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: this.monacoEditor.getSchemas()
    });

    this.model = this.monaco.editor.createModel(this.text, 'json', `inmemory://${this.fileName}`);
    this.modelChange.emit(this.model);

    this.editor = this.monaco.editor.create(this.editorElement.nativeElement, {
      model: this.model,
      minimap: {
        enabled: false
      },
      automaticLayout: true
    });
    this.editorChange.emit(this.editor);
  }

  onGotAmdLoader(resolve) {
    (<any>window).require(['vs/editor/editor.main'], () => {
      this.initMonaco();
      resolve();
    });
  }

  ngAfterViewInit() {
    if (MonacoEditorComponent.loadMonaco) {
      return MonacoEditorComponent.loadMonaco.then(() => this.initMonaco());
    }

    MonacoEditorComponent.loadMonaco = new Promise((resolve) => {
      const loaderScript = window.document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'vs/loader.js';
      loaderScript.addEventListener('load', () => {
        this.onGotAmdLoader.call(this, resolve);
      });
      window.document.body.appendChild(loaderScript);
    });
  }

  ngOnDestroy() {
    this.editor.dispose();
    this.model.dispose();
  }
}
