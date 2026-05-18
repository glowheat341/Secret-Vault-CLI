# Contributing to Secret Vault CLI

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/NikkDevelop/Secret-Vault-CLI.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode (watch mode)
npm run dev

# Run linter
npm run lint

# Run tests
npm test
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run `npm run lint` before committing
- Write meaningful commit messages

## Commit Messages

Follow the conventional commits specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add support for secret metadata`

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation for any new features
3. Ensure all tests pass
4. Ensure the code lints without errors
5. Create a pull request with a clear description

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage

## Security

- Never commit secrets or sensitive data
- Report security vulnerabilities privately
- Follow secure coding practices

## Questions?

Feel free to open an issue for any questions or concerns.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
