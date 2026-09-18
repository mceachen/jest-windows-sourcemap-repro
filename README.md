# Jest Windows source-map regression

Jest 30.5.1 prepends the checkout directory to an absolute Windows source-map
path, producing a filename such as `C:\repro\C:\repro\repro.test.js`.
Jest 30.4.2 returns the correct path.

This reproduction uses only JavaScript and Jest. The transformer leaves the
JavaScript unchanged and emits a source map with an absolute, slash-normalized
source path, matching the format emitted by ts-jest. Each line maps to the same
line in the source file. Neither TypeScript nor ts-jest is required (although it
was discovered
[here](https://github.com/photostructure/fs-metadata/actions/runs/35295824106/job/105448932474#step:6:1010)).

## GitHub Actions

The [Windows matrix](.github/workflows/repro.yml) runs the same test with Node 24
and two Jest versions:

| Jest   | Expected result              |
| ------ | ---------------------------- |
| 30.4.2 | Pass                         |
| 30.5.1 | Fail: duplicated source path |

Both jobs run to completion even if one fails. The newer version's failure is
left visible, so the overall workflow is expected to be red. Link to a workflow
run from the bug report to show both results.

## Reproduce on Windows

```sh
npm ci --ignore-scripts
npm test
```

Expected: the mapped stack-frame filename matches `__filename` and the test passes.
Actual: the path is duplicated and the test fails.

## Compare the previous version

```sh
npm install --save-dev --save-exact --ignore-scripts jest@30.4.2
npm test
```

The same test passes. Both versions run with `--runInBand --no-cache`.
The comparison command modifies the manifest and lockfile; restore them before
retesting 30.5.1.

Verified on Windows x64 with Node 24.19.0 and npm 11.10.1.
