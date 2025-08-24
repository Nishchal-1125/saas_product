export interface QueryOptions {
  select?: string[];
  where?: Record<string, any>;
  orderBy?: Record<string, 'ASC' | 'DESC'>;
  limit?: number;
  offset?: number;
  relations?: string[];
}

export class QueryUtil {
  static buildWhereClause(filters: Record<string, any>): string {
    const conditions: string[] = [];
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          conditions.push(`${key} = '${value}'`);
        } else if (typeof value === 'number') {
          conditions.push(`${key} = ${value}`);
        } else if (typeof value === 'boolean') {
          conditions.push(`${key} = ${value}`);
        } else if (Array.isArray(value)) {
          const values = value.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
          conditions.push(`${key} IN (${values})`);
        }
      }
    });

    return conditions.length > 0 ? conditions.join(' AND ') : '';
  }

  static buildOrderByClause(orderBy: Record<string, 'ASC' | 'DESC'>): string {
    const orders = Object.entries(orderBy).map(([key, direction]) => `${key} ${direction}`);
    return orders.length > 0 ? orders.join(', ') : '';
  }

  static sanitizeInput(input: string): string {
    // Basic SQL injection prevention
    return input.replace(/['"\\;]/g, '');
  }

  static escapeValue(value: any): string {
    if (typeof value === 'string') {
      return `'${value.replace(/'/g, "''")}'`;
    }
    return String(value);
  }

  static buildSearchQuery(searchTerm: string, fields: string[]): string {
    if (!searchTerm || fields.length === 0) {
      return '';
    }

    const sanitizedTerm = this.sanitizeInput(searchTerm);
    const conditions = fields.map(field => `${field} ILIKE '%${sanitizedTerm}%'`);
    return `(${conditions.join(' OR ')})`;
  }
}
