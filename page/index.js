;(function (yosay, yeoman, fs, path)
{
  'use strict';

  module.exports = yeoman.generators.Base.extend({

    initializing: function ()
    {
      this.root = this.getRootPath();

      this.name = Array.prototype.join.call(arguments, ' ');
    }

  , getRootPath: function ()
    {
      var cwd = process.cwd()
        , oneUp = path.join(cwd, '..')
        , onApp = path.join(cwd, 'app');

      if (fs.existsSync(path.join(cwd, '_layouts')))
        return cwd;

      if (fs.existsSync(path.join(oneUp, '_layouts')))
        return oneUp;

      if (fs.existsSync(path.join(onApp, '_layouts')))
        return onApp;

      return cwd;
    }

  , prompting: function ()
    {
      var name = this.name
        , done = this.async()
        , layouts = fs.readdirSync(path.join(this.root, '_layouts')).map(function (name)
          {
            return name.split('.')[0];
          });

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
            type: 'confirm'
          , name: 'isFolder'
          , message: 'Should it be inside a folder?'
          , default: true
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
          this.extention = props.extention;
          this.name = this._.titleize(name || props.name);
          this.layout = props.layout;

          this.isFolder = props.isFolder;

          done();

        }.bind(this)
      );
    }

  , writing: function ()
    {
      if (this.isFolder)
      {
        this.destinationRoot(path.join(this.root, this._.slugify(this.name)));

        this.template('page.html', 'index.html');
      }
      else
      {
        this.destinationRoot(this.root);

        this.template('page.html', this._.slugify(this.name) + '.' + this.extention);
      }
    }
  });

}(require('yosay'), require('yeoman-generator'), require('fs'), require('path')));
