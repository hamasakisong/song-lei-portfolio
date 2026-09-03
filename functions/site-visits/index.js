const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({ env: cloudbase.SYMBOL_CURRENT_ENV });
const db = app.database();
function getTodayId() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

exports.main = async () => {
  const ids = { today: `day-${getTodayId()}`, total: "total" };
  let counts;

  await db.runTransaction(async (transaction) => {
    const collection = transaction.collection("site_visits");
    const [todayRecord, totalRecord] = await Promise.all([
      collection.doc(ids.today).get(),
      collection.doc(ids.total).get(),
    ]);

    counts = {
      today: (todayRecord.data?.visits ?? 0) + 1,
      total: (totalRecord.data?.visits ?? 0) + 1,
    };

    await Promise.all([
      collection.doc(ids.today).set({ visits: counts.today, updatedAt: db.serverDate() }),
      collection.doc(ids.total).set({ visits: counts.total, updatedAt: db.serverDate() }),
    ]);
  });

  return counts;
};
