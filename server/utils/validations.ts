import { H3Event, } from "h3";

export const basicUseSelectForToken = { id: true, name: true, passwd: false, type: true, email: true };

export const basicUser = { id: true, email: true, passwd: false, type: true, name: true };

export function setStatus(event: any, code: number, err: object){
  setResponseStatus(event, code);

  return err;
}

export function userSession(event: any){
  return event.dataToken as DataToken;
}

export function getDataTokenInHeader(event: H3Event){
  const headerAuth = event.node.req.headers.authorization as string;

  if(headerAuth && headerAuth.includes("Bearer")){
    const { decodeToken, decodeTokenVerify } = useJWT();
    const token = headerAuth.split(" ")[1];

    if(useRuntimeConfig().apiRouterRecoveryPasswd === event.path && process.env.API_SECRET_KEY_RECOVERY){
      const dataToken = decodeTokenVerify(token, process.env.API_SECRET_KEY_RECOVERY);

      if(dataToken) return dataToken;
    }else{
      const dataToken = decodeToken(token);

      if(dataToken){
        return dataToken;
      }
    }
  }

  return false;
}

export function isPublicRouter(event: any){
  if(event.path.includes("/api/")){
    const apiPublicRouters = useRuntimeConfig().apiPublicRouters as any;
    const pathName = Object.keys(apiPublicRouters).find(k => k === event.path);

    if (pathName){
      return !!apiPublicRouters[pathName].includes(event?.node?.req?.method?.toLowerCase() ?? "");
    }

    return false;
  }

  return true;
}

export function handleSecurityRouter(event: any){
  if(!isPublicRouter(event)){
    const dataToken = getDataTokenInHeader(event);

    if(dataToken){
      event.dataToken = dataToken;

      return true;
    }

    throw createError({
      statusCode: 401,
      statusMessage: "Not authorized"
    });
  }
}
