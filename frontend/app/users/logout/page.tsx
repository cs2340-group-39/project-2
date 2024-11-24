'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar/page';
import ShapesBackground from '@/components/backgrounds/ShapesBackground/ShapesBackground';
import styles from './LogoutPage.module.css';
import { UsersLayout } from '@/components/layouts/users-layout';

const LogoutPage: React.FC = () => {
  // Handler for logging out
  const handleLogout = () => {
    // Implement your logout logic here (e.g., clearing auth tokens)
    // Example:
    localStorage.removeItem('authToken');
    // If using a global state or context, update it accordingly
    // authContext.logout();
  };

  return (
    <div className={styles.container}>
      <UsersLayout>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.headerText}>You Have Been Logged Out</h1>
          <h2 className={styles.customText}>We're sorry to see you go!</h2>
        </div>

        {/* Logout Confirmation */}
        <div className={styles.logoutContainer}>
          {/* 
            Using Link for navigation. The onClick handler ensures that logout logic 
            is executed before navigation occurs.
          */}
          <Link href="/users/signin" passHref legacyBehavior>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Sign In Again
            </button>
          </Link>
        </div>
      </div>
      </UsersLayout>
    </div>
  );
};

export default LogoutPage;





// import { redirect } from "next/navigation";

// import { createClient } from "@/utils/supabase/server";

// import { UsersLayout } from "@/components/layouts/users-layout";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";

// import {
//     logoutUserAction,
//     redirectUserToDashboardAction,
// } from "./actions";

// export default async function Page() {
//     const supabase = await createClient();

//     const {
//         data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//         return redirect("/users/login");
//     }

//     return (
//         <UsersLayout>
//             <Card className="w-[400px] mx-auto">
//                 <CardHeader>
//                     <CardTitle className="text-2xl">Logout</CardTitle>
//                     <CardDescription>
//                         Are you sure you want to log out?
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex justify-center gap-4 w-full">
//                         <Button
//                             variant="destructive"
//                             className="w-full"
//                             onClick={logoutUserAction}
//                         >
//                             Yes
//                         </Button>
//                         <Button
//                             variant="outline"
//                             className="w-full"
//                             onClick={redirectUserToDashboardAction}
//                         >
//                             No
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </UsersLayout>
//     );
// }
