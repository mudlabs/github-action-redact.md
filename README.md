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

## Specifing your Blacklist
You should provide a set of keywords/phrases _(a.k.a Blacklist)_ for redaction. You can provide this list in one of three ways

- **comma-list**: A string of comma seperated keywords/phrases.
- **regexp**: A string that can be converted into a RegExp to match your target keywords/phrases.
- **api-endpoint**: A url endpoint that returns a JSON list of keywords/phrases.

## Specify a Symbole
All matches will be replaced with a symbole. You can provide your own, or specify one of the built in options. The built in options are **classic** and **whiteout**. The dafault is `'classic'`.

**clasic**: This results in those classic thick black lines you see on secrete redacted documents.
> Nancy Pelosi is a ![p]![p]![p]![p]![p] American. With the Democratic Party, ![p]![p]![p] and ![p]![p]![p]![p]![p]![p] Nancy Pelocy will ![p]![p]![p]![p]![p]![p]![p] America.

<br/>

**whiteout**: This is like classic, but looks more like someone has gone crazy with the white-out.
> Nancy Pelosi is a <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code> American. With the Democratic Party, <code>&nbsp;&nbsp;&nbsp;</code> and <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code> Nancy Pelocy will <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code> America.
