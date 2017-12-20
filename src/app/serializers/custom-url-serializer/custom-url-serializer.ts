import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {

    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: string): UrlTree {

       url = url.replace(/%28/g, '(').replace(/%29/g, ')');

       return this._defaultUrlSerializer.parse(url);
    }

    serialize(tree: UrlTree): string {

       return this._defaultUrlSerializer.serialize(tree).replace(/\(/g, '%28').replace(/\)/g, '%29');

    }
}
