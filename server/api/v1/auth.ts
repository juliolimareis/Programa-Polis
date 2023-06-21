import Md5 from "md5";

export default defineEventHandler(async (event) => {
  const { generateToken } = useJWT();
  const data = await readBody(event);

  const { validate } = useValidate({
    email: { required: true, validate: "email", message: "email is invalid" },
    passwd: { required: true, message: "passwd min require 4 characters", validate: (value: string) => value.length >= 4 },
  });

  return validate(data).then(async () => {
    const userExist = await db.user.findFirst({ where: { email: data.email } });

    if(!userExist){
      return setStatus(event, 404, { message: "user not found" });
    }

    data.passwd = Md5(data.passwd);

    return db.user.findFirst({ where: data, select: basicUseSelectForToken })
      .then(user => {
        if(user){
          return {
            token: generateToken(user),
            user
          };
        }

        return setStatus(event, 401, { message: "invalid credentials" });
      });
  }
  ).catch(err => setStatus(event, 400, err));
});