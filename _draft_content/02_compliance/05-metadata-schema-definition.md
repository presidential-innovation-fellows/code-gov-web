# Specification for Metadata Schema

## Overview

Sections 7.2 and 7.3 of the Federal Source Code Policy require covered agencies to provide an inventory of their 'custom-developed code'.

## Specification

### File location and contents

*   `code.json` must live in the root directory of your agency's website.
*   `code.json` must include a single list represented as JSON, of organization JSON objects, as described below.

### Organization JSON Object

Each organization JSON object in the `code.json` file, represents the projects for a given agency + organization pairing. The top level fields on the JSON object:

*   `agency`: [string] The agency acronym. For example "GSA" or "DOD"
*   `organization`: [string] The organization within the agency that the projects listed belong to. For example, "18F" or "Navy".
*   `projects`: [array] Contains list of `project` objects representing each software project, as defined below.

### Project JSON Object

Each project JSON object represents a particular code / software project represented in the code inventory.

#### Required Project Fields

Each `project` object requires the following fields:

*   `name`: [string] The project name
*   `description`: [string] A description of the project
*   `license`: [`null` or string] The URL of the project license, if available. `null` should be used if not.
*   `openSourceProject`: [number] A value indicating whether or not the project is open source.
    *   `0`: The project is not open source.
    *   `1`: The project is open source.
*   `governmentWideReuseProject`: [number] A value indicating whether or not the project is built for government-wide reuse.
    *   `0`: The project is not built for government-wide reuse.
    *   `1`: The project is built for government-wide reuse.
*   `tags`: [array] A list of string alphanumeric keywords that identify the project.
*   `contact`: [object] Information about contacting the project.
    *   `email`: [string] An email address to contact the project.

#### Optional Project Fields

The following `project` object fields are optional:

*   `status`: [string] The development status of the project
    *   `"Ideation"` - brainstorming phase.
    *   `"Alpha"` - initial prototyping phase and internal testing.
    *   `"Beta"` - a project is being tested in public.
    *   `"Production"` - finished project, with development and maintenance ongoing.
    *   `"Archival"` - finished project, but no longer actively maintained.
*   `vcs`: [string] A lowercase string with the name of the Version Control System in use on the project.
*   `repository`: [string] The URL of the public project repository
*   `homepage`: [string] The URL of the public project homepage
*   `downloadURL`: [string] The URL where a distribution of the project can be found.
*   `languages`: [array] A list of strings with the names of the programming languages in use on the project.
*   `contact`: [object] Information about contacting the project.
    *   `name`: [string] The name of a contact or department for the project
    *   `twitter`: [string] The username of the project's Twitter account
    *   `phone`: [string] The phone number to contact a project.
*   `partners`: [array] A list of strings containing the acronyms of agencies partnering on the project.
*   `exemption`: [number] The exemption that excuses the project from government-wide reuse.
    *   `1`: The sharing of the source code is restricted by law or regulation, including—but not limited to—patent or intellectual property law, the Export Asset Regulations, the International Traffic in Arms Regulation, and the Federal laws and regulations governing classified information.
    *   `2`: The sharing of the source code would create an identifiable risk to the detriment of national security, confidentiality of Government information, or individual privacy.
    *   `3`: The sharing of the source code would create an identifiable risk to the stability, security, or integrity of the agency's systems or personnel.
    *   `4`: The sharing of the source code would create an identifiable risk to agency mission, programs, or operations.
    *   `5`: The CIO believes it is in the national interest to exempt sharing the source code.
*   `updated`: [object] Dates that the project and metadata have been updated.
    *   `metadataLastUpdated`: [string] A date in YYYY-MM-DD or ISO 8601 format indicating when the metadata in this file was last updated.
    *   `lastCommit`: [string] A date in ISO 8601 format indicating when the last commit to the project repository was.
    *   `sourceCodeLastModified`: [string] A field intended for closed-source software and software outside of a VCS. The date in YYYY-MM-DD or ISO 8601 format that the source code or package was last updated.

## Example `code.json`

We've created a [sample `code.json`](https://github.com/presidential-innovation-fellows/code-gov-web/blob/master/_draft_content/02_compliance/schema/code.json).
