import { camelCase, snakeCase, isPlainObject } from "lodash";

export function mapToSnake(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(mapToSnake);
  } else if (isPlainObject(obj)) {
    const result: Record<string, any> = {};
    for (const key in obj) {
      const newKey = snakeCase(key);
      result[newKey] = mapToSnake(obj[key]);
    }
    return result;
  }
  return obj;
}

export function mapToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(mapToCamel);
  } else if (isPlainObject(obj)) {
    const result: Record<string, any> = {};
    for (const key in obj) {
      const newKey = camelCase(key);
      result[newKey] = mapToCamel(obj[key]);
    }
    return result;
  }
  return obj;
}
