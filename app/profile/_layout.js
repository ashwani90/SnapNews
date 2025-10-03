// app/home/_layout.js
import { Stack, useRouter } from 'expo-router';
import { LeftHeader } from '../../components/LeftHeader';
import { LoginButton } from '../../components/LoginButton';

export default function HomeStackLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: ' Profile',

          // LEFT: hamburger that opens parent drawer
          headerLeft: () => (
            <LeftHeader navigation={navigation}/>
          ),

          // RIGHT: login button (same as before)
          headerRight: () => (
            <LoginButton />
          ),
        })}
      />
    </Stack>
  );
}
