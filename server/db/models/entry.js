const Sequelize = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE
  },
  month: {
    type: Sequelize.STRING
  },
  day: {
    type: Sequelize.INTEGER
  },
  year: {
    type: Sequelize.INTEGER
  }
})

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const findMonth = entry => {
  const date = entry.date
  const month = date.getMonth()
  entry.month = months[month]
}

const findDay = entry => {
  const date = entry.date
  const day = date.getDate()
  entry.day = day
}

const findYear = entry => {
  const date = entry.date
  const year = date.getFullYear()
  entry.year = year
}

Entry.beforeCreate(findMonth)
Entry.beforeCreate(findDay)
Entry.beforeCreate(findYear)

module.exports = Entry
