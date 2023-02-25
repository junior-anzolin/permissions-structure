import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get('http://localhost:3000/user');
  }

  get(id: string) {
    return this.http.get(`http://localhost:3000/user/${id}`);
  }

  create(user: any) {
    return this.http.post('http://localhost:3000/user', user);
  }

  update(id: string, user: any) {
    return this.http.put(`http://localhost:3000/user/${id}`, user);
  }

  addPermissionOrGroup(id: string, data: any) {
    this.http.put(`http://localhost:3000/permission/user/${id}`, data);
  }

  rmPermissionOrGroup(id: string, data: any) {
    this.http.delete(`http://localhost:3000/permission/user/${id}`, {
      body: data,
    });
  }
}
