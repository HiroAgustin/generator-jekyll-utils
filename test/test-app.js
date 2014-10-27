/*global describe, before, it*/
;(function (path, yeomanGenerator, os)
{
  'use strict';

  var assert = yeomanGenerator.assert
    , helpers = yeomanGenerator.test;

  describe('jekyll-utils:app', function ()
  {
    before(function (done)
    {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({
          'skip-install': true
        })
        .withPrompt({
          someOption: true
        })
        .on('end', done);
    });

    it('creates files', function ()
    {
      assert.file([
        'bower.json'
      , 'package.json'
      , '.editorconfig'
      , '.jshintrc'
      ]);
    });
  });

}(require('path'), require('yeoman-generator'), require('os')));
