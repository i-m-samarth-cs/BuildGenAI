export interface User {
  id: string;
  username: string;
  email: string;
  joinedAt: string;
}

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('buildgen_user');
  return user ? JSON.parse(user) : null;
};

export const login = (email: string, username: string = "Builder"): User => {
  const user: User = {
    id: btoa(email).substring(0, 10),
    username: username || "Builder",
    email,
    joinedAt: new Date().toISOString(),
  };
  localStorage.setItem('buildgen_user', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('buildgen_user');
};
