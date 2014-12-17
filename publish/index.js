;(function (yosay, yeoman, fs, path)
{
  'use strict';

  module.exports = yeoman.generators.Base.extend({

    initializing: function ()
    {
      this.cwd = process.cwd();
      this.root = this.getRootPath();

      this.destinationRoot(path.join(this.root || this.cwd, '_posts'));
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

  , getDrafts: function ()
    {
      var drafts = [];

      if (this.root)
        drafts = fs.readdirSync(path.join(this.root, '_drafts'));

      return drafts.map(function (name)
      {
        return {
          name: this.getTitle(name)
        , value: name
        };

      }.bind(this));
    }

  , getTitle: function (name)
    {
      if (name)
        return this._.titleize(name.split('.')[0].split('-').slice(3).join(' '));
    }

  , prompting: function ()
    {
      var done = this.async()
        , drafts = this.getDrafts();

      // Have Yeoman greet the user.
      if (!this.options['skip-greeting'])
        this.log(yosay('Publishing a post? I can help with that!'));

      this.prompt(
        [
          {
            type: 'list'
          , name: 'draft'
          , message: 'Which draft would you like to publish?'
          , choices: drafts
          }
        , {
            type: 'input'
          , name: 'name'
          , message: 'Would you like to change the title?'
          , default: function (props)
            {
              return this.getTitle(props.draft);
            }.bind(this)
          }
        ]

      , function (props)
        {
          var isoDate = new Date().toISOString().split('T');

          this.date = isoDate[0];
          this.time = isoDate[1].split('.')[0];

          this.draft = props.draft;
          this.name = this._.titleize(props.name);
          this.extention = props.draft.split('.')[1];

          done();

        }.bind(this)
      );
    }

    // TODO: This sucks!
  , writing: function ()
    {
      var source = path.join(this.root, '_drafts', this.draft)
        , lines = this.readFileAsString(source).split('\n');

      lines[2] = 'title: ' + this.name;
      lines[3] = 'date: ' + this.date + ' ' + this.time;

      this.writeFileFromString(lines.join('\n'), source);

      fs.renameSync(source
      , path.join(this.root, '_posts', this.date + '-' + this._.slugify(this.name) + '.' + this.extention)
      );
    }
  });

}(require('yosay'), require('yeoman-generator'), require('fs'), require('path')));
