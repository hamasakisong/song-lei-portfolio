const cloudbase = require("@cloudbase/node-sdk");

const app = cloudbase.init({ env: cloudbase.SYMBOL_CURRENT_ENV });
const db = app.database();
const collection = db.collection("site_visits");

function getTodayId() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function increaseCounter(id) {
  const document = collection.doc(id);
  const current = await document.get();
  const visits = (current.data[0]?.visits ?? 0) + 1;

  await document.set({ visits, updatedAt: db.serverDate() });
  return visits;
}

exports.main = async () => {
  const [today, total] = await Promise.all([
    increaseCounter(`day-${getTodayId()}`),
    increaseCounter("total"),
  ]);

  return { today, total };
};
