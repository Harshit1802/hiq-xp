import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../models/Constant';
import { Menu } from '../models/menu';
import { Page } from '../models/renderer';

@Injectable({
  providedIn: 'root'
})
export class RendererService {
  assetsPath: string = "assets/forms/";
  defaultDataPath: string = "assets/default-data/";
  baseUrl = Constant.apiUrl;
  constructor(private http: HttpClient) { }

  getMenus() {
    return this.http.get<Menu[]>(this.assetsPath + 'menu.json');
  }

  getPageJson(json: string) {
    return this.http.get<Page>(this.assetsPath + json);
  }
  getDefaultData(json: string) {
    return this.http.get<any>(this.defaultDataPath + json);
  }
  getData(url: string) {
    return this.http.get<any>(this.baseUrl + url);
  }

  postData(url: string, data: any) {
    if (data['_id'] && data['_id'].length > 0) {
      return this.http.put<any>(this.baseUrl + url + '?_id=' + data['_id'], data);
    } else {
      return this.http.post<any>(this.baseUrl + url, data);
    }

  }

}
