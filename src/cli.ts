#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import clipboardy from 'clipboardy';
import ora from 'ora';
import { Vault } from './vault/vault.js';

const vault = new Vault();
const program = new Command();

async function ensureUnlocked(): Promise<boolean> {
  if (vault.isUnlocked()) {
    return true;
  }

  if (!vault.exists()) {
    console.log(chalk.yellow('No vault found. Creating a new vault...'));
    const { password } = await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'Create master password:',
        mask: '*',
        validate: (input) => input.length >= 8 || 'Password must be at least 8 characters'
      }
    ]);

    const { confirmPassword } = await inquirer.prompt([
      {
        type: 'password',
        name: 'confirmPassword',
        message: 'Confirm master password:',
        mask: '*'
      }
    ]);

    if (password !== confirmPassword) {
      console.log(chalk.red('Passwords do not match!'));
      return false;
    }

    vault.unlock(password);
    console.log(chalk.green('✓ Vault created successfully!'));
    return true;
  }

  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: 'Enter master password:',
      mask: '*'
    }
  ]);

  if (!vault.unlock(password)) {
    console.log(chalk.red('✗ Invalid password!'));
    return false;
  }

  return true;
}

program
  .name('vault')
  .description('Secret Vault CLI - Secure local encrypted secrets manager')
  .version('1.0.0');

program
  .command('add')
  .description('Add or update a secret')
  .option('-n, --name <name>', 'Secret name')
  .option('-v, --value <value>', 'Secret value')
  .option('-c, --category <category>', 'Category')
  .action(async (options) => {
    if (!(await ensureUnlocked())) return;

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Secret name:',
        when: !options.name,
        validate: (input) => input.length > 0 || 'Name is required'
      },
      {
        type: 'password',
        name: 'value',
        message: 'Secret value:',
        mask: '*',
        when: !options.value,
        validate: (input) => input.length > 0 || 'Value is required'
      },
      {
        type: 'input',
        name: 'category',
        message: 'Category (optional):',
        when: !options.category
      }
    ]);

    const name = options.name || answers.name;
    const value = options.value || answers.value;
    const category = options.category || answers.category || undefined;

    const spinner = ora('Saving secret...').start();

    try {
      vault.addSecret(name, value, category);
      spinner.succeed(chalk.green(`Secret '${name}' saved successfully!`));
    } catch (error) {
      spinner.fail(chalk.red('Failed to save secret'));
      console.error(error);
    }
  });

program
  .command('get <name>')
  .description('Get a secret value')
  .option('-c, --copy', 'Copy to clipboard')
  .option('-s, --show', 'Show value in terminal')
  .action(async (name, options) => {
    if (!(await ensureUnlocked())) return;

    const secret = vault.getSecret(name);

    if (!secret) {
      console.log(chalk.red(`✗ Secret '${name}' not found`));
      return;
    }

    if (options.copy) {
      await clipboardy.write(secret.value);
      console.log(chalk.green(`✓ Secret '${name}' copied to clipboard`));
    } else if (options.show) {
      console.log(chalk.cyan('\nSecret Details:'));
      console.log(chalk.gray('─'.repeat(50)));
      console.log(chalk.white(`Name:     ${secret.name}`));
      console.log(chalk.white(`Value:    ${secret.value}`));
      if (secret.category) console.log(chalk.white(`Category: ${secret.category}`));
      console.log(chalk.gray(`Created:  ${new Date(secret.createdAt).toLocaleString()}`));
      console.log(chalk.gray(`Updated:  ${new Date(secret.updatedAt).toLocaleString()}`));
      console.log(chalk.gray('─'.repeat(50)));
    } else {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            { name: 'Copy to clipboard', value: 'copy' },
            { name: 'Show in terminal', value: 'show' },
            { name: 'Cancel', value: 'cancel' }
          ]
        }
      ]);

      if (action === 'copy') {
        await clipboardy.write(secret.value);
        console.log(chalk.green(`✓ Secret '${name}' copied to clipboard`));
      } else if (action === 'show') {
        console.log(chalk.cyan('\nSecret Details:'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.white(`Name:     ${secret.name}`));
        console.log(chalk.white(`Value:    ${secret.value}`));
        if (secret.category) console.log(chalk.white(`Category: ${secret.category}`));
        console.log(chalk.gray(`Created:  ${new Date(secret.createdAt).toLocaleString()}`));
        console.log(chalk.gray(`Updated:  ${new Date(secret.updatedAt).toLocaleString()}`));
        console.log(chalk.gray('─'.repeat(50)));
      }
    }
  });

