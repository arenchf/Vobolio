import React, { FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import User from "../../models/User";
import Spinner from "../../components/Spinner/Spinner";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { IconEdit } from "@tabler/icons-react";
import Select, { SingleValue } from "react-select";

const difficultyOptions = [
    { label: "Very Easy", value: 20 },
    { label: "Easy", value: 15 },
    { label: "Normal", value: 10 },
    { label: "Hard", value: 5 },
    { label: "Very Hard", value: 3 },
    { label: "Extremely Hard", value: 1 },
];

function ProfilePage() {
    const auth = useContext(AuthContext);
    const [editedUser, setEditedUser] = useState<User | null>(
        auth?.user ?? null
    );

    useEffect(() => {
        // console.log("editedUser", editedUser);
        // if (!editedUser && auth?.user) setEditedUser(auth.user);
    }, [auth, editedUser]);

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        if (editedUser) {
            console.log(e.currentTarget.name, e.currentTarget.value);
            // console.log("e", e);
            // console.log("e");
            setEditedUser({
                ...editedUser,
                [e.currentTarget.name]: e.currentTarget.value,
            });
        }
    };

    const handleSave = () => {
        toast.error("Demo User Cannot Be Changed");
    };
    const handleCancelEdit = () => {
        if (auth?.user) setEditedUser(auth?.user);
    };

    const handlePasswordInput = (e: FormEvent<HTMLInputElement>) => {};
    const handleDifficultySelect = (
        e: SingleValue<{ label: string; value: number }>
    ) => {
        if (editedUser && e)
            setEditedUser({ ...editedUser, difficulty: e.value });
    };
    return (
        <div className="flex-grow">
            <Navbar>{editedUser?.username}</Navbar>
            <div className="p-4 flex flex-col gap-4 items-center max-w-lg m-auto">
                {editedUser ? (
                    <>
                        <div className="avatar">
                            <div className="w-24 rounded relative">
                                <img
                                    src={
                                        axiosInstance.defaults.baseURL +
                                        editedUser.img
                                    }
                                    alt="Avatar"
                                />
                                <div className="w-full h-full bg-front/50 opacity-0 hover:opacity-100 absolute top-0 left-0 flex flex-row items-center justify-center cursor-pointer">
                                    <IconEdit className="w-10 h-10"></IconEdit>
                                </div>
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={editedUser.username}
                                onChange={handleInput}
                                className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInput}
                                className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Select Difficulty
                                </span>
                            </label>
                            <Select
                                onChange={handleDifficultySelect}
                                id="difficultySelect"
                                classNames={{
                                    menu: () => "!bg-front",
                                    option: ({ isFocused, isSelected }) =>
                                        `${
                                            isFocused || isSelected
                                                ? "!bg-primary"
                                                : ""
                                        }`,
                                    // container: () => "w-full",
                                    valueContainer: () => "!px-4",
                                    control: ({ isFocused }) =>
                                        ` !bg-front !text-text input input-bordered !rounded-lg p-0 !border-base-content !border-opacity-20 !shadow-none w-full ${
                                            isFocused
                                                ? "!ring-2 !ring-primary"
                                                : ""
                                        }`,
                                    singleValue: () =>
                                        "!text-text flex flex-row gap-4 items-center text-lg",
                                    input: () => "!text-text",
                                }}
                                defaultValue={
                                    difficultyOptions[0]
                                    // difficultyOptions.find(
                                    // (val, index) =>
                                    //     val.value === editedUser.difficulty)
                                }
                                // defaultValue={difficultyOptions.find((val,index)=>val.value===editedUser.difficulty)}
                                options={difficultyOptions}
                                // styles={{
                                //     control: (baseStyles, state) => ({
                                //         ...baseStyles,
                                //         borderColor: colors.borderColor,
                                //         outlineColor: colors.mainColor,
                                //     }),
                                // }}
                            ></Select>
                        </div>
                        <div className="flex flex-col w-full justify-center items-center">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="**********"
                                    name="password"
                                    // value={editedUser.email}
                                    onChange={handlePasswordInput}
                                    className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front"
                                />
                                <label className="label">
                                    <span className="label-text-alt">
                                        Password should contain more than 8
                                        characters.
                                    </span>
                                </label>
                            </div>
                            <div className="form-control w-full focus:outline-primary focus:outline-offset-0">
                                <label className="label">
                                    <span className="label-text">
                                        Confirm Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="**********"
                                    name="confirm_password"
                                    // value={editedUser.email}
                                    onChange={handlePasswordInput}
                                    className="input input-bordered w-full  focus:outline-primary focus:outline-offset-0 bg-front"
                                />
                            </div>
                        </div>

                        <div className="buttons-row w-full flex flex-col gap-2">
                            <div
                                className={`btn btn-primary btn-block rounded-full ${
                                    JSON.stringify(editedUser) ===
                                    JSON.stringify(auth?.user)
                                        ? "btn-disabled !bg-front"
                                        : ""
                                }`}
                                onClick={handleSave}
                            >
                                Save
                            </div>
                            <div
                                className={`btn btn-primary btn-block rounded-full ${
                                    JSON.stringify(editedUser) ===
                                    JSON.stringify(auth?.user)
                                        ? "btn-disabled !bg-front"
                                        : ""
                                }`}
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </div>
                        </div>
                    </>
                ) : (
                    <Spinner></Spinner>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
