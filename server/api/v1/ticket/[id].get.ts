export default defineEventHandler(async event => {
  const id = Number(event?.context?.params?.id);
  const ticket = await db.ticket.findMany({ where:{ id }, include: {
    ticketState: true
  } });

  if(!ticket.length){
    createError({ statusCode: 404 });
  }

  return ticket[0];
});