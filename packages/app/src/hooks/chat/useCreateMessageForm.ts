import { CreateMessageInput } from "../../../../server/src/resolvers/message/CreateMessageInput";
import { Message, ChatData } from "../../types";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { GET_CHAT } from "../../graphql/queries";
import { CREATE_MESSAGE } from "../../graphql/mutations";

interface CreateMessageData {
  createMessage: Message;
}

interface CreateMessageVars {
  input: CreateMessageInput;
  chatId: string;
}

interface Props {
  chatId: string;
}

export function useCreateMessageForm({ chatId }: Props) {
  const initialValues: CreateMessageInput = {
    content: "",
  };

  const [createMessage] = useMutation<CreateMessageData, CreateMessageVars>(
    CREATE_MESSAGE,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  function handleCreateMessage(input: CreateMessageInput, { resetForm }: any) {
    return createMessage({
      variables: { input, chatId },
      update: (store, { data }) => {
        const { chat } = store.readQuery({
          query: GET_CHAT,
          variables: { id: chatId },
        }) as ChatData;

        if (data) {
          store.writeQuery({
            query: GET_CHAT,
            variables: { id: chatId },
            data: {
              chat: {
                ...chat,
                messages: chat.messages.concat(data.createMessage),
              },
            },
          });
        }

        resetForm();
      },
    });
  }

  const validationSchema = Yup.object().shape({});

  return { handleCreateMessage, initialValues, validationSchema };
}
