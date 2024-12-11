import clsx from "clsx";

export const UserScope = ({scope}: {scope: string}) => {

    const scopeClassMap: {[key: string]: string} = {
        'admin': 'bg-green-500 text-white',
        'super': 'bg-blue-500 text-white',
        'reader': 'bg-gray-100 text-gray-500',
    }

    const scopeClass = scopeClassMap[scope] || 'bg-gray-100 text-gray-500';

    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                scopeClass,
            )}
        >
            {scope}
        </span>
    );
};