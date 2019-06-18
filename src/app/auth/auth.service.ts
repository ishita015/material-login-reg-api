import { Injectable } from '@angular/core';
@Injectable()

export class AuthService {
    public isAuthenticated(): boolean {
        const token = this.getToken();
        let x = false;
        if (token) {
            alert("token");
            return true
        }
        alert("token false");
        return false
    }

    public getToken(): string {
        return JSON.parse(localStorage.getItem('token'));
    }
}