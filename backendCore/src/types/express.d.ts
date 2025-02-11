declare global {
  namespace Express {
    interface User {
      email: string;
      username: string;
      role: string;
    }
  }
}

export {};
