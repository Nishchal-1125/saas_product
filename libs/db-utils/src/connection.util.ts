export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
  connectionTimeoutMillis?: number;
  idleTimeoutMillis?: number;
  max?: number;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  keyPrefix?: string;
  retryDelayOnFailover?: number;
  maxRetriesPerRequest?: number;
}

export interface MongoConfig {
  uri: string;
  options?: {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
    maxPoolSize?: number;
    serverSelectionTimeoutMS?: number;
    socketTimeoutMS?: number;
  };
}

export class ConnectionUtil {
  static getPostgresConfig(): DatabaseConfig {
    return {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'ecommerce',
      ssl: false,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      max: 10,
    };
  }

  static getRedisConfig(): RedisConfig {
    return {
      host: 'localhost',
      port: 6379,
      db: 0,
      keyPrefix: 'ecommerce:',
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
    };
  }

  static getMongoConfig(): MongoConfig {
    return {
      uri: 'mongodb://localhost:27017/ecommerce',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      },
    };
  }

  static buildConnectionString(config: DatabaseConfig): string {
    const { host, port, username, password, database, ssl } = config;
    return `postgresql://${username}:${password}@${host}:${port}/${database}${ssl ? '?ssl=true' : ''}`;
  }

  static parseConnectionString(connectionString: string): Partial<DatabaseConfig> {
    // Basic parsing without URL constructor
    const regex = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
    const match = connectionString.match(regex);
    
    if (!match) {
      throw new Error('Invalid connection string format');
    }

    return {
      username: match[1],
      password: match[2],
      host: match[3],
      port: parseInt(match[4] || '5432'),
      database: match[5],
      ssl: connectionString.includes('ssl=true'),
    };
  }
}
