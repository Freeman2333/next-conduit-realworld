import { useAppDispatch, useAppSelector } from '@/store/store';
import { SignUpOutDTO } from '@modules/auth/api/dto/sign-up.out';
import { SignInOutDTO } from '@modules/auth/api/dto/sign-in.out';
import { useLazySignUpQuery, useLazySignInQuery } from '@modules/auth/api/repository';
import { selectUser, setUser } from '@modules/auth/service/slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoggedIn = Boolean(user);

  const [triggerSignUpQuery] = useLazySignUpQuery();
  const [triggerSignInQuery] = useLazySignInQuery();

  const signUp = async (values: SignUpOutDTO['user']) => {
    const { data } = await triggerSignUpQuery(values);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data.user));
  };

  const signIn = async (values: SignInOutDTO['user']) => {
    const { data } = await triggerSignInQuery(values);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data.user));
  };

  return { isLoggedIn, signUp, signIn };
};
