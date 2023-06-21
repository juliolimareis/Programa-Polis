export default defineEventHandler(async event => {
  const { dataToken: { type } } = event as ApiEvent;

  if(type === 2){
    const rows = await db.ticket.findMany({
      where:{ status: 1 },
      orderBy: { id: "desc" }
    });

    return await addUserInRows(rows);
  }

  return createError({ statusCode: 403, message: "Forbidden." });
});