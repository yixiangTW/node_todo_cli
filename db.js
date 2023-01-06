const fs = require('fs')
const path = require('path')
const homedir = process.env.HOME
const dbPath = path.join(homedir, '.todo')

const db = {
  read (filePath = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, {
        flag: 'a+'
      }, (error, data) => {
        if (error) {
          return reject(error)
        }
        let list = []
        try {
          list = JSON.parse(data.toString())
        } catch (err) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write (list, filePath = dbPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(list), (error) => {
        if (error) {
          return reject(error)
        }
        resolve()
      })
    })
  }
}
module.exports = db
