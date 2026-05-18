# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-18

### Added
- Initial release of Secret Vault CLI
- AES-256-GCM encryption with scrypt key derivation
- Interactive CLI with beautiful colored output
- Add, get, list, delete, and search secrets
- Category-based organization
- Clipboard integration for secure access
- Import/Export functionality with separate encryption
- Master password protection
- Local-only storage (no cloud sync)
- Comprehensive documentation (README, SECURITY, CONTRIBUTING)
- GitHub Actions CI/CD pipeline
- TypeScript support with full type definitions
- ESLint configuration for code quality

### Security
- Military-grade AES-256-GCM encryption
- Scrypt key derivation function (memory-hard)
- Unique random salts and IVs for each encryption
- Authentication tags for data integrity
- No network requests - fully offline

[1.0.0]: https://github.com/NikkDevelop/Secret-Vault-CLI/releases/tag/v1.0.0
