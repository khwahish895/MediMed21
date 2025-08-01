declare module '*.jsx' {
  const content: any;
  export default content;
}

declare module '../contexts/MockAuthContext.tsx' {
  export interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<any>;
    signup: (email: string, password: string, name: string, role: string) => Promise<any>;
    logout: () => Promise<void>;
  }

  export function useAuth(): AuthContextType;
  export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element;
} 