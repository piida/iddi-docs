// const { run } = require('runjs')
const chalk = require('chalk')
const config = require('../src/docs/.vuepress/config')
// const rawArgv = process.argv.slice(2)
// const args = rawArgv.join(' ')

const port = 9526
const publicPath = '/'; // config.base || '/';

var connect = require('connect')
var serveStatic = require('serve-static')
const app = connect()

app.use(
  publicPath,
  serveStatic('./dist', {
    index: ['index.html', '/']
  })
)

app.listen(port, function () {
  console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}/docs`))
})
