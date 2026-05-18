# Security Policy

## Encryption Details

Secret Vault CLI uses industry-standard encryption to protect your secrets:

- **Algorithm**: AES-256-GCM (Galois/Counter Mode)
- **Key Derivation**: Scrypt with 32-byte salt
- **IV**: 16 bytes, randomly generated for each encryption
- **Authentication**: GCM authentication tag (16 bytes)
- **Key Length**: 256 bits (32 bytes)

## Security Features

1. **No Cloud Storage** - All data stays on your local machine
2. **Master Password** - Never stored, only used to derive encryption keys
3. **Unique Salts** - Each vault uses a unique random salt
4. **Authenticated Encryption** - GCM mode provides both confidentiality and authenticity
5. **Memory-Hard KDF** - Scrypt is resistant to brute-force attacks

## Best Practices

1. **Strong Master Password** - Use at least 12 characters with mixed case, numbers, and symbols
2. **Regular Backups** - Export your vault regularly using `vault export`
3. **Secure Backups** - Store encrypted exports in a safe location
4. **Lock When Done** - Use `vault lock` when you're finished
5. **Keep Updated** - Update to the latest version for security patches

## Reporting Vulnerabilities

If you discover a security vulnerability, please email security@example.com with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Please do not open public issues for security vulnerabilities.

## Threat Model

### What Secret Vault CLI Protects Against

- ✅ Unauthorized access to secrets at rest
- ✅ Data tampering (via GCM authentication)
- ✅ Brute-force attacks on master password (via Scrypt)
- ✅ Rainbow table attacks (via unique salts)

### What Secret Vault CLI Does NOT Protect Against

- ❌ Malware with keylogger capabilities
- ❌ Physical access to unlocked vault
- ❌ Memory dumps while vault is unlocked
- ❌ Compromised system with root access
- ❌ Weak master passwords

## Limitations

- Secrets are decrypted in memory when the vault is unlocked
- The master password is held in memory while the vault is unlocked
- No protection against memory forensics on a compromised system
- Clipboard operations may be logged by system utilities

## Recommendations

For highly sensitive secrets, consider:
- Using hardware security keys
- Dedicated air-gapped systems
- Enterprise secret management solutions
- Multi-factor authentication systems

Secret Vault CLI is designed for developer convenience and local secret management, not for storing highly classified information.
