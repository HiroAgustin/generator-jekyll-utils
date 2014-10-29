# generator-jekyll-utils

> [Yeoman](http://yeoman.io) generator that scaffolds out [Jekyll](http://jekyllrb.com/) content.

## Installation

Install the generator by running: `npm install -g generator-jekyll-utils`.

## Usage

Cd into your Jekyll project or your `_posts` directory, run this command and follow the prompts.

```
yo jekyll-utils:post
```

If you are using the amazing [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb), you can also run it from root folder.

## Going the extra mile

If you want to reduce all that typing, you can add the following code to your `.functions` file like [I did](https://github.com/HiroAgustin/dotfiles/commit/962c6d2e997cb317695e4111231110f98324382d).

```bash
# Yeoman Jekyll Utils
function jk () {
    yo jekyll-utils:$@;
}
```

## License and copyrights

This software is released under the terms of the [MIT license](https://github.com/HiroAgustin/generator-jekyll-utils/blob/master/LICENSE).
