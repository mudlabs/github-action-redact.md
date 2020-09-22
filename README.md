[p]: images/redacted_p.png

# Redact.md
A Github Action used heavily by the CIA, NSA, MI5, etc.. to automatically redact _super dupa top secret_ data from markdown files, before **"the enemy"** can get their hands on it. 

## Usage
```yaml
steps:
  - name: Redact.md
    id: redact
    uses: mudlabs/github-action-redact.md@v1.0.0
    with:
      comma-list: `blackbriar, xi, jinping, treadstone, great reset`
```

## With
All inputs are optional, though if you don't provide a _comma-list_, _regexp_, or _api-endpoint_ the action will fail silently.

- **symbole**: All matches will be replaced with a symbole. You can provide your own string, or specify one of the built in options. The built in options are **classic**, which results in those classic thick black lines you see in redacted documents. The other is **whiteout**, which is like classic but looks more like someone has gone crazy with the whiteout pen. The dafault is `'classic'`.

- **redact-all**: Specifies that all `.md` files within the repository should be passed in for redaction, not just those in the commit. Defaults to `false`.

- **glob**: You can provide a glob to further restrict/specify which `.md` files should be passed in for redaction.

- **comma-list**: A comma separated list of keyword/phases for redaction.

- **regexp**: A string to be converted into a RegExp to match keywords/phrases for redaction.

- **api-endpoint**: A url endpoint that returns a JSON list of keywords/phrases for redaction. The response from making the API request should be the list as a string[] or an object with the sting[] list located under `response.data`.
