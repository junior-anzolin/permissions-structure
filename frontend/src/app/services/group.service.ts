import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private readonly http: HttpClient) {}

  list() {
    return this.http.get('http://localhost:3000/permission/groups');
  }

  get(id: string) {
    return this.http.get(`http://localhost:3000/permission/group/${id}`);
  }

  create(user: any) {
    return this.http.post('http://localhost:3000/permission/group', user);
  }

  update(id: string, data: any) {
    return this.http.put(`http://localhost:3000/permission/group/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`http://localhost:3000/permission/group/${id}`);
  }
}
