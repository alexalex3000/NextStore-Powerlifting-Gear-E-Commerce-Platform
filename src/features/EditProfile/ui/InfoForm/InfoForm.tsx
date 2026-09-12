import FakeInput from "@/shared/ui/FakeInput/FakeInput";

import styles from "../styles.module.scss"
import {UserData} from "@/entities/user/model/types";

interface Props{
    userData: UserData;
}

export default function InfoForm({userData}: Props) {
    return (
        <div className={styles.container}>
            <FakeInput label="First Name" value={userData.user.firstName}/>
            <FakeInput label="Second Name" value={userData.user.lastName}/>
            <FakeInput label="Email Address" value={userData.user.email}/>
            <FakeInput label="Phone number" value={userData.user?.phoneNumber ?? ""}/>
        </div>
    )
}