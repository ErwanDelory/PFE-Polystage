export default class AuthenticationService {
    static isAuthenticated: boolean = false;

    static login(token: string): Promise<boolean> {
        const isAuthenticated = (token === sessionStorage.getItem("token"));
        console.log(isAuthenticated);
        console.log(token);
        console.log(sessionStorage.getItem('token'));
        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = isAuthenticated;
                resolve(isAuthenticated);
            }, 10);
        });
    }
}