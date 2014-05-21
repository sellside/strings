/**
 * Sellside <http://www.sellside.com>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2014 Sellside.
 * Licensed under the MIT License (MIT).
 */

var expect = require('chai').expect;
var Strings = require('../');


describe('.run()', function () {

  var strings;
  before(function () {
    strings = new Strings();
    strings.propstring('pretty', ':basename/index:ext');
  });

  it('when a group without a parser object is passed in', function () {
    var expected = ':basename/index:ext';
    strings.group('blog', 'pretty');
    var actual = strings.run('blog');
    expect(actual).to.eql(expected);
  });

  it('when a group with a parser object are passed in', function () {
    var expected = 'file/index.html';
    var parser = {
      ':basename': 'file',
      ':ext': '.html'
    };
    strings.group('blog', 'pretty', parser);
    var actual = strings.run('blog');
    expect(actual).to.eql(expected);
  });

  it('when a group with a parser object, and context are passed in', function () {
    var path = require('path');
    var expected = 'file/index.html';
    var parser = {
      ':basename': function () {
        return path.basename(this.filepath, path.extname(this.filepath));
      },
      ':ext': function () {
        return path.extname(this.filepath);
      }
    };
    var context = {
      filepath: 'path/to/my/file.html'
    };
    strings.group('blog', 'pretty', parser);
    var actual = strings.run('blog', context);
    expect(actual).to.eql(expected);
  });

  it('when a group with a named parser, and context are passed in', function () {
    var path = require('path');
    var expected = 'file/index.html';
    var parser = {
      ':basename': function () {
        return path.basename(this.filepath, path.extname(this.filepath));
      },
      ':ext': function () {
        return path.extname(this.filepath);
      }
    };
    var context = {
      filepath: 'path/to/my/file.html'
    };

    strings.parser('path', parser);
    strings.group('blog', 'pretty', 'path');
    var actual = strings.run('blog', context);
    expect(actual).to.eql(expected);
  });
});
