const fs = require('fs')
const path = require('path')
const homedir = process.env.HOME
const dbPath = path.join(homedir, '.todo')

const db = {
  read (filePath = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, {
        flag: 'a+'
      }, (error: any, data: any) => {
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
  write (list: any[], filePath = dbPath) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(list), (error: any) => {
        if (error) {
          return reject(error)
        }
        resolve('success')
      })
    })
  }
}
module.exports = db
