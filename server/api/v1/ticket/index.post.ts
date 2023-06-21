export default defineEventHandler(async event => {
  const { dataToken } = event as ApiEvent;

  if(dataToken.type !== 2) return createError({ statusCode: 403, message: "Forbidden." });

  const data = await readBody(event);

  const { validate } = useValidate<CreateTicket>({
    subject: { required: true, message: "name min require 1 characters", validate: (value: string) => value.length >= 1 },
    desc: { message: "desc min require 4 characters" },
  });

  return validate(data).then(async () => {
    const { dataToken: { id } } = event as ApiEvent;

    const userHasTicket = await db.ticket.findFirst({ where: { userId: id, status: 1 } });

    if(userHasTicket){
      return setStatus(event, 409, { message: "user has an open ticket" });
    }

    data.userId = id;
    data.status = 0;

    return await db.ticket.create({ data })
      .then(ticket => {
        return { ticket };
      });
  }).catch(error => {
    setStatus(event, 400, error ?? "error");

    return { error: String(error) };
  });
});