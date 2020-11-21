export default class AuthenticationService {
  static isAuthenticated: boolean = false;

  static login(token: string): Promise<boolean> {
    const isAuthenticated = token === sessionStorage.getItem('token');
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAuthenticated = isAuthenticated;
        resolve(isAuthenticated);
      }, 10);
    });
  }

  static logout(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAuthenticated = false;
        resolve(this.isAuthenticated);
      }, 1);
    });
  }
}
