import {getAllUsers} from "@/app/services/users/UserApi";
import Image from "next/image";
import {UserScope} from "@/app/ui/components/dashboard/users/UserScope";

export default async function UserTable() {

    const users = await getAllUsers();

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0 h-full">
                    <div className="md:hidden">
                        {users?.map((user) => (
                            <div
                                key={user.uid}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <Image
                                                src={`${user.photoURL}`}
                                                className="mr-2 rounded-full"
                                                width={50}
                                                height={50}
                                                alt={`${user.displayName}'s profile image`}
                                            />
                                            <p>{user.displayName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-medium">
                                            {user.email}
                                        </p>
                                        <p>{user.scopes.map((scope, index) => (
                                            <span key={index} className="text-sm">{scope}</span>
                                        ))}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                #
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Foto de perfil
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Nombre
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Scopes
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {users?.map((user) => (
                            <tr
                                key={user.uid}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {user.uid}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    <Image
                                        src={`${user.photoURL}`}
                                        className="mr-2 rounded-full"
                                        width={50}
                                        height={50}
                                        alt={`${user.displayName}'s profile image`}
                                    />
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {user.displayName}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {user.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {user.scopes.map((scope, index) => (
                                        <span key={index} className={'mx-1'}>
                                            <UserScope scope={scope} />
                                        </span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};