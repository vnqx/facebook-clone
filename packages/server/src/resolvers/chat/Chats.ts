import { Chat } from "./../../entity/Chat";
import { Context } from "./../../context";
import { Query, Resolver, Ctx, Arg } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class ChatsResolver {
  @Query(() => [Chat])
  async chats(@Ctx() ctx: Context) {
    const { userId } = ctx.req;
    const { chats } = await User.findOneOrFail({
      where: { id: userId },
      relations: ["chats", "chats.users"],
    });

    const chatsWithoutMe = chats.map((chat) => {
      // get rid of me (user) from the users array
      // to not have to filter out me on the client side
      chat.users = chat.users.filter((user) => user.id !== userId);
      return chat;
    });

    return chatsWithoutMe;
  }
}
