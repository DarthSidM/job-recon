`schema.prisma`
```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```


`db.js`
```js
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
});
```

And whenever you change models:

```bash
npx prisma migrate dev --name <migration_name>
npx prisma generate
```

I would honestly create an npm script:

```json
{
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:validate": "prisma validate",
    "db:generate": "prisma generate",
    "db:push": "prisma db push"
  }
}
```

so you don't have to remember everything.

docs link `https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres`