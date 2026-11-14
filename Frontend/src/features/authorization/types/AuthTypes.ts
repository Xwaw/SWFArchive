export type AuthResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type AccountResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type UserDto = {
  id: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  profile: ProfileDto | null;
};

export type ProfileDto = {
  profileUserId: string,
  profileTitle: string,
  avatarUrl?: string,
  bannerUrl?: string,
  backgroundUrl?: string,
  description?: string,
  profileStatus: string,
  badgeViewUrl: string,
  createdAt: string
}

export interface AuthFormProps {
  OnSuccess: () => void;
  OnError: (message: string) => void;
}

export type OwnershipProps = {
  IsOwner: boolean;
}

export type AuthRoute = {
  mode: "register" | "login" | "forgot" | "reset" | "change" | "info";
};
