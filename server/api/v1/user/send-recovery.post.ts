export default defineEventHandler(async event => {
  const body = await readBody<{ email: string }>(event);
  const { onRecoveryEmail } = useEmailService();
  const { generateTokenSecret } = useJWT();

  const { validate } = useValidate({ email: { required: true, validate: "email", message: "email is invalid" } });

  return validate(body)
    .then(async () => {
      const user = await db.user.findFirst({ where: { email: body.email } });

      if(user){
        const { name, email } = user;
        const res = await onRecoveryEmail({ name, email }, generateTokenSecret({ email }, process.env.API_SECRET_KEY_RECOVERY ?? "", "1h"));

        if(res === true){
          return { message: "send email success." };
        }

        return createError({ message: JSON.stringify(res), statusCode: 500 });
      }

      return createError({ message: "email not found.", statusCode: 404 });
    }).catch(err => setStatus(event, 400, err));
});