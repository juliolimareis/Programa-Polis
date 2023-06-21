export default defineEventHandler(async event => {
  const { dataToken } = event as ApiEvent;

  if(dataToken.type !== 2) return createError({ statusCode: 403, message: "Forbidden." });

  const query = await getQuery(event) as { search: string, size: number, offset: number };

  const search = String(query?.search ?? "");
  const size = Number(query?.size) || 10;
  const offset = Number(query?.offset) || 0;

  let rows = [];
  let total = 0;

  if(search){
    const where = {
      OR: [
        { id: Number(search) },
        { subject: { contains: search } },
        { desc: { contains: search } },
      ],
    };

    total = (await db.ticket.aggregate({
      _count: true,
      where: { ...where },
      orderBy:{
        priority: "asc",
        status: "desc"
      }
    }))._count;

    rows = await db.ticket.findMany({
      take: size,
      skip: offset,
      where
    });
  }else{
    rows = await db.ticket.findMany({ take: size, skip: offset });
    total = await db.ticket.count();
  }

  rows = await addUserInRows(rows);

  return {
    size,
    offset,
    total,
    rows,
  };
});
