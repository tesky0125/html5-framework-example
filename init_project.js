var fs = require('file-system');
var prompt = require('prompt');
var iterator = require('object-recursive-iterator');

var project_template_filename = 'project.json';
var read_me_filename = 'README.md';

prompt.start();
prompt.get([{
  name: 'project_type',
  description: '请输入项目类型(如lu-m-cash,请输入cash)',
  required: true,
  before: function(value) {
    return 'lu-m-' + value;
  }
}, {
  name: 'product_name',
  description: '请输入产品名称(如零活宝,请输入LHB)',
  required: true,
  before: function(value) {
    return value.toUpperCase();
  }
}], function(err, results) {
  var project_type = results.project_type;
  var product_name = results.product_name;

  var project_template = fs.readFileSync(project_template_filename, {
    encoding: 'utf8'
  });

  var project_json_str = project_template.replace(/\$\{project_type\}/g, project_type)
    .replace(/\$\{product_name\}/g, product_name);

  var project_json = JSON.parse(project_json_str);

  console.log(project_json);


  iterator.forAll(project_json, function(path, key, obj) {

    var path_str = path.join('/');
    if (key === 'readme') {
      if (!fs.existsSync(path_str)) {
        console.log(path_str, key, obj[key]);
        fs.mkdirSync(path_str);
      }
      fs.writeFileSync([path_str, read_me_filename].join('/'), obj[key]);
    }

  });

});