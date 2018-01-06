import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {

    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: string): UrlTree {

        /*
            We, counter-intuitively, replace parentheses with their
            escaped equivalent because the DefaultUrlSerializer
            incorrectly stops parsing when it hits a parentheses.

            It does however correctly parse urls with
            escaped parentheses.
        */
        url = url.replace(/\(/g, '%28').replace(/\)/g, '%29');

        return this._defaultUrlSerializer.parse(url);

    }

    serialize(tree: UrlTree): string {

        return this._defaultUrlSerializer.serialize(tree).replace(/\(/g, '%28').replace(/\)/g, '%29');

    }
}
