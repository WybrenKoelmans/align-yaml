const repeat = require('repeat-string');
const getLongest = require('longest');

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

module.exports = function (str, pad) {
    var blocks = str.split('\n\n');
    var ret = [];
    for (block of blocks) {
        var props = getMatches(block, /^(\s*[\S]+?:).*\S/gm, 1);
        if (props.length === 0) {
            ret.push(block);
            continue;
        }

        var longest = getLongest(props).length + (pad || 0);
        var item = block.split('\n').map(function (rawLine) {
            var line = /^(\s*.+?[^:#]: )\s*(.*)/gm;

            return rawLine.replace(line, function (match, $1, $2) {
                var len = longest - $1.length + 1;
                return $1 + repeat(' ', len) + $2;
            });
        }).join('\n');

        // console.log(item);
        ret.push(item);
    }

    return ret.join('\n');
};
