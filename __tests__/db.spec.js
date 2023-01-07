const db = require('../db')
const fs = require('fs')
jest.mock('fs')
describe('db', () => {
  beforeEach(() => {
    fs.clearMocks()
  })
  it('can read', async () => {
    const mockData = [{ title: 'task1', done: false }]
    fs.setMock('/mock', null, JSON.stringify(mockData))
    const list = await db.read('/mock')
    expect(list).toEqual(mockData)
  })
  it('can write', async () => {
    let mockFileContent = null
    fs.setWriteFileMock('/mock', (path, data, options, callback) => {
      mockFileContent = data
      callback(null)
    })
    const list = [{ title: 'task1', done: false }]
    await db.write(list, '/mock')
    expect(mockFileContent).toEqual(JSON.stringify(list))
  })
})
