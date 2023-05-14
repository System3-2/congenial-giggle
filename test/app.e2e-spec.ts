import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { PrismaModule } from "../src/prisma/prisma.module"

describe('App E2E', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
  })
  it.todo('Should pass')
})
