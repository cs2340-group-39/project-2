import { useFonts } from 'expo-font'
import React from 'react'
import type { SizeTokens } from 'tamagui'
import { Image, ScrollView } from 'react-native'
import { Stack, Input, Button, Text, Form, H4, Spinner, H2, H1 } from 'tamagui'
import AnimatedGradientBackground from 'models/AnimatedGradientBackground'

export default function SignIn(props: { size: SizeTokens }) {
  const [loginStatus, loginSetStatus] = React.useState<'Sign In' | 'Signing In' | 'Signing In'>('Sign In')
  const [signupStatus, signupSetStatus] = React.useState<'Sign Up' | 'Redirecting...' | 'Redirecting...'>('Sign Up')
  const [fontsLoaded] = useFonts({
    "CustomFont": require('../assets/fonts/Hunderland.otf'),
    "Regular": require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  React.useEffect(() => {
    if (loginStatus === 'Signing In') {
      const timer = setTimeout(() => loginSetStatus('Sign In'), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [loginStatus])

  React.useEffect(() => {
    if (signupStatus === 'Redirecting...') {
      const timer = setTimeout(() => signupSetStatus('Sign Up'), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [signupStatus])
  
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
    { <AnimatedGradientBackground/> } 
    <Stack
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="20px"
      space="20px"
      backgroundColor="$background"
     >
      <Stack
        flexDirection='row'
        alignItems="center"
        padding="$2"
        gap="$2"
        backgroundColor="$background"
      >
        <H2 color="$primary" fontWeight="bold" textAlign="center" marginBottom="$4">
          Welcome to CS Group 39's
        </H2>
        <H1 color="$primary" fontFamily="CustomFont" fontWeight="bold" textAlign="center" marginBottom="$4">
          Spotify Wrapped
        </H1>
        <Image
          source={require('../assets/images/giphy.webp')} 
          style={{ width: 250, height: 250 }} 
        />
      </Stack>

        <Input
          placeholder="Username"
          width="80%"
          padding="10px"
          backgroundColor="white"
          borderRadius="10px"
          marginBottom="10px"
        />

      <Input
        placeholder="Password"
        width="80%"
        padding="10px"
        backgroundColor="white"
        borderRadius="10px"
        secureTextEntry
        marginBottom="20px"
      />


      <Stack
        flexDirection="row"
        justifyContent="center"
        gap="$9"
      >
        <Form
          alignItems="center"
          minWidth={300}
          gap="$2"
          onSubmit={() => loginSetStatus('Signing In')}
          borderWidth={1}
          borderRadius="$4"
          backgroundColor="white"
          borderColor="$borderColor"
          padding="$8"
        >
          <H4>{loginStatus[0].toUpperCase() + loginStatus.slice(1)}</H4>

          <Form.Trigger asChild disabled={loginStatus !== 'Sign In'}>
            <Button icon={loginStatus === 'Signing In' ? () => <Spinner /> : undefined}>
              Sign In
            </Button>
          </Form.Trigger>
        </Form>

        <Form
          alignItems="center"
          minWidth={300}
          gap="$2"
          onSubmit={() => signupSetStatus('Redirecting...')}
          borderWidth={1}
          borderRadius="$4"
          backgroundColor="white"
          borderColor="$borderColor"
          padding="$8"
        >
          <H4>{signupStatus[0].toUpperCase() + signupStatus.slice(1)}</H4>

          <Form.Trigger asChild disabled={signupStatus !== 'Sign Up'}>
            <Button icon={signupStatus === 'Redirecting...' ? () => <Spinner /> : undefined}>
              Sign Up
            </Button>
          </Form.Trigger>
        </Form>
      </Stack>
    </Stack>
    </ScrollView>
  )
}