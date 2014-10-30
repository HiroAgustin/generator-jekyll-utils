;(function (yeoman, os, fs, path)
{
  'use strict';

  var assert = yeoman.assert
    , helpers = yeoman.test;

  function run ()
  {
    return helpers.run(path.join(__dirname, '../page'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-greeting': true
      });
  }

  function readFile (route)
  {
    return fs.readFileSync(route, {
      encoding: 'utf-8'
    }).trim().split('\n');
  }

  describe('jekyll-utils:page', function ()
  {
    describe('default usage', function ()
    {
      before(function (done)
      {
        run()
          .withPrompt({
            name: 'About Me'
          })
          .on('end', done);
      });

      it('creates the page', function ()
      {
        assert.equal(process.cwd().split(path.sep).pop(), 'about-me');
        assert.file('./index.html');
      });

      it('with the selected content', function ()
      {
        var content = readFile('./index.html');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: page');
        assert.equal(content[2], 'title: About Me');
        assert.equal(content[3], '---');
      });
    });

    describe('with title in the arguments', function ()
    {
      before(function (done)
      {
        run()
          .withArguments('Contact Me')
          .withPrompt({
            isFolder: false
          , layout: 'default'
          , extention: 'md'
          })
          .on('end', done);
      });

      it('creates the page', function ()
      {
        assert.file('./contact-me.md');
      });

      it('with the selected content', function ()
      {
        var content = readFile('./contact-me.md');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: default');
        assert.equal(content[2], 'title: Contact Me');
        assert.equal(content[3], 'permalink: /contact-me/');
        assert.equal(content[4], '---');
      });
    });
  });

}(require('yeoman-generator'), require('os'), require('fs'), require('path')));
