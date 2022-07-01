import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Duty } from "../models/duty.model";
const baseUrl = "http://localhost:3000/api/duties";
@Injectable({
  providedIn: "root",
})
export class DutyService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Duty[]> {
    return this.http.get<Duty[]>(baseUrl);
  }
  get(id: any): Observable<Duty> {
    return this.http.get<Duty>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Duty[]> {
    return this.http.get<Duty[]>(`${baseUrl}?title=${title}`);
  }
}
