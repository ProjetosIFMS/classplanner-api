import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum Role {
  COORDINATOR = 'COORDINATOR',
}

async function main() {
  const existingCourse = await prisma.course.findMany({
    where: {
      OR: [
        {
          name: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
        },
        {
          name: 'Eixo Tecnológico Informação e Comunicação',
        },
        {
          name: 'Engenharia de Computação',
        },
      ],
    },
  });

  const coursesToCreate = [];
  if (
    !existingCourse.some(
      (course) =>
        course.name === 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    )
  ) {
    coursesToCreate.push({
      name: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
      quantity_semester: 6,
      workload: 3600,
    });
  }
  if (
    !existingCourse.some((course) => course.name === 'Engenharia de Computação')
  ) {
    coursesToCreate.push({
      name: 'Engenharia de Computação',
      quantity_semester: 10,
      workload: 2500,
    });
  }
  if (
    !existingCourse.some(
      (course) => course.name === 'Eixo Tecnológico Informação e Comunicação',
    )
  ) {
    coursesToCreate.push({
      name: 'Eixo Tecnológico Informação e Comunicação',
      quantity_semester: 7,
      workload: 2500,
    });
  }
  if (coursesToCreate.length > 0) {
    await prisma.course.createMany({
      data: coursesToCreate,
    });
  }

  const users = [
    {
      email: 'coenc.tl@ifms.edu.br',
      firstName: 'ENGENHARIA',
      lastName: 'COENC',
      role: Role.COORDINATOR,
    },
    {
      email: 'cotad.tl@ifms.edu.br',
      firstName: 'TADS',
      lastName: 'COTAD',
      role: Role.COORDINATOR,
    },
    {
      email: 'coinf.tl@ifms.edu.br',
      firstName: 'INFO',
      lastName: 'COINF',
      role: Role.COORDINATOR,
    },
  ];

  for (const user of users) {
    console.log(`Verificando usuário: ${user.email}`);
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      console.log(`Criando usuário: ${user.email}`);
      await prisma.user.create({
        data: user,
      });
    } else {
      console.log(`Usuário com o e-mail ${user.email} já existe`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