program
  .command('list')
  .description('List all secrets')
  .option('-c, --category <category>', 'Filter by category')
  .action(async (options) => {
    if (!(await ensureUnlocked())) return;

    const secrets = options.category
      ? vault.listSecrets(options.category)
      : vault.listSecrets();

    if (secrets.length === 0) {
      console.log(chalk.yellow('No secrets found'));
      return;
    }

    console.log(chalk.cyan(`\nFound ${secrets.length} secret(s):\n`));
    console.log(chalk.gray('─'.repeat(80)));

    secrets.forEach((secret, index) => {
      console.log(chalk.white(`${index + 1}. ${chalk.bold(secret.name)}`));
      if (secret.category) {
        console.log(chalk.gray(`   Category: ${secret.category}`));
      }
      console.log(chalk.gray(`   Updated: ${new Date(secret.updatedAt).toLocaleString()}`));
      console.log(chalk.gray('─'.repeat(80)));
    });
  });

program
  .command('delete <name>')
  .description('Delete a secret')
  .action(async (name) => {
    if (!(await ensureUnlocked())) return;

    const secret = vault.getSecret(name);
    if (!secret) {
      console.log(chalk.red(`✗ Secret '${name}' not found`));
      return;
    }

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to delete '${name}'?`,
        default: false
      }
    ]);

    if (!confirm) {
      console.log(chalk.yellow('Deletion cancelled'));
      return;
    }

    const spinner = ora('Deleting secret...').start();

    if (vault.deleteSecret(name)) {
      spinner.succeed(chalk.green(`Secret '${name}' deleted successfully!`));
    } else {
      spinner.fail(chalk.red('Failed to delete secret'));
    }
  });

program
  .command('search <query>')
  .description('Search secrets by name, category, or metadata')
  .action(async (query) => {
    if (!(await ensureUnlocked())) return;

    const results = vault.searchSecrets(query);

    if (results.length === 0) {
      console.log(chalk.yellow(`No secrets found matching '${query}'`));
      return;
    }

    console.log(chalk.cyan(`\nFound ${results.length} secret(s) matching '${query}':\n`));
    console.log(chalk.gray('─'.repeat(80)));

    results.forEach((secret, index) => {
      console.log(chalk.white(`${index + 1}. ${chalk.bold(secret.name)}`));
      if (secret.category) {
        console.log(chalk.gray(`   Category: ${secret.category}`));
      }
      console.log(chalk.gray(`   Updated: ${new Date(secret.updatedAt).toLocaleString()}`));
      console.log(chalk.gray('─'.repeat(80)));
    });
  });

program
  .command('categories')
  .description('List all categories')
  .action(async () => {
    if (!(await ensureUnlocked())) return;

    const categories = vault.getCategories();

    if (categories.length === 0) {
      console.log(chalk.yellow('No categories found'));
      return;
    }

    console.log(chalk.cyan(`\nCategories (${categories.length}):\n`));
    categories.forEach((cat, index) => {
      const count = vault.listSecrets(cat).length;
      console.log(chalk.white(`${index + 1}. ${chalk.bold(cat)} ${chalk.gray(`(${count} secrets)`)}`));
    });
  });

program
  .command('export')
  .description('Export vault to encrypted file')
  .option('-o, --output <file>', 'Output file path', 'vault-export.enc')
  .action(async (options) => {
    if (!(await ensureUnlocked())) return;

    const { password } = await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'Export password:',
        mask: '*',
        validate: (input) => input.length >= 8 || 'Password must be at least 8 characters'
      }
    ]);

    const spinner = ora('Exporting vault...').start();

    try {
      const { writeFileSync } = await import('fs');
      const exported = vault.exportVault(password);
      writeFileSync(options.output, exported, 'utf8');
      spinner.succeed(chalk.green(`Vault exported to ${options.output}`));
    } catch (error) {
      spinner.fail(chalk.red('Export failed'));
      console.error(error);
    }
  });

program
  .command('import')
  .description('Import vault from encrypted file')
  .option('-i, --input <file>', 'Input file path', 'vault-export.enc')
  .action(async (options) => {
    if (!(await ensureUnlocked())) return;

    const { password } = await inquirer.prompt([
      {
        type: 'password',
        name: 'password',
        message: 'Import password:',
        mask: '*'
      }
    ]);

    const spinner = ora('Importing vault...').start();

    try {
      const { readFileSync } = await import('fs');
      const encrypted = readFileSync(options.input, 'utf8');
      vault.importVault(encrypted, password);
      spinner.succeed(chalk.green('Vault imported successfully!'));
    } catch (error) {
      spinner.fail(chalk.red('Import failed'));
      console.error(error);
    }
  });

program
  .command('lock')
  .description('Lock the vault')
  .action(() => {
    vault.lock();
    console.log(chalk.green('✓ Vault locked'));
  });

program.parse();
