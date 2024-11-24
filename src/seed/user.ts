import { DataSource } from "typeorm";
import { User } from "../entities/user";

const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const existingUser = await userRepository.findOneBy({
    name: "aluno@teste.com",
  });
  if (!existingUser) {
    const newUser = userRepository.create({
      name: "aluno@teste.com",
      pin: "teste",
    });
    await userRepository.save(newUser);
    console.log("Usuário Admin criado com sucesso!");
  }
};

export default seedUsers;
