## GitHub Copilot Chat

- Extension Version: 0.22.4 (prod)
- VS Code: vscode/1.95.3
- OS: Windows

## Network

User Settings:

```json
  "github.copilot.advanced": {
    "debug.useElectronFetcher": true,
    "debug.useNodeFetcher": false
  }
```

Connecting to https://api.github.com:

- DNS ipv4 Lookup: 20.205.243.168 (35 ms)
- DNS ipv6 Lookup: Error: getaddrinfo EAI_AGAIN api.github.com
- Electron Fetcher (configured): HTTP 200 (573 ms)
- Node Fetcher: HTTP 200 (332 ms)
- Helix Fetcher: HTTP 200 (596 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:

- DNS ipv4 Lookup: 140.82.114.22 (7 ms)
- DNS ipv6 Lookup: Error: getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Electron Fetcher (configured): HTTP 200 (838 ms)
- Node Fetcher: HTTP 200 (802 ms)
- Helix Fetcher: timed out after 10 seconds

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).
