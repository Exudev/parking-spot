const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing enviorement variable ${key}`);
  }
  return value;
};
export const NODE_ENV = getEnv("NODE_ENV","development");
export const PORT = getEnv("PORT","3000");
export const MONGO_URI = getEnv("MONGO_URI");
export const MAXRETRYATTEMPTS = getEnv("MAXRETRYATTEMPTS","5");
export const SECRET_KEY_JWT = getEnv("SECRET_KEY_JWT",);
export const SALT_ROUNDS = getEnv("SALT_ROUNDS");
export const DB_USER = getEnv("DB_USER");
export const DB_PASSWORD = getEnv("DB_PASSWORD");
export const DB_HOST = getEnv("DB_HOST");