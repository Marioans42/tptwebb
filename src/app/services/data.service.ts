import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs/index';
import {catchError, map, tap} from 'rxjs/internal/operators';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {ConstantHTTP} from '../utils/ConstantHttp'
import {DataResponse} from '../models/DataResponse'
import {Game} from '../models/Game'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  /**
   * Get data from server
   * @param {string} fromUrl <url>
   * @returns {Observable<DataResponse>}
   */
  get(fromUrl: string): Observable<DataResponse> {
    return this.http.get<DataResponse>(fromUrl).pipe(
      tap((response: DataResponse) => {
        if (response.code === ConstantHTTP.CODE_MISSING_INVALID_TOKEN) {
          this.router.navigate(['/login']);
        }
        console.log(response);
        // return response.data.

      }),
      catchError(this.handleError<DataResponse>('Get service'))
    );
  }

  getGame(fromUrl: string): Observable<Game> {
    return this.http.get<Game>(fromUrl).pipe(
      tap((response: Game) => {
        console.log(response);
        // return response.data.

      }),
      catchError(this.handleError<Game>('Get service'))
    );
  }

  /**
   *  Post object to server
   * @param {string} fromUrl <url>
   * @param body <Object to post>
   * @param options <http headers, params...>
   * @returns {Observable<any>}
   */
  post(fromUrl: string, body: any = null, options: any = null):  Observable<any> {
    options = (isNullOrUndefined(options)) ? { headers : new HttpHeaders()} : options;
    return this.http.post<DataResponse>(fromUrl, body, options).pipe(
      tap((response: any) => {
        if (response.code === ConstantHTTP.CODE_MISSING_INVALID_TOKEN ) {
          this.router.navigate(['/login']);
        }
      }),
      catchError(this.handleError<DataResponse>('Post service'))
    );
  }
}
