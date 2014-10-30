# generator-jekyll-utils

> [Yeoman](http://yeoman.io) generator that scaffolds out [Jekyll](http://jekyllrb.com/) content.

## Installation

Install the generator by running: `npm install -g generator-jekyll-utils`.

## Usage

Cd into your Jekyll project, run the command you want and follow the prompts.

* To create a new post: `yo jekyll-utils:post`
* To create a new draft: `yo jekyll-utils:draft`
* To create a new page: `yo jekyll-utils:page`

You can also pass the *title* as an argument: `yo jekyll-utils:page About Me`.

## Support

If you are using the amazing [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb), you can run it from root folder without the need to go inside `/app`.

## Shortcut

If you want to reduce most of the typing, you can add the following code to your `.functions` file like [I did](https://github.com/HiroAgustin/dotfiles/commit/962c6d2e997cb317695e4111231110f98324382d).

```bash
# Yeoman Jekyll Utils
function jk () {
  yo jekyll-utils:$@;
}
```

This results in the ability to run `jk post My new blog post`.

## License

[MIT license](https://github.com/HiroAgustin/generator-jekyll-utils/blob/master/LICENSE).
