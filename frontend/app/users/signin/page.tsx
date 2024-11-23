// app/users/signin/page.tsx
//TODO replace or replaced by login page
import React from 'react';
import Navbar from '@/components/navbar/page';
import ShapesBackground from '@/components/backgrounds/ShapesBackground/ShapesBackground';
import styles from './SignInPage.module.css';
import { Message } from "@/components/blocks/form-message";
import { createClient } from "@/utils/supabase/server";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";

export default async function Page(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
      data: { user },
  } = await supabase.auth.getUser();

  if (user) {
      return redirect("/dashboard");
  }

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <ShapesBackground />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.headerText}>Welcome to CS Group 39's</h1>
          <h2 className={styles.customText}>Spotify Wrapped!</h2>
        </div>

        {/* Sign-In Form */}
        <div className={styles.formContainer}>
          <LoginForm searchParams={searchParams}/>
        </div>
      </div>
    </div>
  );
}

const SignInPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <ShapesBackground />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.headerText}>Welcome to CS Group 39's</h1>
          <h2 className={styles.customText}>Spotify Wrapped!</h2>
        </div>

        {/* Sign-In Form */}
        <div className={styles.formContainer}>
          <SignInPage/>
        </div>
      </div>
    </div>
  );
};