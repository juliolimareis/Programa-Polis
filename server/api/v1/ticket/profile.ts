export default defineEventHandler(async event => {
  const { dataToken: { id } } = event as ApiEvent;
  const ticket = await db.ticket.findFirst({ where:{ userId: id } });

  if(!ticket){
    return createError({ statusCode: 404 });
  }

  return ticket;
});