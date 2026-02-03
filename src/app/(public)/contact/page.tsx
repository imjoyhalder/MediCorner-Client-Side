import { authClient } from '@/lib/auth-client';

const Contact = async () => {
    const session = await authClient.getSession()
    // console.log(session);
    // console.log("this is from contact page");
    return (
        <div>
            this is the contact page
        </div>
    );
};

export default Contact;