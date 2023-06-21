export default defineEventHandler(async event => {
  const { dataToken } = event as ApiEvent;

  if(dataToken.type !== 2) return createError({ statusCode: 403, message: "Forbidden." });

  const id = Number(event?.context?.params?.id);
  const data = await readBody<{ priority?: number, status?: number }>(event);

  const { validate } = useValidate({
    status: { message: "status must be a number", validate: (value: string) => !Number.isNaN(Number(value)) },
    priority: { message: "priority must be a number", validate: (value: string) => !Number.isNaN(Number(value)) },
  });

  return validate(data).then(async () => {
    const updateTicket = await db.ticket.findFirst({ where: { id } });

    if(updateTicket){
      return db.ticket.update({
        data,
        where: { id }
      });
    }else{
      return createError({ statusCode: 404, message: "Ticket not found." });
    }
  }).catch(error => {
    setStatus(event, 400, error ?? "error");

    return { error: String(error) };
  });
});