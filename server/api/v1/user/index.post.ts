import Md5 from "md5";

export default defineEventHandler(async (event) => {
  const { dataToken } = event as ApiEvent;

  if(dataToken.type !== 2) return createError({ statusCode: 403, message: "Forbidden." });

  const data = await readBody(event);
  const { generateToken } = useJWT();
  const { validate } = useValidate<CreateUser>({
    name: {
      required: true,
      message: "name min require 4 characters",
      validate: (value: string) => value.length >= 4,
    },
    passwd: { required: true, message: "passwd min require 4 characters", validate: (value: string) => value.length >= 4 },
    email: { required: true, validate: "email", message: "email is invalid" },
    secretaryId: { required: true, validate: (value) => !!(Number(value)), message: "secretaryId is invalid." },
    type: { required: true, validate: (value) => !!(Number(value)), message: "type is invalid." },
    remoteAccess: { required: true, validate: (value) => value.length >= 1, message: "remoteAccess is invalid." },
  });

  return validate(data).then(async () => {
    const userExist = await db.user.findFirst({ where: { email: data.email } });

    if(userExist){
      return setStatus(event, 409, { message: "user exist" });
    }

    data.passwd = Md5(data.passwd);
    data.status = 1;
    data.secretaryId = Number(data.secretaryId);
    data.type = Number(data.type);

    return await db.user.create({ data, select: basicUseSelectForToken })
      .then(user => {
        return { user, token: generateToken({ ...user }) };
      });
  }).catch(error => {
    setStatus(event, 400, error ?? "error");

    return { error: String(error) };
  });
});