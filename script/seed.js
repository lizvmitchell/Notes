'use strict'

const db = require('../server/db')
const {User, Entry} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  const user1 = await User.create({email: 'cody@email.com', password: '123'})
  const user2 = await User.create({email: 'murphy@email.com', password: '123'})
  const user3 = await User.create({email: 'liz@email.com', password: '123'})

  console.log(`seeded some users`)

  const entry1 = await Entry.create({
    title: 'Love being a dog',
    body: 'Still amazed and grateful and blessed to be a dog. Wow.',
    date: new Date('March 5, 2020')
  })

  const entry2 = await Entry.create({
    title: 'God, could you imagine being a dog?',
    body: 'They are so vile. Ew.',
    date: new Date('March 6, 2020')
  })

  const entry3 = await Entry.create({
    title: 'Having a pretty solid day',
    body:
      "It's been pretty hard figuring out how to get a good schedule up and running for the job search. The first week, I was focused on projects and algos, but I don't feel like I made a lot of progress on the job search part. The second week, when we started doing morning algos, that just totally threw off my day. I realized I need to start being productive way before then, and I needed to get out of the house. So I started going to the cafe every day, but I wasn't feeling super productive there. I feel like I'm just started to make sense of what my day-to-day is going to look like and what it's going to take to implement it.",
    date: new Date('March 11, 2020')
  })

  await entry1.setUser(user1)
  await entry2.setUser(user2)
  await entry3.setUser(user3)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
