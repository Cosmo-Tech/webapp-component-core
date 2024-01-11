## **1.15.1**&emsp;<sub><sup>2024-01-11 (93d6f7cbafa3dcd4064a49ec7f85ec64984405da...dba7f30759195e5f30ec317027eeea48d88ce17e)</sup></sub>

### Bug Fixes

- fix unexpected unempty value when field is filled with multispaces ([867c3a6](https://github.com/Cosmo-Tech/webapp-component-core/commit/867c3a6f26e344a68c1ee0940254731e1a2e45fe))
- fix useless spaces in some table parameters error message ([405797d](https://github.com/Cosmo-Tech/webapp-component-core/commit/405797d0742845b645b3eb462e1d16ce9d5be7b5))

<br>

## **1.15.0** <sub><sup>2023-10-26 (c41f4a6...e39934b)</sup></sub>

### Features

- add sorting function for lists of resources \(e\.g\. scenarios or datasets\) ([ab6d2e7](https://github.com/Cosmo-Tech/webapp-component-core/commit/ab6d2e7))

## **1.14.1** <sub><sup>2023-10-06 (2571879...4bc5cc3)</sup></sub>

- update dependencies

## **1.14.0**&emsp;<sub><sup>2023-09-29 (bbcde1f419e4df5189974e7e9f0bbdb50c29f34d...07ada074524a18d23c39792b735590832414324e)</sup></sub>

### Features

- add isExtensionInFileTypeFilter function ([bbcde1f](https://github.com/Cosmo-Tech/webapp-component-core/commit/bbcde1f419e4df5189974e7e9f0bbdb50c29f34d))
- add a function to assign headerName to all columns ([6dff900](https://github.com/Cosmo-Tech/webapp-component-core/commit/6dff900755e3900e03145ca8ae3b1d7edb0d434b))

### Bug Fixes

- fix error thrown by getExtensionFromFileName when input is not a string ([ad604df](https://github.com/Cosmo-Tech/webapp-component-core/commit/ad604df1facb1155ccc51aac1edadaf71721f779))
- fix Excel file parsing when columns don't have types defined ([4037f68](https://github.com/Cosmo-Tech/webapp-component-core/commit/4037f689e81d0a5e9719feb500445729fa904064))

<br>

## **1.13.0** <sub><sup>2023-09-22 (9dd046f...45122b9)</sup></sub>

### Features

- add utils functions for dates and timezones ([f784395](https://github.com/Cosmo-Tech/webapp-component-core/commit/f784395))

## **1.12.0** <sub><sup>2023-09-05 (e96188d...05e2b63)</sup></sub>

### Features

- add new function getFlattenColumnsWithoutGroups ([e96188d](https://github.com/Cosmo-Tech/webapp-component-core/commit/e96188d))

### Bug Fixes

- fix import & export of CSV/XLSX files when some columns are grouped ([193ac62](https://github.com/Cosmo-Tech/webapp-component-core/commit/193ac62))

## **1.11.6** <sub><sup>2023-08-28 (a1a83d2...a1a83d2)</sup></sub>

### Bug Fixes

- fix possible date offset in chrome after XLSX import for cells containing dates

## **1.11.5** <sub><sup>2023-08-28 (9cb545e...82ffc1f)</sup></sub>

- update dependencies

## **1.11.4** <sub><sup>2023-07-26 (a66ef62...5058120)</sup></sub>

### Bug Fixes

- in AgGridUtils, read columns metadata from column object & deprecate usage of cellEditorParams property ([6c05965](https://github.com/Cosmo-Tech/webapp-component-core/commit/6c05965))

## **1.11.3**&emsp;<sub><sup>2023-05-24 (d8ac2fea...5657e5aa)</sup></sub>

### Bug Fixes

- when parsing CSV files, lines number in error messages now start at 1 instead of 0
- fix error message in CSV parsing reporting 'missing fields' when there are too many columns ([597a15c](https://github.com/Cosmo-Tech/webapp-component-core/commit/597a15cc411597b060fd035853e41fc39b9132eb))
- add empty field message and fix too few/many columns to fix all problems encountered ([70c664b](https://github.com/Cosmo-Tech/webapp-component-core/commit/70c664b91850487992e03577c06222f296b20174))
- fix parsing of Excel files with cells formatted as Date objects ([07a9cbc](https://github.com/Cosmo-Tech/webapp-component-core/commit/07a9cbc0b5ce300f6b9757bfa084d439aaa73e92))

## **1.11.2** <sub><sup>2023-04-27 (8708e4a...80f0c61)</sup></sub>

- update dependencies

## **1.11.1** <sub><sup>2023-03-14 (62001af...62001af)</sup></sub>

### Bug Fixes

- fix missing method `getUserEmail` in AuthDev ([62001af](https://github.com/Cosmo-Tech/webapp-component-core/commit/62001af))

## **1.11.0** <sub><sup>2023-02-21 (69a786b...36098e9)</sup></sub>

### Features

- add function to write XLSX files (`XLSXUtils.write`)
- add function to export XLSX files from ag\-grid data (`AgGridUtils.toXLSX`)

## **1.10.3** <sub><sup>2022-12-20 (141a1b9...141a1b9)</sup></sub>

### Bug Fixes

- fix export of CSV files with fields containing commas ([141a1b9](https://github.com/Cosmo-Tech/webapp-component-core/commit/141a1b9))

## **1.10.2** <sub><sup>2022-12-05</sup></sub>

- update dependencies

## **1.10.1** <sub><sup>2022-11-04 (ed24c96...ed24c96)</sup></sub>

- update dependencies

## **1.10.0** <sub><sup>2022-10-12 (b1db393...b1db393)</sup></sub>

### Features

- add user email in auth data ([b1db393](https://github.com/Cosmo-Tech/webapp-component-core/commit/b1db393))

## **1.9.2** <sub><sup>2022-09-16 (7a56f6f...7a56f6f)</sup></sub>

- update dependencies

## **1.9.1** <sub><sup>2022-08-12 (3adacea...3adacea)</sup></sub>

- update dependencies

## **1.9.0** <sub><sup>2022-07-22 (aedf63f...3ee8718)</sup></sub>

### Features

- implement scenarioIsValid function ([06d23d8](https://github.com/Cosmo-Tech/webapp-component-core/commit/06d23d8))

### Bug Fixes

- fix error during parsing of CSV strings when columns list is undefined ([a72b5b5](https://github.com/Cosmo-Tech/webapp-component-core/commit/a72b5b5))

## **1.8.0** <sub><sup>2022-05-09 (5d61a0e...5317d94)</sup></sub>

### Features

- support empty fields in table component ([5d61a0e](https://github.com/Cosmo-Tech/webapp-component-core/commit/5d61a0e))

## **1.7.2** <sub><sup>2022-04-29</sup></sub>

- update dependencies
- remove unnecessary dependencies @babel/cli, @babel/preset-react and typescript

## **1.7.1** <sub><sup>2022-04-04</sup></sub>

- update dependencies

## **1.7.0** <sub><sup>2022-03-16</sup></sub>

### Features

- add functions to get base name & extension from file name ([9bd90df](https://github.com/Cosmo-Tech/webapp-component-core/commit/9bd90df))

### Dependencies

- update dependencies

## **1.6.11** <sub><sup>2022-03-07</sup></sub>

- update dependencies

## **1.6.10** <sub><sup>2021-02-28</sup></sub>

- update dependencies

## **1.6.9** <sub><sup>2022-02-21</sup></sub>

- update dependencies

## **1.6.8** <sub><sup>2022-02-14</sup></sub>

- update dependencies

## **1.6.7** <sub><sup>2022-02-07</sup></sub>

- update dependencies

## **1.6.6** <sub><sup>2022-01-31</sup></sub>

- update dependencies

## **1.6.5** <sub><sup>2022-01-24</sup></sub>

- update dependencies

## **1.6.4** <sub><sup>2022-01-17</sup></sub>

- update dependencies

## **1.6.3** <sub><sup>2022-01-05</sup></sub>

### Bug Fixes

- fix "Can't resolve 'fs'" error when using @cosmotech/core ([539ef6b](https://github.com/Cosmo-Tech/webapp-component-core/commit/539ef6b))

## **1.6.2** <sub><sup>2022-01-05</sup></sub>

- update dependencies

## **1.6.1** <sub><sup>2021-12-20</sup></sub>

### Bug Fixes

- replace read\-excel\-file by SheetJS in XLSXUtils ([cbe5473](https://github.com/Cosmo-Tech/webapp-component-core/commit/cbe5473))

## **1.6.0** <sub><sup>2021-12-20</sup></sub>

### Features

- add import of XLSX files in AgGrid functions ([4c8f173](https://github.com/Cosmo-Tech/webapp-component-core/commit/4c8f173))

## **1.5.3** <sub><sup>2021-12-20</sup></sub>

- update dependencies
- move some dependencies to dev dependencies ([c895487](https://github.com/Cosmo-Tech/webapp-component-azure/commit/c895487))

## **1.5.2** <sub><sup>2021-12-13</sup></sub>

- update dependencies

## **1.5.1** <sub><sup>2021-12-06</sup></sub>

- update dependencies

## **1.5.0** <sub><sup>2021-12-02</sup></sub>

### Features

- add date manipulation functions ([666c06b](https://github.com/Cosmo-Tech/webapp-component-core/commit/666c06b))
- add file manipulation functions ([dab80c2](https://github.com/Cosmo-Tech/webapp-component-core/commit/dab80c2))
- add validation functions ([32e2ace](https://github.com/Cosmo-Tech/webapp-component-core/commit/32e2ace))
- add toCSV function in AgGridUtils ([1460d16](https://github.com/Cosmo-Tech/webapp-component-core/commit/1460d16))

### Bug Fixes

- improve CSV export & add tests ([450b2d7](https://github.com/Cosmo-Tech/webapp-component-core/commit/450b2d7))

## **1.4.4** <sub><sup>2021-11-29</sup></sub>

- update dependencies

## **1.4.3** <sub><sup>2021-11-22</sup></sub>

- update dependencies

## **1.4.2** <sub><sup>2021-11-19</sup></sub>

### Features

- add getUserRoles default function ([33c984d](https://github.com/Cosmo-Tech/webapp-component-core/commit/33c984d))

## **1.4.1** <sub><sup>2021-11-15</sup></sub>

- update dependencies

## **1.4.0** <sub><sup>2021-11-10</sup></sub>

### Features

- add acquireTokensByRequest default function ([d28a037](https://github.com/Cosmo-Tech/webapp-component-core/commit/d28a037))

## **1.3.14** <sub><sup>2021-11-08</sup></sub>

- update dependencies

## **1.3.13** <sub><sup>2021-11-02</sup></sub>

- update dependencies

## **1.3.12** <sub><sup>2021-10-25</sup></sub>

- update dependencies

## **1.3.11** <sub><sup>2021-10-15</sup></sub>

### Dependencies

- set minimal node version to 14.18.1
- update dependencies

## **1.3.10** <sub><sup>2021-10-14</sup></sub>

- update dependencies

## **1.3.9** <sub><sup>2021-09-27</sup></sub>

- update dependencies

## **1.3.8** <sub><sup>2021-09-21</sup></sub>

- update dependencies

## **1.3.7** <sub><sup>2021-08-30</sup></sub>

- update dependencies

## **1.3.6** <sub><sup>2021-08-23</sup></sub>

- update dependencies

## **1.3.5** <sub><sup>2021-08-16</sup></sub>

- update dependencies

## **1.3.4** <sub><sup>2021-08-11</sup></sub>

- update dependencies

## **1.3.3** <sub><sup>2021-08-09</sup></sub>

- update dependencies

## **1.3.2** <sub><sup>2021-08-06</sup></sub>

### Features

- add acquireTokens function to Auth and AuthDev ([a738aab](https://github.com/Cosmo-Tech/webapp-component-core/commit/a738aab))

## **1.3.1** <sub><sup>2021-08-04</sup></sub>

- update dependencies

## **1.3.0** <sub><sup>2021-07-28</sup></sub>

### Features

- add getDatasetNames function in new DatasetUtils module ([36a004f](https://github.com/Cosmo-Tech/webapp-component-core/commit/36a004f))
- add countScenariosInTree function in ScenarioUtils module ([3a5ce3a](https://github.com/Cosmo-Tech/webapp-component-core/commit/3a5ce3a))

### Dependencies

- update dependencies

## **1.2.0** <sub><sup>2021-07-26</sup></sub>

### Features

- add optional comparison function to getScenarioTree ([6a894d7](https://github.com/Cosmo-Tech/webapp-component-core/commit/6a894d7))

### Bug Fixes

- fix getScenarioTree function behavior ([2c00117](https://github.com/Cosmo-Tech/webapp-component-core/commit/2c00117))
- add orphan scenarios as root scenarios when building the scenario tree ([2db14b2](https://github.com/Cosmo-Tech/webapp-component-core/commit/2db14b2))

### Dependencies

- update dependencies

## **1.1.9** <sub><sup>2021-07-19</sup></sub>

- update dependencies

## **1.1.8** <sub><sup>2021-07-12</sup></sub>

- update dependencies

## **1.1.7** <sub><sup>2021-07-05</sup></sub>

- update dependencies

## **1.1.6** <sub><sup>2021-06-30</sup></sub>

- update dependencies

## **1.1.5** <sub><sup>2021-06-21</sup></sub>

- update dependencies

## **1.1.4** <sub><sup>2021-06-16</sup></sub>

- update dependencies

## **1.1.3** <sub><sup>2021-06-10</sup></sub>

### Features

- add optional comparison function to getScenarioTree ([6a894d7](https://github.com/Cosmo-Tech/webapp-component-core/commit/6a894d7))

### Bug Fixes

- fix return value of scenarioExistsInList function ([9ee4bc4](https://github.com/Cosmo-Tech/webapp-component-core/commit/9ee4bc4))
- create distinct functions to check if scenario exists in list or tree ([71ff333](https://github.com/Cosmo-Tech/webapp-component-core/commit/71ff333))

### Dependencies

- update dependencies
