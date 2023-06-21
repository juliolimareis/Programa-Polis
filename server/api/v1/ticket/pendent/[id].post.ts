export default defineEventHandler(async event => {
  const { dataToken: { type, id } } = event as ApiEvent;
  const data = await readBody<{ desc: string }>(event);
  const ticketId = Number(event?.context?.params?.id);

  const { validate } = useValidate({
    desc: {
      required: true,
      message: "desc is required.",
    },
  });

  if(type === 2){
    return validate(data).then(async () => {
      const ticket = await db.ticket.findFirst({ where: { id } });

      if(ticket && ticket.status){
        return db.ticketState.create({ data: { desc: data.desc, ticketId, userId: id } }).then(() => {
          return { message: "state success." };
        }).catch(err => err);
      }else if(!ticket){
        return createError({ statusCode: 404, message: "Ticket not found." });
      }else {
        return createError({ statusCode: 400, message: "Invalid ticket for this process, as the ticket is closed." });
      }
    }).catch(error => {
      setStatus(event, 400, error ?? "error");

      return { error: String(error) };
    });
  }

  return createError({ statusCode: 403, message: "Forbidden." });
});