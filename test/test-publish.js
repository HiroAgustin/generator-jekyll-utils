;(function (yeoman, os, fs, path)
{
  'use strict';

  var assert = yeoman.assert
    , helpers = yeoman.test

    , date = new Date()
    , prefix = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  function readFile (route)
  {
    return fs.readFileSync(route, {
      encoding: 'utf-8'
    }).trim().split('\n');
  }

  describe('jekyll-utils:publish', function ()
  {
    describe('default usage', function ()
    {
      before(function (done1)
      {
        var temp = path.join(os.tmpdir(), './temp-test');

        helpers.run(path.join(__dirname, '../publish'))
          .inDir(temp, function ()
          {
            var done2 = this.async();

            helpers.run(path.join(__dirname, '../draft'))
              .inDir(temp)
              .withOptions({
                'skip-greeting': true
              })
              .withArguments('My Sweet Draft')
              .on('end', function ()
              {
                // Runnig a generator changes cwd
                process.chdir('..');
                done2();
              });
          })
          .withOptions({
            'skip-greeting': true
          })
          .withPrompt({
            name: 'My Awesome Post'
          , draft: prefix + '-my-sweet-draft.md'
          })
          .on('end', done1);
      });

      it('turns draft into post', function ()
      {
        process.chdir('..');

        assert.noFile('./_drafts/' + prefix + '-my-sweet-draft.md');
        assert.file('./_posts/' + prefix + '-my-awesome-post.md');
      });

      it('with the updated title', function ()
      {
        var content = readFile('./_posts/' + prefix + '-my-awesome-post.md');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: post');
        assert.equal(content[2], 'title: My Awesome Post');
        assert.equal(content[3].indexOf('date: ' + prefix), 0);
        assert.equal(content[4], '---');
      });
    });
  });

}(require('yeoman-generator'), require('os'), require('fs'), require('path')));
