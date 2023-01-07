const db = require('./db.ts')

const inquirer = require('inquirer')

const add = async (title: any) => {
  const list: any = await db.read()
  list.push({
    title,
    done: false
  })
  return await db.write(list)
}

const clear = async () => {
  await db.write([])
}

const showAll = async () => {
  const list = await db.read()
  printTasks(list)
}

function askForCreateTask (list: any) {
  inquirer.prompt([{
    type: 'input',
    name: 'title',
    message: 'Input task title'
  }]).then(({
    title
  }: any) => {
    list.push({ title, done: false })
    db.write(list)
  })
}

const actionTable: any = {
  markAsDone: (index: any, list: any) => {
    list[index].done = true
    db.write(list)
  },
  markAdUnDone: (index: any, list: any) => {
    list[index].done = false
    db.write(list)
  },
  remove: (index: any, list: any) => {
    list.splice(index, 1)
    db.write(list)
  },
  updateTitle: (index: any, list: any) => {
    inquirer.prompt([{
      type: 'input',
      name: 'title',
      message: 'New title',
      default: list[index].title
    }]).then(({
      title
    }: any) => {
      list[index].title = title
      db.write(list)
    })
  }
}

function askForChooseExistTask (index: any, list: any) {
  inquirer
    .prompt([{
      type: 'list',
      name: 'action',
      message: 'Please chooice action',
      choices: [{
        name: 'exit',
        value: 'exit'
      }, {
        name: '已完成',
        value: 'markAsDone'
      }, {
        name: '未完成',
        value: 'markAdUnDone'
      }, {
        name: '删除',
        value: 'remove'
      }, {
        name: '改标题',
        value: 'updateTitle'
      }]
    }]).then(({
      action
    }: any) => {
      return actionTable[action] ? actionTable[action](index, list) : null
    })
}

function askForAction (index: any, list: any) {
  if (index >= 0) {
    askForChooseExistTask(index, list)
  }
  if (index === -2) {
    askForCreateTask(list)
  }
}

function printTasks (list: any) {
  inquirer
    .prompt([{
      type: 'list',
      name: 'index',
      message: 'Please select one?',
      choices: [{
        name: 'exit',
        value: -1
      }, ...list.map((task: any, index: any) => {
        return {
          name: `${task.done ? '[√]' : '[×]'} ${index + 1} ${task.title}`,
          value: index.toString()
        }
      }), {
        name: '[+] create a task',
        value: -2
      }]
    }])
    .then((answers: any) => {
      const index = Number(answers.index)
      askForAction(index, list)
    })
}

module.exports = {
  add,
  clear,
  showAll
}
