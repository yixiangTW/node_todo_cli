#!/usr/bin/env node

const { program } = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')

program.version(pkg.version)

program
  .command('add <taskName>')
  .description('add a task')
  .action((taskName) => {
    api.add(taskName)
  })
program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear()
  })
program
  .command('show')
  .description('show all tasks')
  .action(() => {
    api.showAll()
  })

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log(options)
