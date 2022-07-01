import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

  get(id: String): Observable<Duty> {
    return this.http.get<Duty>(`${baseUrl}/${id}`);
  }

  create(data: { Id: String; Name: String }): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: String, data: { Id: String; Name: String }): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
