export type AuthData = {
    access: string;
    refresh: string;
    user_info: {
      email: string;
      username: string;
    };
  };