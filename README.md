# @barndev/result

Errors-as-values Typescript implementation with opt-in runtime enum.

`@barndev/result` exports a single type, `Result` which can have either a `data: T` or an `error: string | Error`, but never both. The alternate `@barndev/result/enum` entrypoint exports an enum-like object that can be used at runtime to create `Result`s.

## Installation

If runtime enum is not used, `@barndev/result` can be installed as a dev dependency.

#### Type only

```sh
npm i -D @barndev/result
```

#### Runtime enum

```sh
npm i @barndev/result
```

`/enum` entrypoint can also be imported directly from [esm.sh](https://esm.sh/) CDN.

```js
import { Result } from 'https://esm.sh/@barndev/result/enum';
```

## Usage

### Creating a `Result`

`Result` should be used anywhere an error can occur.

#### Type only

```ts
import type { Result } from '@barndev/result';

async function readConfig(): Promise<Result<string>> {
    try {
        const json = await readFile('config.json');
        const config = JSON.parse(json);
        return { data: config, error: null };
    } catch (err) {
        console.error(err);
        return {
            data: null,
            error: `Failed to read config. Error ${err}`,
        };
    }
}
```

#### Runtime enum

```ts
import { Result } from '@barndev/result/enum';

async function fetchPosts(): Promise<Result<Post[]>> {
    try {
        const res = await (await fetch('/posts')).json();
        return Result.Ok(res.posts);
    } catch (err) {
        console.error(err);
        return Result.Err(`Failed to fetch posts. Error: ${err}`);
    }
}
```

### Handling a `Result`

Guard clauses with early returns can be used to take advantage of type narrowing.

```ts
function handleResult(res: Result<string>) {
    if (res.error !== null) {
        doErrorStuff(res.error);
        //               ^? error: string | Error
        return;
    }
    doSuccessStuff(res.data);
    //                 ^? data: string
}
```
