import { useAppDispatch, useAppSelector } from '@/store/store';
import { SignUpOutDTO } from '../api/dto/sign-up.out';
import { useLazySignUpQuery } from '../api/repository';
import { selectUser, setUser } from '../service/slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoggedIn = Boolean(user);

  const [triggerSignUpQuery] = useLazySignUpQuery();
  const signUp = async (values: SignUpOutDTO['user']) => {
    const { data } = await triggerSignUpQuery(values);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data.user));
  };

  return { isLoggedIn, signUp };
};
