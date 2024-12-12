import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import "./GroupMember.scss";
import Header from "../../../../components/Header/Header.jsx";
import UserList from "../../../../components/UserList/UserList.jsx";
import {isValidPaypalMeUrl} from "../../../../shared/validator.js";

const GroupMember = ({creator, onMembersAdded, onBackClick}) => {
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupMember, setGroupMember] = useState({name: "", paypal: ""});
    const [createActive, setCreateActive] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isUniqueName, setIsUniqueName] = useState(false);
    const [isValidPaypal, setIsValidPaypal] = useState(false);

    const handleNameInputChange = (event) => {
        setGroupMember({
            name: event.target.value,
            paypal: groupMember.paypal,
        });
    };

    const handlePayPalInputChange = (event) => {
        setGroupMember({
            name: groupMember.name,
            paypal: event.target.value,
        });
    };

    const onMemberAdded = () => {
        setGroupMembers([...groupMembers, groupMember]);
        setGroupMember({name: "", paypal: ""});
        setCreateActive(true);
    };

    useEffect(() => {
        setIsValidName(groupMember.name.length >= 1 && groupMember.name.length <= 30);
        setIsUniqueName(!(groupMembers.some((member) => member.name === groupMember.name) || creator.name === groupMember.name));
        setIsValidPaypal(groupMember.paypal === "" || isValidPaypalMeUrl(groupMember.paypal));
    }, [groupMembers, groupMember, creator.name]);

    return (
        <div id="group_member_container" className="default_page_container">
            <Header onBackClick={() => onBackClick()}/>
            <div className="headline_text headline_less_space">
                Mit wem möchtest du Geld fair teilen?
            </div>
            <div id="box_group_member_list">
                <UserList
                    creator={creator}
                    users={groupMembers}/>
            </div>
            <Button
                id="btn_create_group"
                variant="default"
                disabled={!createActive}
                onClick={() => onMembersAdded(groupMembers)}
            >
                Gruppe erstellen
            </Button>
            <div className="sub_headline_text">
                Weitere Person hinzufügen?
            </div>
            <TextField
                fullWidth
                id="group_member_name"
                value={groupMember.name}
                label="Wie ist der Name der Person?"
                onChange={handleNameInputChange}
                error={!isValidName && groupMember.name !== ""}
                helperText={isValidName || groupMember.name === "" ? (isUniqueName ? "" : "Der Name ist bereits vergeben!") : "Bitte maximal 30 Zeichen ein!"}
                variant="standard"
                InputLabelProps={{shrink: true}}
            />
            <div id="margin_between_fields"/>
            <TextField
                fullWidth
                id="group_member_paypal"
                value={groupMember.paypal}
                label="Hat sie einen PayPal.me Link (optional)?"
                onChange={handlePayPalInputChange}
                error={!isValidPaypal && groupMember.paypal !== ""}
                helperText={isValidPaypal || groupMember.paypal === "" ? "" : "Bitte gib einen gültigen PayPal.me Link ein!"}
                variant="standard"
                InputLabelProps={{shrink: true}}
            />
            <Button
                id="btn_add_member"
                variant="default"
                onClick={() => onMemberAdded()}
                disabled={!isValidName || !isValidPaypal || !isUniqueName}
            >
                + Person hinzufügen
            </Button>
        </div>

    );
};
export default GroupMember;
