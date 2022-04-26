import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { OktaAuthStateService, OKTA_AUTH  } from '@okta/okta-angular';
import { from, lastValueFrom, Observable} from 'rxjs';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Add access token for secured endpoints
    const securedEndpoints = [environment.shopApiUrl + '/api/orders'];
    if (securedEndpoints.some(url => req.urlWithParams.includes(url))) {
      const accessToken = await this.oktaAuth.getAccessToken();

      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return await lastValueFrom(next.handle(req));
  }
}
