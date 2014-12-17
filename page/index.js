;(function (yosay, yeoman, fs, path)
{
  'use strict';

  module.exports = yeoman.generators.Base.extend({

    initializing: function ()
    {
      this.cwd = process.cwd();
      this.root = this.getRootPath();

      this.name = Array.prototype.join.call(arguments, ' ');
    }

  , getRootPath: function ()
    {
      var cwd = this.cwd
        , oneUp = path.join(cwd, '..')
        , onApp = path.join(cwd, 'app');

      if (fs.existsSync(path.join(cwd, '_layouts')))
        return cwd;

      if (fs.existsSync(path.join(oneUp, '_layouts')))
        return oneUp;

      if (fs.existsSync(path.join(onApp, '_layouts')))
        return onApp;
    }

  , getLayouts: function ()
    {
      var layouts = [];

      if (this.root)
        layouts = fs.readdirSync(path.join(this.root, '_layouts'));

      return layouts.map(function (name)
      {
        return name.split('.')[0];
      });
    }

  , prompting: function ()
    {
      var name = this.name
        , done = this.async()
        , layouts = this.getLayouts();

      // Have Yeoman greet the user.
      if (!this.options['skip-greeting'])
        this.log(yosay('Creating a page? I can help with that!'));

      this.prompt(
        [
          {
            type: 'input'
          , name: 'name'
          , message: 'What is the page title?'
          , when: function ()
            {
              return !name;
            }
          }
        , {
            type: 'list'
          , name: 'layout'
          , message: 'Which layout would you like to use?'
          , default: 'page'
          , choices: layouts.concat('null')
          }
        , {
            type: 'list'
          , name: 'extention'
          , message: 'Which file extention?'
          , default: 'html'
          , choices: [
              'md'
            , 'mkd'
            , 'mkdn'
            , 'html'
            , 'mkdown'
            , 'textile'
            , 'markdown'
            ]
          , when: function (props)
            {
              return !props.isFolder;
            }
          }
        ]

      , function (props)
        {
          this.name = this._.titleize(name || props.name);
          this.extention = props.extention;
          this.layout = props.layout;

          done();

        }.bind(this)
      );
    }

  , writing: function ()
    {
      this.destinationRoot(path.join(this.root || this.cwd, this._.slugify(this.name)));

      this.template('page.html', 'index.' + this.extention);
    }
  });

}(require('yosay'), require('yeoman-generator'), require('fs'), require('path')));
