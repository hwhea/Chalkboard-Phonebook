declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
  }
}