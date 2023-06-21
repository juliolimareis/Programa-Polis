import { ticket } from "@prisma/client";

export async function addUserInRows(rows: ticket[]){
  if(!rows.length) return [];

  const setId = new Set(
    rows.map(({ id }) => ({
        id
      }))
  );

  const users = await db.user.findMany({
    where: {
      OR: Array.from(setId)
    }
  });

  return rows.map(row => {
    const user = users.find(u => u.id === row.userId);

    if(user){
      return {
        ...row,
        user
      }
    }
  })
}