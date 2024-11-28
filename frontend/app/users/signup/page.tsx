import { UsersLayout } from "@/components/layouts/users-layout";
import { Message } from "@/components/miscellaneous/form-message";

import { SignupForm } from "./signup-form";

export default async function Page(props: { searchParams: Message }) {
    const searchParams = await props.searchParams;

    // TODO: add redirect if user is logged in

    return (
        <UsersLayout>
            <SignupForm searchParams={searchParams} />
        </UsersLayout>
    );
}
