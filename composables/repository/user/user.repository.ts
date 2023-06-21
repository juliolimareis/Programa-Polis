export const useUser = () => {
  const api = useApi();

  function auth(login: Login){
    return api.post<{token: string, user: User}>("/auth", login);
  }

  function dispatch(user: CreateUser){
    return api.post<{
      token: string;
      user: User;
    }>("/user", user);
  }

  return { auth, dispatch };
};