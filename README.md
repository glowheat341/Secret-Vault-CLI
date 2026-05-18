<div align="center">

# 🔐 Secret Vault CLI

### Secure Local Encrypted Secrets Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Keep your passwords, API keys, and sensitive data safe with military-grade AES-256-GCM encryption.**

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Roadmap](#-roadmap)

```
  ╔═══════════════════════════════════════════════════════════╗
  ║  $ vault add                                              ║
  ║  Secret name: github-token                                ║
  ║  Secret value: ********                                   ║
  ║  Category: api-keys                                       ║
  ║  ✓ Secret 'github-token' saved successfully!              ║
  ╚═══════════════════════════════════════════════════════════╝
```

*Your secrets never leave your machine. No cloud. No tracking. Just security.*

---

### 🌍 Documentation Languages

[🇬🇧 English](#) • [🇷🇺 Русский](README_RU.md) • [🇨🇳 中文](#) • [🇪🇸 Español](#) • [🇫🇷 Français](#)

</div>

---

## 📖 Table of Contents

- [Why Secret Vault CLI?](#-why-secret-vault-cli)
- [Features](#-features)
- [Security](#-security)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
- [Architecture](#-architecture)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Why Secret Vault CLI?

<table>
<tr>
<td width="33%" align="center">
<h1>🔒</h1>
<h3>Military-Grade Security</h3>
<p>AES-256-GCM encryption with scrypt key derivation. The same encryption used by governments and banks.</p>
</td>
<td width="33%" align="center">
<h1>💾</h1>
<h3>100% Local</h3>
<p>Your secrets stay on your machine. No cloud sync, no servers, no tracking. Complete privacy.</p>
</td>
<td width="33%" align="center">
<h1>🌟</h1>
<h3>Open Source</h3>
<p>Fully auditable code. No hidden backdoors. MIT licensed. Fork it, modify it, own it.</p>
</td>
</tr>
</table>

### 🆚 Comparison with Other Tools

| Feature | Secret Vault CLI | 1Password | LastPass | HashiCorp Vault |
|---------|:---------------:|:---------:|:--------:|:---------------:|
| **Local Storage** | ✅ | ❌ | ❌ | ⚠️ |
| **No Subscription** | ✅ | ❌ | ❌ | ✅ |
| **Open Source** | ✅ | ❌ | ❌ | ✅ |
| **CLI First** | ✅ | ⚠️ | ❌ | ✅ |
| **Easy Setup** | ✅ | ✅ | ✅ | ❌ |
| **Team Features** | 🔜 | ✅ | ✅ | ✅ |
| **Browser Extension** | 🔜 | ✅ | ✅ | ❌ |

---

## ✨ Features

<details open>
<summary><b>🔐 Security Features</b></summary>

- **AES-256-GCM Encryption** - Industry-standard authenticated encryption
- **Scrypt Key Derivation** - Memory-hard function resistant to brute-force attacks
- **Random Salts & IVs** - Unique values for each encryption operation
- **Authentication Tags** - Ensures data integrity and authenticity
- **Master Password** - Single password to unlock all secrets
- **No Network Requests** - Completely offline, no telemetry

</details>

<details open>
<summary><b>💻 Core Features</b></summary>

- **Add/Update Secrets** - Store passwords, API keys, tokens
- **Get Secrets** - Copy to clipboard or display in terminal
- **List & Search** - Find secrets quickly by name or category
- **Categories** - Organize secrets into logical groups
- **Import/Export** - Backup and restore your vault
- **Lock/Unlock** - Secure your vault when not in use

</details>

<details open>
<summary><b>🎨 User Experience</b></summary>

- **Beautiful CLI** - Colorful, intuitive interface
- **Interactive Prompts** - Guided workflows for all operations
- **Clipboard Integration** - Secure copy without displaying
- **Progress Indicators** - Visual feedback for operations
- **Fuzzy Search** - Find secrets even with typos
- **Auto-completion** - Tab completion for commands (coming soon)

</details>

---

## 🔒 Security

<div align="center">

### 🛡️ Multi-Layer Security Architecture

```mermaid
graph TD
    A[User Password] -->|Scrypt KDF| B[Encryption Key]
    B -->|AES-256-GCM| C[Encrypted Data]
    C -->|Base64| D[vault.enc File]
    
    E[Random Salt 32B] --> B
    F[Random IV 16B] --> C
    G[Auth Tag 16B] --> C
    
    style A fill:#ff6b6b
    style B fill:#4ecdc4
    style C fill:#45b7d1
    style D fill:#96ceb4
```

</div>

### 🔐 Encryption Details

| Component | Algorithm | Key Size | Purpose |
|-----------|-----------|----------|---------|
| **Encryption** | AES-256-GCM | 256 bits | Data confidentiality |
| **Key Derivation** | Scrypt | 256 bits | Password → Key |
| **Authentication** | GCM Tag | 128 bits | Data integrity |
| **Salt** | Random | 256 bits | Rainbow table protection |
| **IV** | Random | 128 bits | Replay attack protection |

### 🛡️ What We Protect Against

<table>
<tr>
<td width="50%">

**✅ Protected:**
- 🔒 File theft (encrypted at rest)
- 💪 Brute-force attacks (scrypt)
- 🌈 Rainbow tables (unique salts)
- 🔧 Data tampering (auth tags)
- 🔁 Replay attacks (unique IVs)

</td>
<td width="50%">

**⚠️ Not Protected:**
- 🔑 Weak master passwords
- 🐛 Keyloggers on compromised systems
- 💾 Memory dumps while unlocked
- 🖥️ Physical access to unlocked vault
- 🎣 Social engineering

</td>
</tr>
</table>

> 📚 **Learn More:** [SECURITY.md](SECURITY.md) • [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** (for cloning)

### Quick Install

```bash
# Clone the repository
git clone https://github.com/NikkDevelop/Secret-Vault-CLI.git
cd Secret-Vault-CLI

# Install dependencies
npm install

# Build the project
npm run build

# Install globally
npm link

# Verify installation
vault --version
```

### Alternative: Install from npm (Coming Soon)

```bash
npm install -g secret-vault-cli
```

> 📚 **Detailed Instructions:** [INSTALL.md](INSTALL.md)

---

## ⚡ Quick Start

### 1️⃣ Create Your First Secret

```bash
vault add

# Interactive prompts:
# Secret name: github-token
# Secret value: ********
# Category (optional): api-keys
# ✓ Secret 'github-token' saved successfully!
```

### 2️⃣ Retrieve a Secret

```bash
# Copy to clipboard (secure, no display)
vault get github-token --copy

# Or show in terminal
vault get github-token --show
```

### 3️⃣ List All Secrets

```bash
vault list

# Filter by category
vault list --category api-keys
```

### 4️⃣ Search Secrets

```bash
vault search github
```

### 5️⃣ Lock Your Vault

```bash
vault lock
```

---

## 📚 Usage Examples

<details>
<summary><b>🔹 Basic Operations</b></summary>

```bash
# Add a secret
vault add -n "aws-key" -v "AKIAIOSFODNN7EXAMPLE" -c "aws"

# Get a secret (copy to clipboard)
vault get aws-key --copy

# List all secrets
vault list

# Search secrets
vault search aws

# Delete a secret
vault delete old-api-key
```

</details>

<details>
<summary><b>🔹 Categories & Organization</b></summary>

```bash
# Add secrets with categories
vault add -n "prod-db" -v "password123" -c "databases"
vault add -n "staging-db" -v "password456" -c "databases"
vault add -n "github-token" -v "ghp_xxx" -c "api-keys"

# List by category
vault list --category databases

# View all categories
vault categories
```

</details>

<details>
<summary><b>🔹 Backup & Restore</b></summary>

```bash
# Export vault (encrypted with separate password)
vault export -o backup-2026-05-18.enc

# Import vault
vault import -i backup-2026-05-18.enc
```

</details>

<details>
<summary><b>🔹 Shell Integration</b></summary>

```bash
# Use in scripts
API_KEY=$(vault get api-key --show | grep "Value:" | awk '{print $2}')
curl -H "Authorization: Bearer $API_KEY" https://api.example.com

# Export as environment variables
export DATABASE_URL=$(vault get db-url --show | grep "Value:" | awk '{print $2}')
```

</details>

> 📚 **More Examples:** [EXAMPLES.md](EXAMPLES.md)

---

## 🏗️ Architecture

<div align="center">

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLI Layer (cli.ts)                   │
│  Commander.js • Inquirer • Chalk • Clipboardy • Ora     │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                 Business Logic (vault.ts)               │
│  CRUD Operations • Search • Categories • Import/Export  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Crypto Layer (encryption.ts)               │
│        AES-256-GCM • Scrypt • Random Generation         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Storage Layer (filesystem)                 │
│              ~/.secret-vault/vault.enc                  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Vault
    participant Crypto
    participant Disk

    User->>CLI: vault add
    CLI->>User: Request master password
    User->>CLI: Enter password
    CLI->>Vault: unlock(password)
    Vault->>Disk: Read vault.enc
    Disk->>Vault: Encrypted data
    Vault->>Crypto: decrypt(data, password)
    Crypto->>Vault: Decrypted JSON
    Vault->>CLI: Vault unlocked
    CLI->>User: Request secret details
    User->>CLI: Enter secret
    CLI->>Vault: addSecret(name, value)
    Vault->>Crypto: encrypt(data, password)
    Crypto->>Vault: Encrypted data
    Vault->>Disk: Write vault.enc
    Disk->>Vault: Success
    Vault->>CLI: Secret saved
    CLI->>User: ✓ Success
```

</div>

> 📚 **Technical Details:** [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🗺️ Roadmap

<div align="center">

### 🎯 Development Timeline

</div>

### Version 1.1.0 - Quick Wins (Q3 2026)

<table>
<tr>
<td width="50%">

**🔐 Security Enhancements**
- [ ] Auto-lock with configurable timeout
- [ ] Password strength meter
- [ ] Failed login attempt limits
- [ ] Audit log for all operations

</td>
<td width="50%">

**🎨 UX Improvements**
- [ ] Auto-clear clipboard after N seconds
- [ ] Fuzzy search for secrets
- [ ] Interactive secret picker
- [ ] Color themes (dark/light)

</td>
</tr>
</table>

### Version 1.2.0 - Advanced Security (Q4 2026)

<table>
<tr>
<td width="50%">

**🔑 Authentication**
- [ ] Yubikey/Hardware key support (2FA)
- [ ] Biometric unlock (Touch ID/Face ID)
- [ ] Recovery codes for emergency access
- [ ] Split key backup (Shamir's Secret Sharing)

</td>
<td width="50%">

**💾 Backup & Recovery**
- [ ] Automatic scheduled backups
- [ ] Backup rotation (keep last N)
- [ ] Cloud backup (encrypted, optional)
- [ ] Change history & rollback

</td>
</tr>
</table>

### Version 1.3.0 - Sync & Collaboration (Q1 2027)

<table>
<tr>
<td width="50%">

**☁️ Synchronization**
- [ ] Git-based sync (GitHub/GitLab)
- [ ] Custom sync server (self-hosted)
- [ ] P2P sync (no server needed)
- [ ] Conflict resolution

</td>
<td width="50%">

**👥 Team Features**
- [ ] Share secrets with team members
- [ ] Role-based access control (RBAC)
- [ ] Asymmetric encryption for sharing
- [ ] Team audit logs

</td>
</tr>
</table>

### Version 1.4.0 - Integrations (Q2 2027)

<table>
<tr>
<td width="50%">

**🔌 Developer Tools**
- [ ] VS Code extension
- [ ] JetBrains plugin
- [ ] Shell auto-completion
- [ ] Environment variable injection

</td>
<td width="50%">

**🤖 Automation**
- [ ] Secret generation (passwords, keys)
- [ ] Automatic secret rotation
- [ ] CI/CD integration (GitHub Actions)
- [ ] Webhook notifications

</td>
</tr>
</table>

### Version 1.5.0 - Enterprise (Q3 2027)

<table>
<tr>
<td width="50%">

**🏢 Enterprise Features**
- [ ] SSO integration (Okta, Azure AD)
- [ ] Compliance mode (SOC 2, HIPAA)
- [ ] Advanced RBAC policies
- [ ] Centralized management

</td>
<td width="50%">

**🌐 User Interface**
- [ ] Web UI (optional)
- [ ] Mobile apps (iOS/Android)
- [ ] Browser extension
- [ ] Desktop GUI app

</td>
</tr>
</table>

### Version 2.0.0 - Next Generation (2028)

- [ ] **Quantum-resistant encryption** (post-quantum cryptography)
- [ ] **Database backend** (SQLite/PostgreSQL for large vaults)
- [ ] **Plugin system** (extend functionality)
- [ ] **Multi-vault support** (separate vaults for different contexts)
- [ ] **Advanced search** (regex, metadata, tags)

<div align="center">

### 🗳️ Vote for Features

Want a feature prioritized? Vote on [GitHub Discussions](https://github.com/NikkDevelop/Secret-Vault-CLI/discussions)!

</div>

> 📚 **Full Roadmap:** [ROADMAP.md](ROADMAP.md)

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/NikkDevelop/Secret-Vault-CLI?style=social)
![GitHub forks](https://img.shields.io/github/forks/NikkDevelop/Secret-Vault-CLI?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/NikkDevelop/Secret-Vault-CLI?style=social)

![GitHub issues](https://img.shields.io/github/issues/NikkDevelop/Secret-Vault-CLI)
![GitHub pull requests](https://img.shields.io/github/issues-pr/NikkDevelop/Secret-Vault-CLI)
![GitHub last commit](https://img.shields.io/github/last-commit/NikkDevelop/Secret-Vault-CLI)

</div>

---

## 🤝 Contributing

We love contributions! Whether it's:

- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions

<div align="center">

**[Contributing Guide](CONTRIBUTING.md)** • **[Code of Conduct](CODE_OF_CONDUCT.md)** • **[Development Setup](INSTALL.md#development-installation)**

</div>

### Contributors

<a href="https://github.com/NikkDevelop/Secret-Vault-CLI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=NikkDevelop/Secret-Vault-CLI" />
</a>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Secret Vault CLI Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

- **Node.js Crypto** - Built-in cryptography module
- **Commander.js** - CLI framework
- **Inquirer.js** - Interactive prompts
- **Chalk** - Terminal styling
- **Clipboardy** - Clipboard access

---

## 📞 Support

<div align="center">

### Need Help?

**[📖 Documentation](README.md)** • **[💬 Discussions](https://github.com/NikkDevelop/Secret-Vault-CLI/discussions)** • **[🐛 Report Bug](https://github.com/NikkDevelop/Secret-Vault-CLI/issues/new?template=bug_report.yml)** • **[✨ Request Feature](https://github.com/NikkDevelop/Secret-Vault-CLI/issues/new?template=feature_request.yml)**

</div>

---

## ⭐ Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=NikkDevelop/Secret-Vault-CLI&type=Date)](https://star-history.com/#NikkDevelop/Secret-Vault-CLI&Date)

</div>

---

<div align="center">

### 🔐 Keep Your Secrets Safe

**Made with ❤️ by the Secret Vault CLI community**

[⬆ Back to Top](#-secret-vault-cli)

</div>
