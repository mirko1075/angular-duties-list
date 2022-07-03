import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Duty } from "../models/duty.model";
@Injectable({
  providedIn: "root",
})
export class DutyService {
  private readonly baseUrl = "http://localhost:3000/api/duties";
  private readonly httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Duty[]> {
    return this.http.get<Duty[]>(this.baseUrl);
  }

  public get(id: String): Observable<Duty> {
    return this.http.get<Duty>(`${this.baseUrl}/${id}`);
  }

  public create(data: { Id: String; Name: String }): Observable<any> {
    return this.http
      .post(this.baseUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError<Duty>(`createDuty`)));
  }

  public update(
    id: String,
    data: { Id: String; Name: String }
  ): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError<Duty>(`updateDuty`)));
  }

  public delete(id: String): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<Duty>(`deleteDuty`)));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      throw new Error(error);
    };
  }
}
