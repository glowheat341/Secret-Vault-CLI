import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { Encryption } from '../crypto/encryption.js';

export interface Secret {
  name: string;
  value: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, string>;
}

export interface VaultData {
  version: string;
  secrets: Secret[];
}

export class Vault {
  private vaultPath: string;
  private encryption: Encryption;
  private masterPassword: string | null = null;

  constructor(vaultPath?: string) {
    this.vaultPath = vaultPath || join(homedir(), '.secret-vault', 'vault.enc');
    this.encryption = new Encryption();
    this.ensureVaultDirectory();
  }

  private ensureVaultDirectory(): void {
    const dir = dirname(this.vaultPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  unlock(password: string): boolean {
    try {
      if (this.exists()) {
        this.loadVault(password);
      }
      this.masterPassword = password;
      return true;
    } catch {
      return false;
    }
  }

  isUnlocked(): boolean {
    return this.masterPassword !== null;
  }

  lock(): void {
    this.masterPassword = null;
  }

  exists(): boolean {
    return existsSync(this.vaultPath);
  }

  private loadVault(password: string): VaultData {
    const encrypted = readFileSync(this.vaultPath, 'utf8');
    const decrypted = this.encryption.decrypt(encrypted, password);
    return JSON.parse(decrypted);
  }

  private saveVault(data: VaultData): void {
    if (!this.masterPassword) {
      throw new Error('Vault is locked');
    }
    const json = JSON.stringify(data, null, 2);
    const encrypted = this.encryption.encrypt(json, this.masterPassword);
    writeFileSync(this.vaultPath, encrypted, 'utf8');
  }

  private getVaultData(): VaultData {
    if (!this.masterPassword) {
      throw new Error('Vault is locked');
    }

    if (!this.exists()) {
      return { version: '1.0.0', secrets: [] };
    }

    return this.loadVault(this.masterPassword);
  }

  addSecret(name: string, value: string, category?: string, metadata?: Record<string, string>): void {
    const data = this.getVaultData();

    const existingIndex = data.secrets.findIndex(s => s.name === name);
    const now = new Date().toISOString();

    const secret: Secret = {
      name,
      value,
      category,
      createdAt: existingIndex >= 0 ? data.secrets[existingIndex].createdAt : now,
      updatedAt: now,
      metadata
    };

    if (existingIndex >= 0) {
      data.secrets[existingIndex] = secret;
    } else {
      data.secrets.push(secret);
    }

    this.saveVault(data);
  }

  getSecret(name: string): Secret | null {
    const data = this.getVaultData();
    return data.secrets.find(s => s.name === name) || null;
  }

  listSecrets(category?: string): Secret[] {
    const data = this.getVaultData();
    if (category) {
      return data.secrets.filter(s => s.category === category);
    }
    return data.secrets;
  }

  deleteSecret(name: string): boolean {
    const data = this.getVaultData();
    const initialLength = data.secrets.length;
    data.secrets = data.secrets.filter(s => s.name !== name);

    if (data.secrets.length < initialLength) {
      this.saveVault(data);
      return true;
    }
    return false;
  }

  searchSecrets(query: string): Secret[] {
    const data = this.getVaultData();
    const lowerQuery = query.toLowerCase();
    return data.secrets.filter(s =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.category?.toLowerCase().includes(lowerQuery) ||
      Object.values(s.metadata || {}).some(v => v.toLowerCase().includes(lowerQuery))
    );
  }

  getCategories(): string[] {
    const data = this.getVaultData();
    const categories = new Set<string>();
    data.secrets.forEach(s => {
      if (s.category) categories.add(s.category);
    });
    return Array.from(categories).sort();
  }

  exportVault(password: string): string {
    const data = this.getVaultData();
    return this.encryption.encrypt(JSON.stringify(data), password);
  }

  importVault(encryptedData: string, password: string): void {
    const decrypted = this.encryption.decrypt(encryptedData, password);
    const importedData: VaultData = JSON.parse(decrypted);

    if (!this.masterPassword) {
      throw new Error('Vault is locked');
    }

    this.saveVault(importedData);
  }
}
