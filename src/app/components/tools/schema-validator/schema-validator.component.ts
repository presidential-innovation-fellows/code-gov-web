import { Component, ChangeDetectorRef } from '@angular/core';
import { MonacoEditorService } from '../../monaco-editor';

/**
 * Class representing the schema validator tool.
 */

@Component({
  selector: 'schema-validator',
  template: require('./schema-validator.template.html'),
  styles: [require('./schema-validator.style.scss')],
})

export class SchemaValidatorComponent {
  private codeJson: string;
  private monaco: any;
  private _model: any;
  private editor: any;
  private errors = [];
  private version = '2.0.0';

  /**
   * Constructs a SchemaValidatorComponent.
   *
   * @constructor
   * @param {MonacoEditorService} monacoEditor - a service keeping track of the Monaco editor state
   * @param {ChangeDetectorRef} changeDetectorRef - service for alerting Angular to update
   */
  constructor(
    private monacoEditor: MonacoEditorService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    monacoEditor.addSchema('2.0.0.json', ['*-2.0.0.json'], require('../../../../assets/schemas/2.0.0.json'));
    monacoEditor.addSchema('1.0.1.json', ['*-1.0.1.json'], require('../../../../assets/schemas/1.0.1.json'));
  }

  /**
   * When setting the model, update the errors list.
   *
   * @param {any} m - the new Model for the Monaco Editor
   */
  set model(m) {
    this._model = m;
    this._model.onDidChangeDecorations(() => {
      this.errors = this.model.getAllDecorations()
        .filter(decoration => decoration.isForValidation);
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
   * Get the current Model for the Monaco Editor.
   */
  get model() {
    return this._model;
  }

  /**
   * Scroll the Monaco Editor to the position of an error.
   *
   * @param {any} error - a Monaco Marker representing an error in the user's input
   */
  scrollToError(error) {
    const { startMarker, endMarker } = error;
    const range = new this.monaco.Range(
      startMarker.position.lineNumber,
      startMarker.position.column,
      endMarker.position.lineNumber,
      endMarker.position.column,
    );
    this.editor.revealRange(range);
    this.editor.setPosition(startMarker.position);
    this.editor.focus();
  }
}
