import Md5 from "md5";

export default defineEventHandler(async event => {
  const { dataToken: { email } } = event as ApiEvent;
  const body = await readBody<{ passwd: string }>(event);

  const { validate } = useValidate({ passwd: { required: true, validate: (value: string) => value.length >= 4, message: "min passwd 4 characters" } });

  return validate(body)
    .then(async () => {
      const user = await db.user.update({ data: { passwd: Md5(body.passwd) }, where: { email } });

      if(user){
        return { message: "send email success." };
      }

      return createError({ message: "email not found.", statusCode: 404 });
    }).catch(err => setStatus(event, 400, err));
});