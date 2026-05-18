# Installation Guide

## Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** (for cloning the repository)

Check your versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

---

## Installation Methods

### Method 1: Install from Source (Recommended)

This is the recommended method for now as the package is not yet published to npm.

```bash
# 1. Clone the repository
git clone https://github.com/NikkDevelop/Secret-Vault-CLI.git
cd Secret-Vault-CLI

# 2. Install dependencies
npm install

# 3. Build the TypeScript code
npm run build

# 4. Link the CLI globally
npm link

# 5. Verify installation
vault --version
# Should output: 1.0.0
```

**What does `npm link` do?**
- Creates a symlink in your global node_modules
- Makes the `vault` command available system-wide
- No need to specify the full path

---

### Method 2: Manual Installation (Without npm link)

If you don't want to install globally:

```bash
# 1-3. Same as above
git clone https://github.com/NikkDevelop/Secret-Vault-CLI.git
cd Secret-Vault-CLI
npm install
npm run build

# 4. Create an alias in your shell
echo 'alias vault="node /path/to/Secret-Vault-CLI/dist/cli.js"' >> ~/.bashrc
source ~/.bashrc

# Or for zsh
echo 'alias vault="node /path/to/Secret-Vault-CLI/dist/cli.js"' >> ~/.zshrc
source ~/.zshrc
```

---

### Method 3: Install from npm (Coming Soon)

Once published to npm registry:

```bash
npm install -g secret-vault-cli
```

---

## Verification

After installation, verify everything works:

```bash
# Check version
vault --version

# Check help
vault --help

# Create your first secret
vault add
```

---

## Updating

### If installed via npm link:

```bash
cd Secret-Vault-CLI
git pull origin main
npm install
npm run build
# npm link is still active, no need to run again
```

### If installed via npm (future):

```bash
npm update -g secret-vault-cli
```

---

## Uninstallation

### If installed via npm link:

```bash
npm unlink -g secret-vault-cli
# Then delete the cloned directory
rm -rf Secret-Vault-CLI
```

### If installed via npm (future):

```bash
npm uninstall -g secret-vault-cli
```

**Note:** Uninstalling the CLI does NOT delete your vault data.
Your encrypted secrets remain at `~/.secret-vault/vault.enc`

---

## Troubleshooting

### "vault: command not found"

**Solution 1:** Make sure npm global bin is in your PATH
```bash
# Check npm global bin location
npm config get prefix

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$PATH:$(npm config get prefix)/bin"
```

**Solution 2:** Use npx
```bash
npx vault --version
```

### "Permission denied" during npm link

**Solution:** Use sudo (not recommended) or fix npm permissions
```bash
# Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Then try npm link again
npm link
```

### Build errors

**Solution:** Make sure you have the correct Node.js version
```bash
node --version  # Must be 18.0.0 or higher

# If not, install nvm and update Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### TypeScript errors

**Solution:** Clean and rebuild
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

## Platform-Specific Notes

### Linux

Works out of the box. No special configuration needed.

### macOS

Works out of the box. No special configuration needed.

### Windows

**Option 1: WSL (Recommended)**
```bash
# Install WSL2
wsl --install

# Then follow Linux installation steps
```

**Option 2: Native Windows**
```powershell
# Use PowerShell or Command Prompt
git clone https://github.com/NikkDevelop/Secret-Vault-CLI.git
cd Secret-Vault-CLI
npm install
npm run build
npm link
```

**Note:** On Windows, the vault is stored at:
```
C:\Users\YourUsername\.secret-vault\vault.enc
```

---

## Development Installation

If you want to contribute or modify the code:

```bash
# Clone and install
git clone https://github.com/NikkDevelop/Secret-Vault-CLI.git
cd Secret-Vault-CLI
npm install

# Run in development mode (auto-rebuild on changes)
npm run dev

# In another terminal, test your changes
npm link
vault --version

# Run linter
npm run lint

# Run tests (when available)
npm test
```

---

## Docker Installation (Alternative)

If you prefer Docker:

```bash
# Build the image
docker build -t secret-vault-cli .

# Run the CLI
docker run -it -v ~/.secret-vault:/root/.secret-vault secret-vault-cli vault --help

# Create an alias for convenience
alias vault='docker run -it -v ~/.secret-vault:/root/.secret-vault secret-vault-cli vault'
```

**Note:** Dockerfile is not included yet. This is a future feature.

---

## Next Steps

After installation:

1. **Create your first vault:**
   ```bash
   vault add
   ```

2. **Read the documentation:**
   - [README.md](README.md) - Main documentation
   - [EXAMPLES.md](EXAMPLES.md) - Usage examples
   - [SECURITY.md](SECURITY.md) - Security details

3. **Join the community:**
   - Report bugs: [GitHub Issues](https://github.com/NikkDevelop/Secret-Vault-CLI/issues)
   - Request features: [Feature Requests](https://github.com/NikkDevelop/Secret-Vault-CLI/issues/new?template=feature_request.yml)
   - Contribute: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Support

Need help? 

- 📖 [Documentation](README.md)
- 💬 [GitHub Discussions](https://github.com/NikkDevelop/Secret-Vault-CLI/discussions)
- 🐛 [Report a Bug](https://github.com/NikkDevelop/Secret-Vault-CLI/issues/new?template=bug_report.yml)
- ✨ [Request a Feature](https://github.com/NikkDevelop/Secret-Vault-CLI/issues/new?template=feature_request.yml)
