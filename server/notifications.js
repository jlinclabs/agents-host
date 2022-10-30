import PG from 'pg'
import { Observable } from 'rxjs'

// rxjs?

const pg = new PG.Client(process.env.DATABASE_URL)

await pg.connect()

pg.on('notification', function(newNotification) {
  console.log('🔔 new notification !', newNotification)
})

pg.query("LISTEN notifications", [], (error, x) => {
  console.log('LISTEN STOPPED?', error, x)
})


export async function subscribeToNotificationsForUser({ userId }, context){
  // const result = await context.prisma.$queryRaw`SELECT * FROM User`
  const observable = new Observable((subscriber) => {
    console.log('observer create')
    // subscriber.next(1);
    // subscriber.next(2);
    // subscriber.next(3);
    let fakeEventIndex = 0
    const intervalId = setInterval(() => {
      subscriber.next({ fakeEventIndex: fakeEventIndex++ });
    }, 1000);
    return () => {
      clearInterval(intervalId)
      console.log('observer teardown')
    }
  })
  return observable
}


export async function create({type, userId, ...payload}, context){
  await context.prisma.notifications.create({
    data: {
      type,
      userId: context.userId,
      payload: JSON.stringify(payload),
    },
  })
}