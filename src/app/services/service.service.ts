import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string = 'http://localhost:1337/'

  constructor(
    private http: HttpClient
  ) { }
  public postUser( body ) : Observable<any>{
    return this.http.post(this.url + 'users', body)
  }

  public getPacientes(): Observable<any> {
    return this.http.get(this.url+'pacientes')
  }
  getActivity(id):Observable<any>{
    return this.http.get(this.url + 'pacientes/' + id)
  }
  public deletePacientes(id):Observable<any>{
    return this.http.delete(this.url + 'pacientes/' + id)
  }
  public updatePacientes( id, body) : Observable<any>{
    return this.http.put(this.url + 'pacientes/'+id, body)
  }
  public postPacientes(body):Observable<any>{
    return this.http.post(this.url + 'pacientes',body)
  }
}
