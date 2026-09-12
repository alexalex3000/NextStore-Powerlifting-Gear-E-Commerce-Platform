import Input from "@/shared/ui/Input/Input";
import styles from "../styles.module.scss"
import {UserData} from "@/entities/user/model/types";

interface Props {
    userData: UserData,
}

export default function EditForm({ userData }: Props) {
    return (
        <div className={styles.container}>
            <Input type="text" label="First Name" name="firstName" defaultValue={userData.user.firstName}/>
            <Input type="text" label="Second Name" name="secondName" defaultValue={userData.user.lastName}/>
            <Input type="text" label="Email Address" name="emailAddress" defaultValue={userData.user.email}/>
            <Input type="text" label="Phone number" name="phoneNumber" defaultValue={userData.user?.phoneNumber ?? ""}/>
        </div>
    )
}