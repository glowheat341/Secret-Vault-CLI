# Examples

This document provides practical examples of using Secret Vault CLI.

## Basic Usage

### First Time Setup

```bash
# First run will prompt you to create a master password
vault add

# Enter master password: ********
# Confirm master password: ********
# ✓ Vault created successfully!

# Secret name: github-token
# Secret value: ********
# Category (optional): api-keys
# ✓ Secret 'github-token' saved successfully!
```

### Adding Secrets

```bash
# Interactive mode
vault add

# Command line mode
vault add -n "aws-access-key" -v "AKIAIOSFODNN7EXAMPLE" -c "aws"
vault add -n "database-password" -v "super-secret-pass" -c "databases"
vault add -n "api-key" -v "sk-1234567890abcdef"
```

### Retrieving Secrets

```bash
# Interactive mode (choose copy or show)
vault get github-token

# Copy directly to clipboard
vault get github-token --copy
# ✓ Secret 'github-token' copied to clipboard

# Show in terminal
vault get github-token --show
# Secret Details:
# ──────────────────────────────────────────────────
# Name:     github-token
# Value:    ghp_xxxxxxxxxxxx
# Category: api-keys
# Created:  2026-05-18 17:00:00
# Updated:  2026-05-18 17:00:00
# ──────────────────────────────────────────────────
```

### Listing Secrets

```bash
# List all secrets
vault list

# Found 3 secret(s):
# ────────────────────────────────────────────────────────────────────────────────
# 1. github-token
#    Category: api-keys
#    Updated: 2026-05-18 17:00:00
# ────────────────────────────────────────────────────────────────────────────────
# 2. aws-access-key
#    Category: aws
#    Updated: 2026-05-18 17:05:00
# ────────────────────────────────────────────────────────────────────────────────

# Filter by category
vault list --category api-keys
```

### Searching Secrets

```bash
# Search by name
vault search github

# Search by category
vault search aws

# Search by any metadata
vault search production
```

### Managing Categories

```bash
# List all categories with counts
vault categories

# Categories (3):
# 1. api-keys (2 secrets)
# 2. aws (1 secrets)
# 3. databases (1 secrets)
```

### Deleting Secrets

```bash
vault delete old-api-key

# Are you sure you want to delete 'old-api-key'? (y/N) y
# ✓ Secret 'old-api-key' deleted successfully!
```

## Advanced Usage

### Backup and Restore

```bash
# Export vault to encrypted backup
vault export -o ~/backups/vault-backup-2026-05-18.enc
# Export password: ********
# ✓ Vault exported to ~/backups/vault-backup-2026-05-18.enc

# Import vault from backup
vault import -i ~/backups/vault-backup-2026-05-18.enc
# Import password: ********
# ✓ Vault imported successfully!
```

### Security Best Practices

```bash
# Lock vault when done
vault lock
# ✓ Vault locked

# Next command will prompt for password again
vault list
# Enter master password: ********
```

## Integration Examples

### Using in Shell Scripts

```bash
#!/bin/bash

# Get API key and use it
API_KEY=$(vault get api-key --show | grep "Value:" | awk '{print $2}')

# Use the API key
curl -H "Authorization: Bearer $API_KEY" https://api.example.com/data
```

### Using with Environment Variables

```bash
# Export secret as environment variable
export DATABASE_URL=$(vault get database-url --show | grep "Value:" | awk '{print $2}')

# Use in your application
node app.js
```

### Rotating Secrets

```bash
# Update existing secret with new value
vault add -n "api-key" -v "new-secret-value-here" -c "api-keys"
# ✓ Secret 'api-key' saved successfully!
```

## Common Workflows

### Developer Onboarding

```bash
# New developer receives encrypted vault export
vault import -i team-secrets.enc

# Access shared secrets
vault list
vault get staging-db-password --copy
```

### CI/CD Integration

```bash
# In CI pipeline, inject secrets as environment variables
export DEPLOY_KEY=$(vault get deploy-key --show | grep "Value:" | awk '{print $2}')
export API_TOKEN=$(vault get api-token --show | grep "Value:" | awk '{print $2}')

# Run deployment
./deploy.sh
```

### Multi-Environment Setup

```bash
# Organize by environment
vault add -n "prod-db-password" -v "xxx" -c "production"
vault add -n "staging-db-password" -v "yyy" -c "staging"
vault add -n "dev-db-password" -v "zzz" -c "development"

# List by environment
vault list --category production
vault list --category staging
```

## Tips and Tricks

### Quick Access Pattern

```bash
# Create shell aliases for frequently used secrets
alias get-gh-token='vault get github-token --copy'
alias get-aws-key='vault get aws-access-key --copy'

# Now just run
get-gh-token
```

### Batch Operations

```bash
# Add multiple secrets at once
for secret in api-key-1 api-key-2 api-key-3; do
  vault add -n "$secret" -v "$(generate-random-key)" -c "api-keys"
done
```

### Search and Copy

```bash
# Find and copy in one go
vault search github | head -1 | awk '{print $2}' | xargs vault get --copy
```

## Troubleshooting

### Forgot Master Password

Unfortunately, if you forget your master password, there's no way to recover your secrets. This is by design for security. Always keep a backup of your master password in a secure location.

### Vault Corrupted

```bash
# Restore from backup
vault import -i ~/backups/vault-backup.enc

# If no backup exists, you'll need to start fresh
rm ~/.secret-vault/vault.enc
vault add  # Creates new vault
```

### Permission Issues

```bash
# Fix vault file permissions
chmod 600 ~/.secret-vault/vault.enc
chmod 700 ~/.secret-vault
```

## More Examples

For more examples and use cases, check out:
- [README.md](README.md) - Main documentation
- [SECURITY.md](SECURITY.md) - Security best practices
- [GitHub Issues](https://github.com/NikkDevelop/Secret-Vault-CLI/issues) - Community examples
