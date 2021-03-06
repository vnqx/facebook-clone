import { gql } from "@apollo/client";
import { POST_PREVIEW, USER_PREVIEW } from "./fragments";

export const GET_ME = gql`
  query Me {
    me {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_NOTIFICATIONS = gql`
  query Notifications {
    notifications {
      id
      user {
        ...UserPreview
      }
      postId
      type
      receivedAt
    }
  }
  ${USER_PREVIEW}
`;

export const GET_CHAT = gql`
  query Chat($id: String!) {
    chat(id: $id) {
      id
      messages {
        id
        content
        sentTime
        user {
          ...UserPreview
        }
      }
      users {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_CHATS = gql`
  query Chats {
    chats {
      id
      users {
        ...UserPreview
      }
      lastMessage {
        id
        sentTime
        content
      }
      unread
    }
  }
  ${USER_PREVIEW}
`;

export const GET_IS_POST_LIKED = gql`
  query IsPostLiked($postId: String!) {
    isPostLiked(postId: $postId)
  }
`;

export const GET_POSTS = gql`
  query Posts($cursor: Float, $userId: String) {
    posts(cursor: $cursor, userId: $userId) {
      edges {
        ...PostPreview
        user {
          ...UserPreview
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${USER_PREVIEW}
  ${POST_PREVIEW}
`;

export const GET_PROFILE_FEED = gql`
  query ProfileFeed($id: ID!) {
    profileFeed(id: $id) {
      ...PostPreview
    }
  }
  ${POST_PREVIEW}
`;

export const GET_COMMENTS = gql`
  query Comments($postId: String!) {
    comments(postId: $postId) {
      id
      content
      createdAt
      user {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_USERS = gql`
  query Users($input: UsersInput!) {
    users(input: $input) {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FRIEND_REQUESTS = gql`
  query FriendRequests {
    friendRequests {
      id
      sentTime
      fromUser {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FRIENDS = gql`
  query Friends($userId: String!) {
    friends(userId: $userId) {
      ...UserPreview
      commonFriends {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      background
      ...UserPreview
      friends {
        ...UserPreview
      }
      friendshipStatus
    }
  }
  ${USER_PREVIEW}
`;
