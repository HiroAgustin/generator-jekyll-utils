# generator-jekyll-utils

> [Yeoman](http://yeoman.io) generator that scaffolds out [Jekyll](http://jekyllrb.com/) content.

## Installation

Install the generator by running: `npm install -g generator-jekyll-utils`.

## Usage

Cd into your Jekyll project and run any of the following commands:

* `yo jekyll-utils:post`
* `yo jekyll-utils:draft`
* `yo jekyll-utils:page`

## Options

You can also write the **title** in the arguments: `yo jekyll-utils:page About Me`.

Passing the `--skip-greeting` flag hides Yeoman ☹.

## Support

If you are using the amazing [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb) you can run it from the root folder.

## Shortcut

If you want to reduce typing you can add the following code to your `.functions` file like [I did](https://github.com/HiroAgustin/dotfiles/commit/962c6d2e997cb317695e4111231110f98324382d).

```bash
# Yeoman Jekyll Utils
function jk () {
  yo jekyll-utils:$@;
}
```

This results in the ability to run `jk post My new blog post`.

## License

[MIT license](https://github.com/HiroAgustin/generator-jekyll-utils/blob/master/LICENSE).
