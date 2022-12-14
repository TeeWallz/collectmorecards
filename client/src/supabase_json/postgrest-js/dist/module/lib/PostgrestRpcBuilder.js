import { PostgrestBuilder } from './types';
import PostgrestFilterBuilder from './PostgrestFilterBuilder';
export default class PostgrestRpcBuilder extends PostgrestBuilder {
    constructor(url, { headers = {}, schema, fetch, shouldThrowOnError, } = {}) {
        super({ fetch, shouldThrowOnError });
        this.url = new URL(url);
        this.headers = Object.assign({}, headers);
        this.schema = schema;
    }
    /**
     * Perform a function call.
     */
    rpc(params, { head = false, count = null, } = {}) {
        if (head) {
            this.method = 'HEAD';
            if (params) {
                Object.entries(params).forEach(([name, value]) => {
                    this.url.searchParams.append(name, value);
                });
            }
        }
        else {
            this.method = 'POST';
            this.body = params;
        }
        if (count) {
            if (this.headers['Prefer'] !== undefined)
                this.headers['Prefer'] += `,count=${count}`;
            else
                this.headers['Prefer'] = `count=${count}`;
        }
        return new PostgrestFilterBuilder(this);
    }
}
//# sourceMappingURL=PostgrestRpcBuilder.js.map