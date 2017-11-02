import { ChangeDetectorRef, Component } from '@angular/core';
import clone from 'lodash/clone';
import { MonacoEditorService } from '../../monaco-editor';
import * as Clipboard from 'clipboard';

/**
 * Class representing the upgrade schema tool.
 */

@Component({
  selector: 'upgrade-schema',
  template: require('./upgrade-schema.template.html'),
  styles: [require('./upgrade-schema.style.scss')]
})

export class UpgradeSchemaComponent {
  private monaco: any;
  private beforeEditor: any;
  private beforeText: string;
  private afterEditor: any;
  private _afterModel: any;
  private isBeforeMinimized = false;
  private isAfterMinimized = true;
  private clipboard: any;
  private errors = [];

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
    monacoEditor.addSchema('1.0.1.json', ['-1.0.1.json'], require('../../../../assets/schemas/1.0.1.json'));
    monacoEditor.addSchema('2.0.0.json', ['-2.0.0.json'], require('../../../../assets/schemas/2.0.0.json'));
  }

  /**
   * After the component is added to the DOM, create a Clipboard button.
   */
  ngAfterViewInit() {
    this.clipboard = new Clipboard('.upgrade-schema__copy-button', {
      text: () => {
        return this.afterEditor.getValue();
      }
    });
  }

  /**
   * When removing the component from the DOM, remove the Clipboard button.
   */
  ngOnDestroy() {
    this.clipboard.destroy();
  }

  /**
   * When setting the upgraded model, update the errors list.
   *
   * @param {any} m - the new Model for the Monaco Editor
   */
  set afterModel(m) {
    this._afterModel = m;
    this._afterModel.onDidChangeDecorations(() => {
      this.errors = this._afterModel.getAllDecorations()
        .filter(decoration => decoration.isForValidation);
      this.changeDetectorRef.detectChanges();
    });
  }

  /**
   * Get the current Model for the upgraded Monaco Editor.
   */
  get afterModel() {
    return this._afterModel;
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
    this.afterEditor.revealRange(range);
    this.afterEditor.setPosition(startMarker.position);
    this.afterEditor.focus();
  }

  /**
   * Add optional fields to the project
   *
   * @param {Object} project - a project to be upgraded to contain the optional
   *   fields in the 2.0.0 schema
   */
  upgradeOptionalFields(project) {
    project.vcs = project.vcs || '';
    project.disclaimerText = project.disclaimerText || '';
    project.disclaimerURL = project.disclaimerURL || '';
    project.relatedCode = [{
      codeName: '',
      codeURL: '',
      isGovernmentRepo: true,
    }];
    project.reusedCode = [{
      name: '',
      URL: '',
    }];
  }

  /**
   * Add the permissions property to a project
   *
   * @param {Object} project - a project to be upgraded to contain the
   *   permissions property
   */
  upgradeToPermissions(project) {
    project.permissions = {};

    project.permissions.licenses = [];

    if (project.license) {
      project.permissions.licenses.push({
        URL: project.license,
        name: null
      });
    } else {
      project.permissions.licenses.push({
        URL: null,
        name: null
      });
    }

    delete project.license;

    if (project.openSourceProject === 1) {
      project.permissions.usageType = 'openSource';
      project.permissions.exemptionText = null;
    } else if (project.governmentWideReuseProject === 1) {
      project.permissions.usageType = 'governmentWideReuse';
      project.permissions.exemptionText = null;
    } else if (String(project.exemption) === '1') {
      project.permissions.usageType = 'exemptByLaw';
      project.permissions.exemptionText = 'The sharing of the source code is restricted by ' +
        'law or regulation, including—but not limited to—patent or intellectual property ' +
        'law, the Export Asset Regulations, the International Traffic in Arms Regulation, ' +
        'and the Federal laws and regulations governing classified information.';
    } else if (String(project.exemption) === '2') {
      project.permissions.usageType = 'exemptByNationalSecurity';
      project.permissions.exemptionText = 'The sharing of the source code would create an ' +
        'identifiable risk to the detriment of national security, confidentiality of ' +
        'Government information, or individual privacy.';
    } else if (String(project.exemption) === '3') {
      project.permissions.usageType = 'exemptByAgencySystem';
      project.permissions.exemptionText = 'The sharing of the source code would create ' +
        'an identifiable risk to the stability, security, or integrity of the agency’s ' +
        'systems or personnel.';
    } else if (String(project.exemption) === '4') {
      project.permissions.usageType = 'exemptByAgencyMission';
      project.permissions.exemptionText = 'The sharing of the source code would create an ' +
        'identifiable risk to agency mission, programs, or operations.';
    } else if (String(project.exemption) === '5') {
      project.permissions.usageType = 'exemptByCIO';
      project.permissions.exemptionText = 'The CIO believes it is in the national interest ' +
        'to exempt sharing the source code.';
    } else {
      project.permissions.usageType = null;
      project.permissions.exemptionText = null;
    }
    delete project.openSourceProject;
    delete project.governmentWideReuseProject;
    delete project.exemption;
    delete project.exemptionText;
  }

  /**
   * Add the new date property to the project.
   *
   * @param {Object} project - a project to be upgraded to have the new date
   *   property
   */
  upgradeUpdatedToDate(project) {
    project.date = {
      created: '',
      lastModified: '',
      metadataLastUpdated: '',
    };

    if (project.updated) {
      if (project.updated.sourceCodeLastModified) {
        project.date.lastModified = project.updated.sourceCodeLastModified;
      }

      if (project.updated.metadataLastUpdated) {
        project.date.metadataLastUpdated = project.updated.metadataLastUpdated;
      }

      delete project.updated;
    }
  }

  /**
   * Upgrade a project to its version 2.0.0 representation
   *
   * @param {Object} project - a project to be upgraded to the 2.0.0 schema
   */
  upgradeProject(project) {
    project.repositoryURL = project.repository;
    delete project.repository;

    project.homepageURL = project.homepage;
    delete project.homepage;

    this.upgradeToPermissions(project);

    project.laborHours = null;

    this.upgradeUpdatedToDate(project);
    this.upgradeOptionalFields(project);

    return project;
  }

  /**
   * Converts the v1.0.1 version of projects to releases.
   *
   * @param {Object} project - a project to be upgraded to contain the optional
   *   fields in the 2.0.0 schema
   */
  upgradeProjectsToReleases(upgradedCodeJson) {
    if (Array.isArray(upgradedCodeJson.projects)) {
      upgradedCodeJson.releases = upgradedCodeJson.projects
        .map(project => this.upgradeProject(project));
      delete upgradedCodeJson.projects;
    }
  }

  /**
   * Converts a v1.0.1 code.json to v2.0.0
   *
   * @param {Object} value - the JSON representation of a code.json file
   */
  transformCodeJson(value) {
    const upgradedCodeJson = value;

    upgradedCodeJson.version = '2.0.0';
    upgradedCodeJson.measurementType = {
      method: null
    };

    this.upgradeProjectsToReleases(upgradedCodeJson);

    return upgradedCodeJson;
  }

  onDidCreateBeforeEditor(editor) {
    this.beforeEditor = editor;
  }

  onDidCreateAfterEditor(editor) {
    this.afterEditor = editor;
  }

  /**
   * Whether the JSON to be upgraded is valid JSON (whether it is parsable).
   *
   * @return {boolean} - whether the provided JSON is valid
   */
  isValidBeforeJson() {
    try {
      JSON.parse(this.beforeEditor.getValue());

      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Convert the user provided v1.0.1 code.json to a v2.0.0 one.
   */
  upgradeContent(e) {
    try {
      const parsedCodeJson = JSON.parse(this.beforeEditor.getValue());
      const transformedJson = this.transformCodeJson(clone(parsedCodeJson));
      const transformedString = JSON.stringify(transformedJson, null, '\t');

      this.afterEditor.setValue(transformedString);

      this.isBeforeMinimized = true;
      this.isAfterMinimized = false;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Toggle the before editor between its minimized and unminimized states.
   */
  toggleBeforeMinimized() {
    this.isBeforeMinimized = !this.isBeforeMinimized;
  }

  /**
   * Toggle the after editor between its minimized and unminimized states.
   */
  toggleAfterMinimized() {
    this.isAfterMinimized = !this.isAfterMinimized;
  }
}
